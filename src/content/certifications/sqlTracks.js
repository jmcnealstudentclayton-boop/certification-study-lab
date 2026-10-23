import sqlBasic from "./hackerrankSqlBasic.js";

const notice = "This project is an unofficial study aid. It is not affiliated with or endorsed by HackerRank, and it does not reproduce official assessment questions.";
const schema = [{ name: "WORK_ITEMS", columns: [{ name: "ID", type: "INTEGER" }, { name: "NAME", type: "VARCHAR(120)" }, { name: "STATUS", type: "VARCHAR(20)" }, { name: "AMOUNT", type: "DECIMAL(10,2)" }, { name: "CREATED_AT", type: "TIMESTAMP" }, { name: "GROUP_ID", type: "INTEGER" }] }];

function question(track, index, prompt, solutionQuery) {
  return { id: `${track}-practice-${String(index).padStart(2, "0")}`, certificationId: track, domainId: `${track}-practice`, objectiveIds: [`${track}-queries`], type: "sql-query", prompt, dialect: "standard-sql", schema, solutionQuery, validation: { mode: "canonical-query" }, explanation: "Compare your clause order, selected expressions, and conditions with the requested result.", commonMistakes: [], difficulty: track.replace("hackerrank-sql-", ""), tags: ["sql-query-writing"], references: [], status: "draft" };
}

function track(id, name, description, exercises) {
  return {
    id, name, provider: "HackerRank", description, officialUrl: `https://www.hackerrank.com/skills-directory/${id.replace("hackerrank-", "").replace(/-/g, "_")}`, unofficialNotice: notice,
    domains: [{ id: `${id}-practice`, certificationId: id, name: "Query practice", description: "Apply the SQL patterns covered by this study level.", objectives: [{ id: `${id}-queries`, description: "Write accurate SQL queries for the requested result." }], status: "draft" }],
    questions: exercises.map(([prompt, solution], index) => question(id, index + 1, prompt, solution)), status: "draft",
  };
}

const basicExtra = [
  ["Return ID and NAME for open work items.", "SELECT ID, NAME FROM WORK_ITEMS WHERE STATUS = 'OPEN';"],
  ["Return every work item created after January 1, 2025.", "SELECT * FROM WORK_ITEMS WHERE CREATED_AT > '2025-01-01';"],
  ["Return the total AMOUNT for all work items.", "SELECT SUM(AMOUNT) AS TOTAL_AMOUNT FROM WORK_ITEMS;"],
  ["Return the smallest and largest AMOUNT values.", "SELECT MIN(AMOUNT) AS MIN_AMOUNT, MAX(AMOUNT) AS MAX_AMOUNT FROM WORK_ITEMS;"],
  ["Return work item names in alphabetical order.", "SELECT NAME FROM WORK_ITEMS ORDER BY NAME ASC;"],
  ["Return the three newest work items.", "SELECT * FROM WORK_ITEMS ORDER BY CREATED_AT DESC LIMIT 3;"],
  ["Return work items that are OPEN or PENDING.", "SELECT * FROM WORK_ITEMS WHERE STATUS = 'OPEN' OR STATUS = 'PENDING';"],
  ["Return the number of work items in each STATUS.", "SELECT STATUS, COUNT(*) AS ITEM_COUNT FROM WORK_ITEMS GROUP BY STATUS;"],
  ["Insert an open work item named 'Draft brief' with amount 125.00.", "INSERT INTO WORK_ITEMS (NAME, STATUS, AMOUNT) VALUES ('Draft brief', 'OPEN', 125.00);"],
  ["Update the status of work item 12 to CLOSED.", "UPDATE WORK_ITEMS SET STATUS = 'CLOSED' WHERE ID = 12;"],
  ["Delete the work item with ID 99.", "DELETE FROM WORK_ITEMS WHERE ID = 99;"],
];

const intermediate = [
  ["Return each GROUP_ID with its average AMOUNT, excluding null groups.", "SELECT GROUP_ID, AVG(AMOUNT) AS AVERAGE_AMOUNT FROM WORK_ITEMS WHERE GROUP_ID IS NOT NULL GROUP BY GROUP_ID;"],
  ["Return groups with more than five work items.", "SELECT GROUP_ID, COUNT(*) AS ITEM_COUNT FROM WORK_ITEMS GROUP BY GROUP_ID HAVING COUNT(*) > 5;"],
  ["Return each item's NAME and its rank by AMOUNT from highest to lowest.", "SELECT NAME, RANK() OVER (ORDER BY AMOUNT DESC) AS AMOUNT_RANK FROM WORK_ITEMS;"],
  ["Return a running total of AMOUNT ordered by CREATED_AT.", "SELECT ID, CREATED_AT, SUM(AMOUNT) OVER (ORDER BY CREATED_AT) AS RUNNING_AMOUNT FROM WORK_ITEMS;"],
  ["Return work items whose AMOUNT is above the overall average.", "SELECT * FROM WORK_ITEMS WHERE AMOUNT > (SELECT AVG(AMOUNT) FROM WORK_ITEMS);"],
  ["Return the latest work item in each GROUP_ID.", "SELECT * FROM WORK_ITEMS w WHERE CREATED_AT = (SELECT MAX(CREATED_AT) FROM WORK_ITEMS WHERE GROUP_ID = w.GROUP_ID);"],
  ["Return status labels using CASE: active for OPEN and inactive otherwise.", "SELECT NAME, CASE WHEN STATUS = 'OPEN' THEN 'active' ELSE 'inactive' END AS STATUS_LABEL FROM WORK_ITEMS;"],
  ["Return each GROUP_ID and its total amount, including only totals over 1000.", "SELECT GROUP_ID, SUM(AMOUNT) AS TOTAL_AMOUNT FROM WORK_ITEMS GROUP BY GROUP_ID HAVING SUM(AMOUNT) > 1000;"],
  ["Return unique statuses and the first creation date for each.", "SELECT STATUS, MIN(CREATED_AT) AS FIRST_CREATED_AT FROM WORK_ITEMS GROUP BY STATUS;"],
  ["Return open work items with a row number per GROUP_ID.", "SELECT NAME, GROUP_ID, ROW_NUMBER() OVER (PARTITION BY GROUP_ID ORDER BY CREATED_AT) AS ITEM_NUMBER FROM WORK_ITEMS WHERE STATUS = 'OPEN';"],
  ["Return groups whose average amount exceeds 200.", "SELECT GROUP_ID FROM WORK_ITEMS GROUP BY GROUP_ID HAVING AVG(AMOUNT) > 200;"],
  ["Return the percentage of items that are open.", "SELECT 100.0 * SUM(CASE WHEN STATUS = 'OPEN' THEN 1 ELSE 0 END) / COUNT(*) AS OPEN_PERCENTAGE FROM WORK_ITEMS;"],
  ["Return names with a missing amount shown as zero.", "SELECT NAME, COALESCE(AMOUNT, 0) AS AMOUNT FROM WORK_ITEMS;"],
  ["Return items created in 2025.", "SELECT * FROM WORK_ITEMS WHERE EXTRACT(YEAR FROM CREATED_AT) = 2025;"],
  ["Return the second-highest distinct amount.", "SELECT MAX(AMOUNT) AS SECOND_HIGHEST_AMOUNT FROM WORK_ITEMS WHERE AMOUNT < (SELECT MAX(AMOUNT) FROM WORK_ITEMS);"],
  ["Return each status with its share of total item count.", "SELECT STATUS, COUNT(*) * 1.0 / SUM(COUNT(*)) OVER () AS STATUS_SHARE FROM WORK_ITEMS GROUP BY STATUS;"],
  ["Return items whose name begins with A through M.", "SELECT * FROM WORK_ITEMS WHERE NAME BETWEEN 'A' AND 'Mzzzz';"],
  ["Return groups that have at least one open item.", "SELECT DISTINCT GROUP_ID FROM WORK_ITEMS WHERE STATUS = 'OPEN';"],
  ["Return the latest five closed work items.", "SELECT * FROM WORK_ITEMS WHERE STATUS = 'CLOSED' ORDER BY CREATED_AT DESC LIMIT 5;"],
  ["Return each group with the count of distinct statuses.", "SELECT GROUP_ID, COUNT(DISTINCT STATUS) AS STATUS_COUNT FROM WORK_ITEMS GROUP BY GROUP_ID;"],
];

const advanced = intermediate.map(([prompt, solution], index) => [
  `Advanced ${index + 1}: Use a CTE named source_rows, then ${prompt.replace(/^Return /, "return ").replace(/^Write /, "write ")}`,
  `WITH source_rows AS (SELECT * FROM WORK_ITEMS) ${solution.replaceAll("WORK_ITEMS", "source_rows")}`,
]);

const basic = { ...sqlBasic, questions: [...sqlBasic.questions, ...basicExtra.map(([prompt, solution], index) => question("hackerrank-sql-basic", index + 10, prompt, solution))] };
export const sqlIntermediate = track("hackerrank-sql-intermediate", "SQL (Intermediate)", "Practice grouped results, subqueries, conditional logic, and window functions.", intermediate);
export const sqlAdvanced = track("hackerrank-sql-advanced", "SQL (Advanced)", "Practice advanced analytical SQL patterns and precise query construction.", advanced);
export default basic;
