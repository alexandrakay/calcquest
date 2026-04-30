# Task 014: AI World Question Expansion

## Summary

Add AI-generated practice questions directly inside each world so learners can get more reps without leaving the world flow or relying only on the small authored challenge set.

## Problems

- Each MVP world currently has a limited number of built-in mastery questions.
- The existing AI generator is only exposed in the Practice Arena, which makes it feel disconnected from the active world and lesson path.
- Learners need an easy way to request additional questions while staying in the same topic context.

## Goals

- Add an AI-powered question generator to world pages.
- Keep the generated questions scoped to the current world and, when useful, a selected lesson.
- Let learners generate multiple fresh questions in one session.
- Reuse the existing AI route and validation flow instead of creating a second generation path.

## Planned Changes

### World-level AI practice panel

- Add a new world practice component that lives on the world detail page.
- Let the learner choose:
  - a lesson within the world
  - difficulty
  - question type
- Generate AI questions scoped to that lesson/world context.
- Keep generated questions visible in a session list instead of replacing the previous one immediately.

### Reuse and cleanup

- Extend the existing `GenerateProblemButton` API so it can accept `lessonId` and be embedded in more places cleanly.
- Reuse `AIGeneratedProblemCard` for answer checking and explanation.
- Preserve graceful error states when the OpenAI key is missing or the API request fails.

## Files Likely Involved

- `src/components/worlds/WorldDetailClient.tsx`
- `src/components/ai/GenerateProblemButton.tsx`
- `src/components/ai/AIGeneratedProblemCard.tsx`
- `src/app/api/ai/generate-problem/route.ts`
- `src/types/ai.ts`

## Verification Plan

- A world page can generate an AI question without leaving the world.
- The question respects the selected world and lesson context.
- Multiple generated questions can be produced in one browsing session.
- Existing Practice Arena AI generation still works.
- `npm test` passes.
- `npm run build` passes.
