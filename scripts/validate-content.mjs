import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { evaluateSqlQuery } from "../src/features/study-session/evaluateSqlQuery.js";

const certificationDirectory = resolve("content/certifications/hackerrank-sql-basic");

async function readJson(fileName) {
  const filePath = resolve(certificationDirectory, fileName);
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertUniqueIds(records, label) {
  const ids = records.map((record) => record.id);
  assert(ids.every(Boolean), `${label} contain an empty id.`);
  assert(new Set(ids).size === ids.length, `${label} contain duplicate ids.`);
}

const certification = await readJson("certification.json");
const domains = await readJson("domains.json");
const questions = await readJson("questions.json");

assert(certification.id, "Certification is missing an id.");
assert(certification.unofficialNotice, "Certification is missing its unofficial notice.");
assertUniqueIds(domains, "Domains");
assertUniqueIds(questions, "Questions");

const domainIds = new Set(domains.map((domain) => domain.id));
const objectiveIds = new Set();

for (const domain of domains) {
  assert(domain.certificationId === certification.id, `Domain ${domain.id} has the wrong certification id.`);
  assertUniqueIds(domain.objectives, `Objectives in ${domain.id}`);

  for (const objective of domain.objectives) {
    objectiveIds.add(objective.id);
  }
}

for (const question of questions) {
  assert(question.certificationId === certification.id, `Question ${question.id} has the wrong certification id.`);
  assert(domainIds.has(question.domainId), `Question ${question.id} references an unknown domain.`);

  for (const objectiveId of question.objectiveIds ?? []) {
    assert(objectiveIds.has(objectiveId), `Question ${question.id} references an unknown objective.`);
  }

  if (question.type === "sql-query") {
    assert(question.schema?.length, `SQL question ${question.id} is missing its schema.`);
    assert(question.solutionQuery, `SQL question ${question.id} is missing its solution.`);
    assert(evaluateSqlQuery(question.solutionQuery, question).isCorrect, `SQL question ${question.id} rejects its canonical solution.`);
  }
}

console.log(`Validated ${domains.length} domains, ${objectiveIds.size} objectives, and ${questions.length} questions.`);
