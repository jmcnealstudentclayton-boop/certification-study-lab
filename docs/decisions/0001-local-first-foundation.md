# ADR 0001: Local-first static foundation

- Status: accepted
- Date: 2026-10-22

## Context

The project is intended for personal study, local use, and possible GitHub hosting. The first version needs to be inexpensive to run, private by default, and easy to understand while the content and study loop are being developed.

## Decision

Start with a client-side React + JavaScript + Vite application styled with Tailwind CSS. Use one JavaScript page entry per HTML page, with each entry importing the components and styles needed by that page. Store version-controlled certification content with the project and store learner preferences and progress in browser storage behind an adapter. Keep the build compatible with static hosting.

## Consequences

Benefits:

- Works locally without a backend.
- Keeps early learner data on the learner's device.
- Supports GitHub Pages or similar static hosting.
- Makes content and quiz logic easy to test in isolation.

Tradeoffs:

- Cross-device sync is not available initially.
- Browser storage needs schema versioning and corruption handling.
- Sensitive or high-value content should not be treated as secret merely because it is bundled into the client.

## Revisit when

Revisit this decision when cross-device sync, collaborative authoring, protected content, or server-side analytics becomes a confirmed requirement.
