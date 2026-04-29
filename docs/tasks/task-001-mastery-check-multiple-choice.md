# Task 001: Fix Mastery Check Rendering for Multiple-Choice Challenges

## Branch

`codex/task-mastery-check-multiple-choice`

## Status

`planned`

## Summary

The lesson mastery checkpoint currently renders every challenge as a free-response text input. This breaks multiple-choice lessons because the prompt asks "Which mapping is a function?" but the UI never shows the available answer options.

## Problem

On the Function Foundations lesson page, the first challenge is a `multiple-choice` challenge with defined `choices`. The current lesson UI ignores the challenge type and always renders a single text field.

As a result:

- the learner does not know what choices are available
- the wording "Which" feels broken because no options are visible
- the interaction is inconsistent with the course data model
- answer checking is harder than it needs to be for structured challenge types

## Expected Behavior

For `multiple-choice` challenges, the lesson page should:

- render the available options from `challenge.choices`
- allow the learner to select one option clearly
- submit the selected option as the answer
- show correct and incorrect feedback using the selected choice

The current text-input behavior should remain available for free-response style challenge types such as `numeric-input` and `short-explanation`.

## Likely Root Cause

`LessonExperience` currently treats the mastery checkpoint as a single generic answer form and does not branch on `challenge.type`.

## Implementation Plan

1. Inspect the mastery checkpoint rendering logic in `src/components/lessons/LessonExperience.tsx`.
2. Add challenge-type-aware rendering for `multiple-choice` versus text-based inputs.
3. Use the existing `choices` array for radio-style or select-style answer controls.
4. Keep answer evaluation logic aligned with the rendered control type.
5. Preserve existing XP and progress update behavior.
6. Verify the Function Foundations lesson now shows the mapping options.
7. Run tests and build validation after the UI change.

## Files Likely Involved

- `src/components/lessons/LessonExperience.tsx`
- potentially shared lesson or challenge UI components if extraction becomes worthwhile

## Verification Checklist

- Function Foundations mastery check shows all multiple-choice options
- learner can submit a selected option without typing raw text
- correct answer still passes validation
- incorrect answer still shows hint feedback
- existing numeric-input challenge flow still works
- `npm test` passes
- `npm run build` passes

## Notes

There are existing uncommitted Firebase-related changes in the working tree. This task document is being committed independently so the challenge-rendering fix can stay scoped and traceable.
