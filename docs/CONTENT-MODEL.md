# Content model

The content model keeps certification knowledge separate from learner state and presentation.

## Certification

```js
/**
 * @typedef {Object} Certification
 * @property {string} id
 * @property {string} name
 * @property {string} provider
 * @property {string=} version
 * @property {string} description
 * @property {string=} officialUrl
 * @property {string} unofficialNotice
 * @property {"draft"|"reviewed"|"published"} status
 * @property {string[]} domainIds
 */
```

Certification content is stored as three human-reviewable files inside a
`content/certifications/<certification-id>/` directory:

- `certification.json` contains the certification manifest and `domainIds`.
- `domains.json` contains the domain and objective records.
- `questions.json` contains the question bank.

## Domain

```js
/**
 * @typedef {Object} Domain
 * @property {string} id
 * @property {string} certificationId
 * @property {string} name
 * @property {string=} description
 * @property {number=} weight
 * @property {{id: string, description: string}[]} objectives
 */
```

## Question

```js
/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} certificationId
 * @property {string} domainId
 * @property {string[]=} objectiveIds
 * @property {"single-choice"|"sql-query"} type
 * @property {string} prompt
 * @property {{id: string, text: string}[]=} options
 * @property {string=} correctOptionId
 * @property {string=} dialect
 * @property {{name: string, columns: {name: string, type: string}[]}[]=} schema
 * @property {string=} solutionQuery
 * @property {{mode: string, requirements: Object[]}=} validation
 * @property {string} explanation
 * @property {Object<string, string>=} distractorExplanations
 * @property {string[]=} commonMistakes
 * @property {"introductory"|"intermediate"|"advanced"} difficulty
 * @property {string[]} tags
 * @property {{label: string, url: string}[]=} references
 * @property {"draft"|"reviewed"|"published"} status
 */
```

## Learner state

Learner state is not part of the question bank. It should reference stable IDs and include a schema version.

```js
/**
 * @typedef {Object} StudyProgress
 * @property {number} schemaVersion
 * @property {AttemptSummary[]} attempts
 * @property {QuestionHistory[]} questionHistory
 * @property {{theme?: "light"|"dark"|"system", defaultSessionLength?: number}} preferences
 */
```

## Content lifecycle

```text
draft → reviewed → published → archived
```

Only published content should appear in normal study sessions. Draft content may be used in authoring or local review workflows.

## Content guidelines

- Use stable IDs such as `cert-domain-concept-001`; do not use array indexes.
- Keep objective and domain names aligned with the official source when referencing an official exam outline, while clearly labeling the app as unofficial.
- Explain both the correct reasoning and the most likely misconception when useful.
- Add a reference for claims that can change with product versions, policies, or standards.
- Use `single-choice` for one-answer selection questions and `sql-query` for
  questions where the learner writes a SQL statement.
- Keep SQL prompts self-contained: include the table schema, identify the SQL
  dialect when it matters, and explain what result the query should return.
- Treat `solutionQuery` as the canonical teaching answer. Future execution
  grading may accept equivalent queries, but it must not rely on string
  equality alone.
- Store question content in human-reviewable files and validate it before loading.
