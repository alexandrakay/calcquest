# Task 010: Build Onboarding and Study Path MVP

## Branch

`codex/task-onboarding-study-path-mvp`

## Status

`planned`

## Summary

CalcQuest now has lessons, practice, and progress tracking, but it still lacks the guided entry experience described in the spec. The next MVP step is to build a lightweight onboarding flow that helps the learner choose a study path and understand where to begin.

## Problem

The app currently drops the learner into the product without a structured course-planning step. That means:

- there is no guided “start here” experience
- users do not set a goal date or confidence level
- the app does not yet recommend a study path or daily XP target

## Expected Behavior

The onboarding/study-path MVP should let the learner:

- choose a target timeline or study intensity
- rate their current confidence
- receive a simple recommended starting path
- see a lightweight quest-path summary after setup

The first version should be practical and lightweight, not a full adaptive diagnostic engine.

## Implementation Plan

1. Review the current home/dashboard flow and decide where onboarding should live.
2. Create a simple onboarding page or onboarding card flow.
3. Add controls for confidence level and goal cadence.
4. Generate a recommended starting path using existing world structure.
5. Show a summary with next-step guidance and daily XP recommendation.
6. Keep the experience visually aligned with the rest of the app.
7. Run tests and build validation.

## Files Likely Involved

- `src/app/`
- `src/components/`
- `src/data/courseMap.ts`
- `src/types/`
- potentially a new onboarding-specific component set

## Verification Checklist

- learner can complete onboarding inputs
- app shows a study-path recommendation
- output feels consistent with existing MVP world data
- UI works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should focus on an approachable MVP onboarding experience, not a full assessment engine yet.
