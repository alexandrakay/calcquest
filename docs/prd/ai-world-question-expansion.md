# PRD: AI World Question Expansion

## Status

Draft

## Owner

CalcQuest

## Summary

Add AI-generated practice questions directly inside each world so learners can get more repetitions on the exact topic they are studying without leaving the world flow. In v1, these questions expand practice volume but do not affect mastery, lesson completion, or world unlock progression.

## Problem

The current world experience has a limited number of authored questions. Learners can understand a concept but still need more repetitions before they feel confident. The Practice Arena helps, but it sits outside the active world and lesson context. This breaks momentum and makes practice feel less connected to the questline.

## Goal

Help learners get more topic-specific practice inside a world, on demand, with fast generation, useful hints, and safe answer checking.

## Non-Goals

- AI questions do not count toward mastery in v1.
- AI questions do not unlock lessons or worlds in v1.
- AI does not become the primary grading authority for progression.
- Long-form free-response grading is not required in v1.
- Permanent history across sessions is not required in v1 unless later added for analytics.

## Target User

- Learners who need more reps on a concept they are currently studying.
- Users who want fast, in-context practice instead of switching to another mode.
- Users who benefit from short explanations and developer-friendly framing.

## User Stories

- As a learner in a world, I want to generate more questions for that world without leaving the page.
- As a learner focused on one lesson, I want questions scoped to that lesson’s concept.
- As a learner, I want to choose difficulty so I can warm up or push myself.
- As a learner, I want hints and explanations when I get a question wrong.
- As a product owner, I want AI practice to be helpful without risking incorrect progression.

## Product Principles

- Stay in context.
- Generate quickly.
- Fail safely.
- Protect trust in progression.
- Prefer simple, verifiable question types first.

## V1 Scope

World pages get an AI practice panel that allows the learner to:

- choose a lesson within the current world
- choose difficulty
- choose question type
- generate multiple fresh questions in the current session
- answer each question with immediate feedback
- view at least one hint and a short explanation

Supported question types in v1:

- multiple choice
- numeric input

Optional if already working cleanly:

- bug hunt
- short explanation as ungraded or lightly graded practice

## Core Experience

1. User opens a world page.
2. User sees an AI Practice Lab section.
3. User selects a lesson focus.
4. User selects difficulty and question type.
5. User taps generate.
6. App returns one structured AI question.
7. User answers it.
8. App checks the answer and shows:
   - correct or incorrect state
   - hint on miss
   - explanation after submission
9. User can generate another question and build a session stack of practice problems.

## Functional Requirements

- AI generation must be scoped to the active world.
- User must be able to narrow generation to a specific lesson in that world.
- Generated questions must use structured output with validation.
- If the AI response is malformed, the app must reject it and show a friendly error.
- Questions must remain visible during the current session until the user leaves or refreshes.
- The learner must be able to generate more than one question per session.
- Existing authored lesson content must remain the primary instructional path.
- Existing practice functionality must continue to work.

## Progression Rules

V1 rule:

- AI-generated world questions are practice-only.

That means:

- no mastery credit
- no lesson completion credit
- no world unlock credit
- no XP tied to progression-critical systems unless later explicitly designed as separate bonus XP

Recommended v1 approach:

- if XP is shown, treat it as practice flavor only and do not let it influence unlock logic
- safest option is to avoid account progression impact entirely for generated questions in v1

## Quality and Safety Requirements

- The system must validate AI response shape before rendering.
- The system should prefer question types that can be checked deterministically.
- The UI should expose a lightweight feedback mechanism in a later iteration:
  - Helpful
  - Confusing
  - Math seems wrong
  - Too easy
  - Too hard

If generation fails:

- show a clear error
- do not break the world page
- allow retry

## UX Requirements

- The AI practice panel should feel like an extension of the world, not a separate mode.
- The learner should not need to navigate away from the world page.
- The panel should support multiple generated questions in one sitting.
- The lesson selector should use the world’s existing lesson names.
- The empty state should clearly explain what AI practice is for.
- Error states should be calm and specific.

## Technical Direction

- Reuse the existing server-side AI generation route.
- Extend generation requests with world and lesson context.
- Keep API key server-only.
- Reuse existing structured validation patterns.
- Reuse the existing AI problem card where possible.
- Keep generated questions client-managed for the current session in v1.

## Analytics and Observability

Track:

- generation attempts
- generation success rate
- generation failure rate
- question type chosen
- difficulty chosen
- lesson focus selected
- answer correctness rate
- hint usage if implemented
- user feedback on question quality if implemented

## Success Metrics

Primary:

- increased practice volume per active learner session
- meaningful use of AI questions from world pages
- low generation failure rate

Secondary:

- higher repeat engagement within worlds
- lower drop-off after finishing authored questions
- positive user feedback on relevance and clarity

## Risks

- AI may generate incorrect or low-quality questions
- Users may assume generated questions count toward progression when they do not
- Too much flexibility may create inconsistency in difficulty
- Slow generation could make the feature feel unreliable

## Mitigations

- restrict v1 to safer question types
- validate structured output
- label AI questions clearly as practice
- show graceful fallback errors
- keep authored mastery path separate

## Rollout Plan

### Phase 1

- world-level AI question generation
- lesson-scoped generation
- multiple-choice and numeric-input support
- session-only generated question list

### Phase 2

- feedback buttons
- retry and anti-repeat improvements
- saved history or analytics-backed review
- optional bonus XP if designed carefully

### Phase 3

- consider whether selected AI questions can contribute to mastery, but only with stronger verification and product safeguards

## Testing Requirements

### Unit

- request validation
- AI response validation
- deterministic answer checking for supported types

### Manual QA

- generate question from each MVP world
- generate question with lesson focus
- multiple question generation in one session
- correct answer feedback
- incorrect answer feedback
- malformed AI response handling
- missing API key handling
- mobile and desktop layout checks

## Open Questions

- Should generated practice award any XP in v1, or stay completely progression-neutral?
- Should generated questions be stored for later review, or remain session-only for now?
- Should short explanation be exposed in the UI if grading confidence is still low?

## Recommended Decisions

- Keep AI world questions practice-only in v1.
- Support multiple-choice and numeric-input first.
- Keep generated questions session-only in v1.
- Do not let AI-generated questions affect unlocks or mastery until quality controls are stronger.
