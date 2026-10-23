function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeQuery(query) {
  return query
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/--[^\r\n]*/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/;$/, "")
    .toUpperCase();
}

function quotedValuePattern(value) {
  const safeValue = escapeRegExp(value.toUpperCase());
  return `(?:'${safeValue}'|"${safeValue}"|${safeValue})`;
}

function hasSelectAllColumns(query) {
  return /^SELECT\s+\*\s+FROM\s+/i.test(query);
}

function getSelectClause(query) {
  return query.match(/^SELECT\s+(?:DISTINCT\s+)?(.+?)\s+FROM\s+/i)?.[1] ?? "";
}

function hasSelectColumns(query, columns) {
  const selectClause = getSelectClause(query);
  return columns.every((column) => new RegExp(`\\b${escapeRegExp(column.toUpperCase())}\\b`, "i").test(selectClause));
}

function hasDistinct(query) {
  return /^SELECT\s+DISTINCT\s+/i.test(query);
}

function hasTable(query, tableName) {
  return new RegExp(`\\bFROM\\s+${escapeRegExp(tableName.toUpperCase())}\\b`, "i").test(query);
}

function hasEquality(query, column, value) {
  const columnPattern = escapeRegExp(column.toUpperCase());
  const valuePattern = quotedValuePattern(value);
  return new RegExp(`\\b${columnPattern}\\s*=\\s*${valuePattern}(?=\\s|$|AND|OR)`, "i").test(query);
}

function hasComparison(query, column, operator, value) {
  const columnPattern = escapeRegExp(column.toUpperCase());
  const valuePattern = escapeRegExp(String(value));
  const leftToRight = `\\b${columnPattern}\\s*${escapeRegExp(operator)}\\s*${valuePattern}\\b`;
  const rightToLeft = `\\b${valuePattern}\\s*${escapeRegExp(operator === ">=" ? "<=" : operator)}\\s*${columnPattern}\\b`;
  return new RegExp(`(?:${leftToRight}|${rightToLeft})`, "i").test(query);
}

function hasOrderBy(query, column, direction) {
  const columnPattern = escapeRegExp(column.toUpperCase());
  const directionPattern = direction ? `\\s+${escapeRegExp(direction.toUpperCase())}` : "";
  return new RegExp(`\\bORDER\\s+BY\\s+${columnPattern}${directionPattern}\\b`, "i").test(query);
}

function hasLimit(query, value) {
  return new RegExp(`\\bLIMIT\\s+${escapeRegExp(String(value))}\\b`, "i").test(query);
}

function hasAggregate(query, requirement) {
  const functionPattern = escapeRegExp(requirement.function.toUpperCase());
  const columnPattern = escapeRegExp(requirement.column.toUpperCase());
  const expression = `${functionPattern}\\s*\\(\\s*${columnPattern}\\s*\\)`;
  const alias = requirement.alias ? `\\s+(?:AS\\s+)?${escapeRegExp(requirement.alias.toUpperCase())}\\b` : "";
  return new RegExp(`${expression}${alias}`, "i").test(query);
}

function hasGroupBy(query, columns) {
  const groupClause = query.match(/\bGROUP\s+BY\s+(.+?)(?:\bORDER\s+BY|\bLIMIT|$)/i)?.[1] ?? "";
  return columns.every((column) => new RegExp(`\\b${escapeRegExp(column.toUpperCase())}\\b`, "i").test(groupClause));
}

function hasJoin(query, requirement) {
  const tablePattern = escapeRegExp(requirement.table.toUpperCase());
  const joinPattern = requirement.joinType === "LEFT" ? "LEFT(?:\\s+OUTER)?\\s+JOIN" : "(?:INNER\\s+)?JOIN";
  const leftPattern = escapeRegExp(requirement.left.toUpperCase());
  const rightPattern = escapeRegExp(requirement.right.toUpperCase());
  const forwardCondition = `${leftPattern}\\s*=\\s*${rightPattern}`;
  const reverseCondition = `${rightPattern}\\s*=\\s*${leftPattern}`;
  const hasJoinClause = new RegExp(`\\b${joinPattern}\\s+${tablePattern}\\b`, "i").test(query);
  const hasJoinCondition = new RegExp(`\\bON\\s+(?:${forwardCondition}|${reverseCondition})\\b`, "i").test(query);
  return hasJoinClause && hasJoinCondition;
}

function hasLike(query, column, pattern) {
  const columnPattern = escapeRegExp(column.toUpperCase());
  const valuePattern = quotedValuePattern(pattern);
  return new RegExp(`\\b${columnPattern}\\s+LIKE\\s+${valuePattern}`, "i").test(query);
}

export function evaluateSqlQuery(query, question) {
  const normalizedQuery = normalizeQuery(query);

  if (!normalizedQuery) {
    return { isCorrect: false, message: "Write a query before submitting." };
  }

  if (question.validation?.mode === "canonical-query") {
    const expectedQuery = normalizeQuery(question.solutionQuery);
    return normalizedQuery === expectedQuery
      ? { isCorrect: true, message: "Correct. Your query matches the required practice solution." }
      : { isCorrect: false, message: "Compare your query with the requested clauses, expressions, and conditions.", issues: [{ requirement: "Match the requested query structure", why: "This advanced practice prompt checks its canonical query shape so each clause can be reviewed precisely." }] };
  }

  const tableName = question.schema[0].name;
  const failures = [];
  const addFailure = (requirement, why) => failures.push({ requirement, why });

  for (const requirement of question.validation?.requirements ?? []) {
    if (requirement.type === "select-all-columns" && !hasSelectAllColumns(normalizedQuery)) {
      addFailure("Select every column with SELECT *", "The prompt asks for every column, so naming only some columns changes the requested result.");
    }

    if (requirement.type === "select-columns" && !hasSelectColumns(normalizedQuery, requirement.columns)) {
      addFailure(`Return ${requirement.columns.join(", ")}`, "Only the requested columns should appear in the result.");
    }

    if (requirement.type === "distinct" && !hasDistinct(normalizedQuery)) {
      addFailure("Use DISTINCT", "Without DISTINCT, repeated department codes remain in the result.");
    }

    if (requirement.type === "table" && !hasTable(normalizedQuery, requirement.value)) {
      addFailure(`Read from ${requirement.value}`, "This is the table that contains the required data.");
    }

    if (requirement.type === "equals" && !hasEquality(normalizedQuery, requirement.column, requirement.value)) {
      addFailure(`Filter ${requirement.column} to '${requirement.value}'`, "The requested result includes only rows with this value.");
    }

    if (requirement.type === "comparison" && !hasComparison(normalizedQuery, requirement.column, requirement.operator, requirement.value)) {
      addFailure(`Use ${requirement.column} ${requirement.operator} ${requirement.value}`, `The wording requires this exact comparison, including the ${requirement.operator} operator.`);
    }

    if (requirement.type === "logical-operator" && !new RegExp(`\\b${requirement.value}\\b`, "i").test(normalizedQuery)) {
      addFailure(`Combine the filters with ${requirement.value}`, "Both conditions must apply to the same row.");
    }

    if (requirement.type === "order-by" && !hasOrderBy(normalizedQuery, requirement.column, requirement.direction)) {
      addFailure(`Order by ${requirement.column} ${requirement.direction}`, "The requested rows need to be ranked in this direction before limiting them.");
    }

    if (requirement.type === "limit" && !hasLimit(normalizedQuery, requirement.value)) {
      addFailure(`Limit the result to ${requirement.value} rows`, "The prompt asks for a fixed number of rows.");
    }

    if (requirement.type === "aggregate" && !hasAggregate(normalizedQuery, requirement)) {
      addFailure(`Calculate ${requirement.function}(${requirement.column})`, "This aggregate produces the requested summary value.");
    }

    if (requirement.type === "group-by" && !hasGroupBy(normalizedQuery, requirement.columns)) {
      addFailure(`Group by ${requirement.columns.join(", ")}`, "A selected non-aggregate column needs a group for each result row.");
    }

    if (requirement.type === "join" && !hasJoin(normalizedQuery, requirement)) {
      addFailure(`Use ${requirement.joinType} JOIN with ${requirement.table}`, "The tables must be connected with the required join type and matching keys.");
    }

    if (requirement.type === "like" && !hasLike(normalizedQuery, requirement.column, requirement.pattern)) {
      addFailure(`Filter ${requirement.column} with LIKE '${requirement.pattern}'`, "The percent sign is needed to match any leading characters before the domain.");
    }
  }

  const requiresAnd = question.validation?.requirements?.some((requirement) => requirement.type === "logical-operator" && requirement.value === "AND");

  if (requiresAnd && /\bOR\b/i.test(normalizedQuery)) {
    addFailure("Use AND instead of OR", "OR allows rows that match only one condition, while both conditions are required.");
  }

  if (failures.length > 0) {
    return {
      isCorrect: false,
      message: `Your query is close, but it misses ${failures.length === 1 ? "one requirement" : `${failures.length} requirements`}.`,
      issues: failures,
    };
  }

  return {
    isCorrect: true,
    message: `Correct. Your query meets the required structure for ${tableName}.`,
  };
}
