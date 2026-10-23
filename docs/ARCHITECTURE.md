# Architecture

## Direction

The provisional implementation target is a React + JavaScript + Vite application styled with Tailwind CSS. It should build to static assets suitable for local use and GitHub Pages. A backend can be added later only when a concrete product need justifies it.

The detailed placement and naming rules live in [`docs/FILE-STRUCTURE.md`](FILE-STRUCTURE.md). The architecture favors shallow feature boundaries and colocated page code over a large collection of global folders.

## Page entry strategy

The current app uses one Vite HTML shell and one module-script import. Hash navigation keeps the home, certification overview, and study session as separate page components while preserving the local-first static build:

```html
<div id="root"></div>
<script type="module" src="/src/pages/home/index.js"></script>
```

The entry mounts `src/app/App.jsx`, which selects the page component from the URL hash. Current views are `#dashboard`, `#certification/<id>`, and `#study/<id>`. Each page component stays under `src/pages/<page-name>/`, while feature behavior stays under `src/features/`.

If a future feature needs an independently addressable HTML document, use the multi-page pattern: add an HTML shell, a matching `src/pages/<page-name>/index.js` entry, and the corresponding Vite input. Each HTML page must still contain one module-script import.

For Live Server development, run `npm run build:watch` and serve `dist/index.html`. The built HTML uses relative asset paths so it works when Live Server serves `dist/` as a subdirectory of the workspace. The source-root `index.html` is only for Vite’s module-aware development server.

Keep every `.js` and `.jsx` file at or below 500 lines. A page entry should remain small; split UI into components and logic into domain or feature modules as the page grows.

## Layers

```text
Certification content
        ↓
Validated domain models
        ↓
Study-session and scoring logic
        ↓
UI components and page entries
        ↓
Local persistence for progress and preferences
```

### Content

Certification metadata, objectives, domains, and question banks are version-controlled project content. They should be loadable independently of the UI.

### Domain logic

The quiz engine owns question selection, answer submission, scoring, feedback state, session completion, and progress aggregation. It should not depend on browser APIs.

### UI

The UI renders study states and handles learner interaction. It should not duplicate scoring rules or infer correctness from presentation labels.

### Persistence

The first version stores preferences and progress in browser storage behind a small persistence adapter. The adapter should tolerate missing, old, malformed, or cleared data.

## Proposed implementation layout

```text
src/
├── app/          # app shell and hash-based view selection
├── components/   # reusable accessible UI, split into layout and ui
├── content/      # loaders and content adapters
├── features/     # learner-facing feature modules and feature-local domain logic
├── lib/          # storage, validation, and infrastructure adapters
├── pages/        # one index.js entry per HTML page
├── styles/       # Tailwind entry and theme bindings
└── tests/        # shared test helpers, if needed
content/
└── certifications/
    └── <certification-id>/
        ├── certification.json
        ├── domains.json
        └── questions.json
```

## Key constraints

- No certification-specific branching in generic quiz components.
- No direct local-storage calls inside domain logic.
- No answer key shipped separately from the question model in a way that can drift.
- No secret or account requirement for the initial experience.
- Keep all persisted data versioned so the schema can evolve safely.
- Keep each HTML page to one module-script import.
- Keep JavaScript and JSX files at or below 500 lines.
- Keep styling in Tailwind utilities and shared theme tokens before adding custom CSS.

## Future options

Possible later additions include encrypted export/import, a backend for cross-device sync, spaced-repetition scheduling, and authoring tools. None is required for the first release.
