const storageKey = "certification-study-lab-progress";

export function readProgress() {
  try { return JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { return {}; }
}

export function saveProgress(progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

export function completionFor(progress, certification) {
  const completed = progress[certification.id] ?? [];
  return { completed, count: completed.length, percent: Math.round((completed.length / certification.questions.length) * 100) };
}
