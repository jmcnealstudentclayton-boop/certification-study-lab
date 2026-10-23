export const certifications = [
  {
    id: "hackerrank-sql-basic",
    name: "SQL (Basic)",
    provider: "HackerRank",
    description: "Build confidence with fundamental queries, filtering, functions, sorting, and joins.",
    progress: 0,
    questions: 9,
    accent: "teal",
    available: true,
  },
  {
    id: "security-fundamentals",
    name: "Security Fundamentals",
    provider: "Planned study track",
    description: "Practice the vocabulary and principles behind modern security work.",
    progress: 0,
    questions: 0,
    accent: "orange",
    available: false,
  },
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
