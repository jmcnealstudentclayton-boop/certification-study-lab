# Typical study/testing page

Use this as the first visual direction for the core study experience. It follows a familiar exam layout: persistent progress at the top, one focused question card, clear answer choices, and an obvious submit/continue action.

## Desktop layout

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Certification Study Lab   Certification name   3 / 20   [Exit]       │
│                    ━━━━━━━━━━━━━━━━━━━━━━━ progress                  │
├───────────────────────────────────────┬──────────────────────────────┤
│                                       │ Session                        │
│  Domain: Identity and Access          │  20 questions                  │
│                                       │  12 answered                    │
│  Question 13                          │  8 remaining                    │
│  Which approach best explains ...?    │                                │
│                                       │  [Review flagged]               │
│  ○ Option A                           │  [End session]                  │
│  ○ Option B                           │                                │
│  ○ Option C                           │                                │
│  ○ Option D                           │                                │
│                                       │                                │
│  [Flag question]           [Submit]   │                                │
└───────────────────────────────────────┴──────────────────────────────┘
```

On smaller screens, stack the session panel below the question card and keep the submit action full width.

## Page structure

1. **Header:** product name, certification name, session count, and exit action.
2. **Progress bar:** visual progress plus text such as `Question 3 of 20`.
3. **Question card:** domain label, question prompt, and one native radio group.
4. **Action row:** optional flag action and primary submit action.
5. **Feedback state:** after submission, keep the options visible, identify the result in text, show the explanation, and replace Submit with Next question.
6. **Session panel:** count, remaining questions, review-flagged action, and end-session action.

## Color roles

- Teal `#2EC4B6`: primary action, progress, selected/focus state.
- Orange `#FF9F1C`: accent, flag/review action, important emphasis.
- Peach `#FFBF69`: highlight surface or secondary emphasis.
- Aqua `#CBF3F0`: selected surface, feedback surface, or gentle section background.
- White `#FFFFFF`: page, card, and control surfaces.
- Dark neutral text is allowed for readability; the five colors above remain the only chromatic palette.

## Interaction rules

- Use a native radio group so keyboard selection works naturally.
- Do not reveal correctness until Submit is activated.
- After Submit, move focus to the feedback heading or Next question action.
- Keep the selected option visible after submission.
- Use text labels such as `Correct` or `Review this answer`; do not rely on color alone.
- If the learner selects Exit, confirm before losing an active session.

