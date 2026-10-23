const sqlTerms = ["SELECT", "FROM", "WHERE", "AND", "OR", "DISTINCT", "ORDER BY", "GROUP BY", "LIMIT", "INNER JOIN", "LEFT JOIN", "LIKE", "COUNT", "AVG"];

function escapeExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSchemaTerms(schema) {
  return schema.flatMap((table) => [table.name, ...table.columns.map((column) => column.name)]);
}

export default function SqlQuestionPrompt({ prompt, schema }) {
  const schemaTerms = getSchemaTerms(schema);
  const terms = [...new Set([...schemaTerms, ...sqlTerms])].sort((left, right) => right.length - left.length);
  const expression = new RegExp(`(\\b(?:${terms.map(escapeExpression).join("|")})\\b)`, "gi");
  const schemaSet = new Set(schemaTerms.map((term) => term.toLowerCase()));

  return (
    <h2 className="mt-6 text-xl font-medium leading-8 text-ink sm:text-[1.35rem]" id="question-title">
      {prompt.split(expression).map((part, index) => {
        const isSchemaTerm = schemaSet.has(part.toLowerCase());
        const isSqlTerm = sqlTerms.some((term) => term.toLowerCase() === part.toLowerCase());

        if (!isSchemaTerm && !isSqlTerm) return part;

        return (
          <code className={`rounded px-1 py-0.5 font-mono text-[0.86em] font-semibold ${isSchemaTerm ? "bg-study-aqua text-study-teal" : "bg-study-peach/70 text-ink"}`} key={`${part}-${index}`}>
            {part}
          </code>
        );
      })}
    </h2>
  );
}
