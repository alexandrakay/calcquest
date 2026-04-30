# Plan: AI World Question Expansion

## Status

Approved draft

## Source

Derived from the AI World Question Expansion PRD.

## Durable Architectural Decisions

- Keep AI generation server-side through the existing problem-generation API route.
- Keep AI-generated world questions practice-only in v1.
- Keep generated questions session-local in the client for the first rollout.
- Restrict deterministic answer checking to safer question types first.
- Reuse a shared generator surface and a shared AI question card across world and practice contexts.

## Phase 1: Trusted Core Slice

### Demo Outcome

A learner can generate one AI question from a world, answer it, and get safe feedback.

### Scope

- World-level AI practice panel on unlocked world pages
- Lesson-scoped generation
- `multiple-choice` and `numeric-input` only
- Structured validation on every response
- Friendly loading and failure states
- Clear labeling that generated questions are practice-only

### Why This Phase Comes First

This is the smallest end-to-end slice that proves the value of in-world AI practice without risking progression trust.

## Phase 2: Multi-Question Session Slice

### Demo Outcome

A learner can build a useful practice session inside a world instead of generating one isolated problem at a time.

### Scope

- In-session generated question stack or list
- Generate another question without losing prior ones
- Per-question answer state
- Basic anti-repeat input to the generator using recent generated IDs or topics
- Cleaner session reset behavior when switching lesson focus

### Why This Phase Comes Second

This turns the feature from a single novelty action into a meaningful repetition loop.

## Phase 3: Quality and Trust Slice

### Demo Outcome

Learners can flag weak questions and the app becomes more resilient to bad outputs.

### Scope

- Feedback controls:
  - Helpful
  - Confusing
  - Math seems wrong
  - Too easy
  - Too hard
- Better fallback messaging for malformed or weak responses
- Restrict or hide weaker question types unless confidence is high
- Optional visibility into whether a question is auto-checkable versus explanation-only

### Why This Phase Comes Third

Trust needs to improve before the feature expands in breadth or depth.

## Phase 4: Memory and Review Slice

### Demo Outcome

Generated questions remain useful beyond the current moment instead of disappearing with the session.

### Scope

- Optional persistence for generated questions and user feedback
- Recent practice or review-generated-questions capability
- Analytics hooks for generation success, failure, and learner usage

### Why This Phase Comes Fourth

Persistence increases product value, but it is not required to prove the core experience.

## Phase 5: Progression Experiment Slice

### Demo Outcome

The product can safely test whether selected AI practice should influence the broader game loop.

### Scope

- Only after quality data exists
- Limited bonus XP or review credit, not direct unlocks at first
- Stronger verification gates before any mastery relationship
- Explicit product rules that prevent AI from becoming the sole progression authority

### Why This Phase Comes Last

This is the highest-risk product decision and should be based on evidence rather than assumption.

## Recommended Ordering

1. Trusted Core Slice
2. Multi-Question Session Slice
3. Quality and Trust Slice
4. Memory and Review Slice
5. Progression Experiment Slice

## Explicit V1 Cuts

- Short explanation grading
- Bug-hunt generation unless tightly validated
- Persistent storage unless analytics are needed immediately
- Any mastery or unlock impact

## Success Criteria By Phase

### Phase 1

- A world page can generate a relevant AI question
- The learner can answer it and get deterministic feedback
- Errors fail safely

### Phase 2

- A learner can generate multiple useful questions in one session
- Switching lesson context behaves predictably

### Phase 3

- Low-quality questions can be flagged
- The UI communicates limitations clearly

### Phase 4

- Generated practice becomes reviewable or analyzable over time

### Phase 5

- Any progression-related experiment is constrained, measurable, and reversible
