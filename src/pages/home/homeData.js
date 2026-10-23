export const certifications = [
  {
    id: "hackerrank-sql-basic",
    name: "SQL (Basic)",
    provider: "HackerRank",
    description: "Build confidence with fundamental queries, filtering, functions, sorting, and joins.",
    progress: 0,
    questions: 20,
    accent: "teal",
    available: true,
  },
  { id: "hackerrank-sql-intermediate", name: "SQL (Intermediate)", provider: "HackerRank", description: "Practice grouped results, subqueries, conditional logic, and window functions.",
    progress: 0,
    questions: 20,
    accent: "orange",
    available: true,
  },
  { id: "hackerrank-sql-advanced", name: "SQL (Advanced)", provider: "HackerRank", description: "Practice advanced analytical SQL patterns and precise query construction.", progress: 0, questions: 20, accent: "teal", available: true },
];

export const studyModes = [
  {
    id: "practice",
    title: "Practice test",
    description: "Test your recall with a focused set of questions.",
    action: "Start practice",
    icon: "clipboard",
    tone: "teal",
  },
  {
    id: "review",
    title: "Quick review",
    description: "Spend ten minutes on a domain that needs attention.",
    action: "Review a domain",
    icon: "spark",
    tone: "orange",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    description: "Refresh key terms before your next practice session.",
    action: "Browse cards",
    icon: "layers",
    tone: "aqua",
  },
];

export const todayFocus = {
  domain: "Basic SQL queries",
  detail: "Start with SELECT, WHERE, and clear filtering conditions",
  progress: 0,
};
