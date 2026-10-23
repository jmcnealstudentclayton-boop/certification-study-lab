# Review a question bank

Use this workflow before marking certification content as reviewed or publishing it in the learner experience.

## Workflow

1. Read `docs/CONTENT-MODEL.md` and identify the certification, domains, and intended difficulty.
2. Validate structure: IDs, required fields, option counts, answer references, status values, and duplicate content.
3. Review accuracy against the cited official or authoritative reference. Flag claims that are time-sensitive or version-specific.
4. Review pedagogy: clear objective, one defensible answer, plausible distractors, useful explanation, and appropriate difficulty.
5. Review language and accessibility: plain wording, no unnecessary trick phrasing, no answer revealed by grammar or length, and no color-only instruction. For SQL-query questions, also check that the schema, dialect, expected result, and canonical solution are self-contained and technically consistent.
6. Review integrity: reject leaked, copied, memorized, or suspiciously reconstructed exam content.
7. Record findings with severity: `blocking`, `important`, or `suggestion`.
8. Mark content reviewed only after blocking and important findings are resolved or explicitly accepted by the project owner.

## Review output

Return:

- Scope reviewed.
- Counts by severity.
- Question IDs needing changes.
- References checked.
- Recommendation: `approve`, `revise`, or `reject`.
