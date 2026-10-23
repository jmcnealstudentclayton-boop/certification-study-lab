# Certification Study Lab

This project is a local-first study website for preparing for professional certifications through original practice tests, explanations, review sessions, and progress tracking.

The repository has completed its foundation pass and now includes the first React/Vite/Tailwind home-page scaffold. Certification content and study-session behavior will be added next.

## Product principles

- **Study-first:** every feature should improve recall, understanding, or exam readiness.
- **Original content:** practice questions are written for this project and are not copied from proprietary exam dumps.
- **Local-first:** the first usable version should work without an account, backend, or network connection after the app is loaded.
- **Evidence-aware:** explanations and references should make it possible to verify why an answer is correct.
- **Accessible by default:** keyboard use, readable contrast, clear feedback, and responsive layouts are requirements.
- **Certification-agnostic:** certification-specific content belongs in data modules, not scattered through UI code.

## Repository map

```text
.
├── .cursor/
│   ├── rules/                  # Project rules for Cursor Agent
│   └── skills/                 # Reusable certification-project workflows
├── design/                     # Design tokens and visual system notes
├── docs/
│   ├── decisions/              # Architecture decision records
│   ├── ARCHITECTURE.md
│   ├── CONTENT-MODEL.md
│   ├── DESIGN-SYSTEM.md
│   ├── PRODUCT-VISION.md
│   └── ROADMAP.md
├── content/                    # Authored certification content
│   └── certifications/
│       └── hackerrank-sql-basic/ # First certification track
├── public/                     # Fixed-path static assets
├── scripts/                    # Project validation and maintenance scripts
├── AGENTS.md                   # General agent instructions
├── src/                        # React application and page entry points
├── index.html                  # Home page shell with one module-script import
├── package.json
└── README.md
```

## Working with Cursor

Project rules are in `.cursor/rules/*.mdc`. The project skills are in `.cursor/skills/**/SKILL.md` and can be invoked when a task matches their workflow:

- `add-certification`: add a certification module and its content safely.
- `review-question-bank`: audit questions for correctness, ambiguity, accessibility, and source quality.
- `build-study-feature`: plan and implement a study experience feature while preserving the architecture.

Read [AGENTS.md](AGENTS.md) and the relevant files in `docs/` before making application changes.

## Current implementation

The application uses React, JavaScript, Vite, and Tailwind CSS, with static hosting compatibility for GitHub Pages. The home page is implemented at `src/pages/home/`; the certification overview and study session are view components selected by `src/app/App.jsx` through hash navigation. This is a provisional decision recorded in [the architecture document](docs/ARCHITECTURE.md) and can be revisited through a decision record.

Run the app through Vite with `npm run dev`. Do not open `index.html` with a generic Live Server extension; Vite resolves the React module imports and serves files from `public/`, while a generic static server cannot resolve those bare module specifiers.

If you prefer the Live Server extension, use the bundled build instead:

```powershell
npm run build:watch
```

Keep that command running, then open `dist/index.html` with Live Server. Vite will rebuild `dist/` when source files change, and Live Server will reload the bundled page. Do not open the source-root `index.html` with Live Server; it is the Vite development entry and intentionally contains npm module imports.

JavaScript and JSX files should remain at or below 500 lines. When a file approaches the limit, split it by responsibility rather than compressing or hiding logic.

## Content and legal note

The site should identify itself as an unofficial study aid. Do not include confidential, leaked, or reconstructed proprietary exam questions. When certification terms, objectives, or product behavior are referenced, link to the official source where practical.
