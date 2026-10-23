# Design system

The visual system should feel calm, focused, and trustworthy. It should support concentration during a test and clarity during review.

## Design principles

- **Focus:** one primary task per screen.
- **Clarity:** make state, progress, and next action obvious.
- **Confidence:** use consistent feedback and explain results.
- **Warmth without distraction:** approachable surfaces and restrained accents.
- **Accessible by default:** contrast, focus, type size, and motion are part of the design, not polish.

## Source of truth

Foundational values live in [`design/tokens.json`](../design/tokens.json). Components should consume Tailwind theme bindings from these tokens rather than inventing unrelated values.

## Color palette

The product palette is intentionally limited to:

- `#FF9F1C` — orange action/accent.
- `#FFBF69` — warm highlight.
- `#FFFFFF` — page and card surface.
- `#CBF3F0` — soft aqua background/selection surface.
- `#2EC4B6` — teal primary action.

Use a dark neutral only for readable text and accessible outlines. Do not introduce additional chromatic colors without updating this document and the token file.

## Core components to design first

1. App shell and navigation.
2. Certification card.
3. Study-mode picker.
4. Question card with answer options.
5. Submit and next actions.
6. Correct/incorrect feedback panel.
7. Progress summary and domain breakdown.
8. Empty, loading, error, and completion states.

## Interaction requirements

- The current question and progress indicator remain easy to locate.
- Selected, submitted, correct, and incorrect states are visually and textually distinct.
- Focus order follows the task order.
- Feedback is announced or associated with the submitted question for assistive technology.
- A learner can restart or leave a session without losing already saved progress.
- Use the typical testing layout documented in [`design/STUDY-PAGE.md`](../design/STUDY-PAGE.md) as the first visual direction.
