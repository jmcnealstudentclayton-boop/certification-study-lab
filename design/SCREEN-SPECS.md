# Initial screen specifications

These are low-fidelity screen contracts for the first application pass. They describe the learner's task before visual polish or component implementation.

## Home / certification picker

```text
[Brand]                         [Settings]

Welcome back
Choose what you want to study.

[Certification card] [Certification card] [Add certification]
  progress            progress            future action
  last studied        domains             empty state
```

Primary action: open a certification.

Important states: no certifications, content loading, unavailable content, and returning learner with a suggested next action.

## Certification overview

```text
[Back]  Certification name                         [Start practice]
        unofficial study-aid notice

[Quick practice] [Review weak areas] [Browse questions]

Domain performance
[domain row + progress + review action]
```

Primary action: start a study session.

Important states: no published questions, incomplete content, and no previous attempts.

## Study session

```text
[Exit]  Domain name                    Question 3 of 10
        progress indicator

Question prompt

( ) Option A
( ) Option B
( ) Option C
( ) Option D

                         [Submit answer]
```

After submission, keep the options visible, show text-based correctness and explanation, then replace the submit action with `[Next question]`.

Important states: unanswered, submitted-correct, submitted-incorrect, keyboard focus, and session exit confirmation.

## Results

```text
Session complete
Score and plain-language interpretation

[Review missed questions] [Practice weak domains] [Back to certification]

Domain breakdown
```

Primary action: continue studying based on the result, not merely dismiss the score.

## Progress

Show recent sessions, question history, domain trends, and suggested review actions. Avoid implying that a score guarantees certification readiness; describe it as a study signal.

## Responsive and accessibility notes

- Keep the primary action reachable without scrolling when practical.
- On narrow screens, stack cards and keep answer choices full width.
- Do not put essential feedback only in color, icons, or charts.
- Preserve focus after submit and move it intentionally to the feedback or next action.
- Provide an explicit text alternative for progress charts.

