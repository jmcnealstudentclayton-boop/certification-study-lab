# Build a study feature

Use this workflow for learner-facing features such as quiz sessions, timed practice, review mode, flashcards, progress views, or study plans.

## Workflow

1. Read `docs/PRODUCT-VISION.md`, `docs/ARCHITECTURE.md`, `docs/DESIGN-SYSTEM.md`, and `docs/FILE-STRUCTURE.md`.
2. Write down the learner goal, starting state, happy path, empty state, error state, and completion state.
3. Identify the domain model and state transitions before designing components. Place page-specific code with the page and feature-specific behavior with the feature.
4. Keep scoring and study logic framework-independent where practical; keep UI responsible for presentation and interaction.
5. Reuse the design tokens and accessible interaction patterns.
6. Add tests for state transitions, scoring, persistence boundaries, and the main keyboard-accessible user flow.
7. Test narrow-screen layout and refresh/re-entry behavior when local persistence is involved.
8. Update documentation if the feature changes the architecture or introduces a new persisted-data version.

## Acceptance checklist

- The feature has a clear learner outcome.
- Loading, empty, error, and completion states are intentional.
- Keyboard and screen-reader-friendly interaction works.
- The feature does not expose answers prematurely.
- Progress behavior is deterministic and recoverable.
- Relevant tests, lint checks, and the production build pass.
