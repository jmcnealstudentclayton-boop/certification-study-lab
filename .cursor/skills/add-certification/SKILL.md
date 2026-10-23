# Add a certification

Use this workflow when adding a certification, exam version, domain, objective set, or certification-specific question bank.

## Inputs

- Certification name and official identifier.
- Official exam objectives or domains, if available.
- Intended audience and difficulty.
- Whether the content is draft, reviewed, or published.

## Workflow

1. Read `docs/CONTENT-MODEL.md` and inspect existing certification modules.
2. Confirm the certification is represented as an unofficial study aid and record the official source URL.
3. Create stable certification and domain IDs. Keep IDs independent from display names.
4. Add metadata and objective/domain records before adding questions.
5. Write original questions. For each question, include options, the correct answer, an educational explanation, difficulty, tags, and references where applicable.
6. Keep question status as `draft` until a review pass is complete.
7. Add content-validation tests for required fields, unique IDs, valid references, and exactly one correct answer.
8. Run the question-bank review workflow and fix all blocking findings.
9. Update the roadmap or documentation only if the new certification changes product scope.

## Acceptance checklist

- No question is copied from a proprietary exam or exam dump.
- The official source and the project's unofficial status are clear.
- Every question is answerable from its own wording and options.
- Explanations teach why the answer is correct and why important distractors are wrong.
- Content validation and relevant tests pass; lint/build checks pass when the application is scaffolded.
