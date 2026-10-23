const previews = {
  "hackerrank-sql-basic-queries-select-filter-001": {
    columns: ["CITY_ID", "CITY_NAME", "COUNTRY_CODE", "POPULATION"],
    rows: [[12, "Hamilton", "CAN", "536917"], [18, "Winnipeg", "CAN", "749607"]],
  },
  "hackerrank-sql-basic-queries-projection-002": {
    columns: ["PRODUCT_NAME", "UNIT_PRICE"],
    rows: [["Database Design Basics", "$24.00"], ["Practical SQL", "$38.50"]],
  },
  "hackerrank-sql-basic-queries-distinct-003": {
    columns: ["DEPARTMENT_CODE"],
    rows: [["FIN"], ["OPS"], ["ENG"]],
  },
  "hackerrank-sql-basic-sorting-limit-004": {
    columns: ["ROUTE_ID", "ORIGIN", "DESTINATION", "DISTANCE_KM"],
    rows: [[41, "Lisbon", "Warsaw", "2760"], [18, "Denver", "Boston", "2843"], [7, "Seattle", "Miami", "4396"], [29, "Madrid", "Helsinki", "2938"], [13, "Toronto", "Vancouver", "3359"]],
  },
  "hackerrank-sql-basic-functions-count-005": {
    columns: ["OPEN_TICKET_COUNT"],
    rows: [["18"]],
  },
  "hackerrank-sql-basic-functions-average-by-region-006": {
    columns: ["REGION", "AVERAGE_PAID_AMOUNT"],
    rows: [["East", "$420.50"], ["North", "$351.25"], ["West", "$498.00"]],
  },
  "hackerrank-sql-basic-joins-inner-007": {
    columns: ["CUSTOMER_NAME", "ORDER_TOTAL"],
    rows: [["Avery Stone", "$82.50"], ["Jordan Lee", "$140.00"]],
  },
  "hackerrank-sql-basic-joins-left-008": {
    columns: ["TEAM_NAME", "PROJECT_TITLE"],
    rows: [["Platform", "Migration plan"], ["Research", "NULL"], ["Support", "Help-center refresh"]],
  },
  "hackerrank-sql-basic-queries-like-009": {
    columns: ["USER_ID", "DISPLAY_NAME", "EMAIL"],
    rows: [[4, "Sam Rivera", "sam@example.org"], [21, "Mina Park", "mina@example.org"]],
  },
};

export function getResultPreview(questionId) {
  return previews[questionId];
}
