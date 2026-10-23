# Agent instructions

## Before changing the project

1. Read `README.md` and the relevant document in `docs/`.
2. Identify whether the request changes product behavior, content, design, or architecture.
3. Keep certification content separate from application logic.
4. Preserve the local-first, static-hosting-compatible direction unless the user explicitly changes it.

## Implementation rules

- Prefer small, composable changes over broad rewrites.
- Use clear JavaScript modules, JSDoc where it improves editor support, and runtime validation at data boundaries.
- Keep every `.js` and `.jsx` file at or below 500 lines. Split large files by responsibility before they reach the limit.
- Use one page entry point per HTML page: `src/pages/<page-name>/index.js`. The HTML page should contain one module-script import to that entry point.
- Use Tailwind CSS utilities and shared theme tokens for styling instead of scattered ad hoc CSS.
- Follow `docs/FILE-STRUCTURE.md` for placement and naming. Do not create generic `utils`, `helpers`, `common`, or barrel `index.js` files.
- Keep page entry files tiny: `src/pages/<page-name>/index.js` should only mount the page and import its global styles.
- Keep page-specific code with its page; promote code into shared folders only after there is a real reuse boundary.
- Do not add a dependency unless it solves a concrete problem and its tradeoffs are documented.
- Use the design tokens in `design/tokens.json`; do not introduce arbitrary colors or spacing values in components without a reason.
- Keep user study data local and private by default. Never commit secrets, tokens, or personal study history.
- Treat all question-bank content as original educational content. Do not copy or paraphrase leaked exam material.
- For a new certification, use the `add-certification` skill and update the content documentation as needed.

## Verification

Before declaring a change complete:

- Run the relevant unit, content-validation, lint, and build checks.
- Check keyboard operation and narrow-screen behavior for UI changes.
- Check that answer feedback does not reveal the answer before submission.
- Update documentation when behavior or architecture changes.
- Report what was changed and which checks were run.
