function requireValue(value, label) {
  if (value === undefined || value === null || value === "") {
    throw new Error(`Certification content is missing ${label}.`);
  }
}

function requireUniqueIds(records, label) {
  const ids = records.map((record) => record.id);
  const uniqueIds = new Set(ids);

  if (ids.some((id) => !id) || uniqueIds.size !== ids.length) {
    throw new Error(`${label} must have unique, non-empty ids.`);
  }
}

export function validateCertification(certification) {
  requireValue(certification?.id, "an id");
  requireValue(certification?.name, "a name");
  requireValue(certification?.provider, "a provider");
  requireValue(certification?.unofficialNotice, "an unofficial notice");

  const domains = certification.domains ?? [];
  const questions = certification.questions ?? [];
  const domainIds = new Set(domains.map((domain) => domain.id));
  const objectiveIds = new Set(
    domains.flatMap((domain) => domain.objectives.map((objective) => objective.id)),
  );

  requireUniqueIds(domains, "Domains");
  requireUniqueIds(questions, "Questions");

  for (const domain of domains) {
    if (domain.certificationId !== certification.id) {
      throw new Error(`Domain ${domain.id} has the wrong certification id.`);
    }

    requireUniqueIds(domain.objectives, `Objectives in ${domain.id}`);
  }

  for (const question of questions) {
    requireValue(question.prompt, `a prompt for ${question.id}`);

    if (question.certificationId !== certification.id) {
      throw new Error(`Question ${question.id} has the wrong certification id.`);
    }

    if (!domainIds.has(question.domainId)) {
      throw new Error(`Question ${question.id} references an unknown domain.`);
    }

    for (const objectiveId of question.objectiveIds ?? []) {
      if (!objectiveIds.has(objectiveId)) {
        throw new Error(`Question ${question.id} references an unknown objective.`);
      }
    }

    if (question.type === "single-choice") {
      if (!question.options?.length || !question.correctOptionId) {
        throw new Error(`Single-choice question ${question.id} is incomplete.`);
      }
    }

    if (question.type === "sql-query") {
      if (!question.dialect || !question.schema?.length || !question.solutionQuery) {
        throw new Error(`SQL question ${question.id} is incomplete.`);
      }
    }
  }

  return certification;
}
