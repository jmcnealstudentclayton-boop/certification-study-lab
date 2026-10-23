# File structure and naming

This structure is deliberately small at the beginning and grows by feature. It keeps page bootstrapping, learner capabilities, shared UI, certification content, and infrastructure separate without creating an enterprise-sized folder tree too early.

## Current and target structure

```text
certs/
├── index.html                         # Home HTML shell; one module-script import
├── package.json
├── vite.config.js
├── scripts/                          # Content validation and maintenance scripts
├── public/                            # Fixed-path assets only
│   └── favicon.svg
├── content/                           # Authored certification content
│   └── certifications/
│       └── <certification-id>/
│           ├── certification.json
│           ├── domains.json
│           └── questions.json
├── design/                            # Tokens and screen/design specifications
├── docs/                              # Product and engineering documentation
├── src/
│   ├── app/                           # App shell and current hash-based view selection
│   ├── components/
│   │   ├── layout/                    # Shared shell, header, navigation
│   │   └── ui/                        # Shared primitives and controls
│   ├── content/                       # Content loaders and validators
│   ├── features/
│   │   ├── progress/                  # Progress capability
│   │   └── study-session/             # Quiz/session capability
│   ├── lib/
│   │   ├── storage/                   # Browser persistence adapters
│   │   └── validation/                # Generic boundary validation
│   ├── pages/
│   │   ├── home/
│   │   │   ├── index.js               # Page boot entry only
│   │   │   ├── HomePage.jsx            # Page composition
│   │   │   └── homeData.js             # Home-only fixture/presentation data
│   │   ├── certification/
│   │   │   └── CertificationPage.jsx  # Certification overview view
│   │   └── study/
│   │       └── StudyPage.jsx           # SQL study-session view
│   └── styles/
│       └── index.css                   # Tailwind import, theme, global rules
├── tests/
│   └── e2e/                            # Browser-level workflows
└── .cursor/
    ├── rules/
    └── skills/
```

## How to decide where a file goes

Ask these questions in order:

1. Is it the browser entry for a page? Put it in `src/pages/<page>/index.js`.
2. Is it used only by one page? Keep it in that page folder.
3. Is it a complete learner capability used by multiple pages? Put it in `src/features/<feature>/`.
4. Is it a reusable visual primitive or shell piece? Put it in `src/components/ui/` or `src/components/layout/`.
5. Is it certification knowledge? Put it in root `content/`.
6. Is it storage, validation, formatting, or another infrastructure concern? Put it in `src/lib/`.

If none of these answers is clear, do not create a generic `utils` folder. Give the module a specific responsibility first.

## Page entry convention

Vite supports multiple HTML entry points. The home page currently uses:

```html
<div id="root"></div>
<script type="module" src="/src/pages/home/index.js"></script>
```

When a second standalone HTML page is needed, pair it with a matching page entry:

```text
study/index.html
src/pages/study/index.js
src/pages/study/StudyPage.jsx
```

The Vite build configuration must list the additional HTML file as an input. The entry file should stay tiny and should never become a second application component. The current app does not need additional HTML pages because `src/app/App.jsx` handles its three hash-based views in one shell.

## Naming examples

```text
QuestionCard.jsx             # React component
StudySessionPanel.jsx        # React component
useStudySession.js           # React hook
scoreAttempt.js              # domain function
studyData.js                 # data module
QuestionCard.test.jsx        # component test
scoreAttempt.test.js         # logic test
```

Avoid names such as `Thing.jsx`, `helpers.js`, `misc.js`, `data.js`, or `index.js` outside page entry folders. A name should tell the next person what responsibility the file owns.

## Testing placement

Unit and component tests should sit beside the source file they exercise. Browser workflows belong in `tests/e2e/`. This keeps a failing test easy to locate while leaving cross-page scenarios visibly separate from component tests.

## Asset placement

Prefer source imports for component assets so Vite can include them in the module graph. Use `public/` for fixed URLs such as `/favicon.svg`, `/manifest.webmanifest`, `/robots.txt`, or files that must keep an exact filename.

## Research basis

- Vite treats HTML as part of the module graph and supports multiple HTML entry points. It recommends importing assets from source unless a stable public URL is required. See [Vite multi-page apps](https://vite.dev/guide/build#multi-page-app) and [Vite static asset handling](https://vite.dev/guide/assets).
- React describes the root module as an entry point and uses the module dependency tree as a useful way to reason about application structure. See [Understanding Your UI as a Tree](https://react.dev/learn/understanding-your-ui-as-a-tree).
- React notes that large component files become difficult to navigate and can be split into separate component modules. See [Describing the UI](https://react.dev/learn/describing-the-ui).
- Vitest supports colocated `*.test.js` and `*.spec.js` files and notes that there is no single universal test-directory structure. See [Vitest test files](https://main.vitest.dev/guide/learn/writing-tests).
