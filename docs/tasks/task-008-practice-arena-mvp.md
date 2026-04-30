# Task 008: Build Practice Arena MVP

## Branch

`codex/task-practice-arena-mvp`

## Status

`planned`

## Summary

CalcQuest now has multiple lesson-specific interactive tools, but the Practice page is still a placeholder. The next MVP step is to turn it into a usable mixed-practice surface where learners can review challenges across worlds.

## Problem

The current Practice page does not let the learner actually practice. That means:

- there is no dedicated review mode outside lesson pages
- users cannot easily revisit concepts across worlds
- the app is missing one of the core MVP screens described in the spec

## Expected Behavior

The Practice Arena MVP should let the learner:

- open a real practice page
- choose a topic or world
- get one challenge at a time from existing lesson data
- submit an answer and receive feedback
- continue practicing without navigating back into lessons

The first version should reuse existing lesson challenge data rather than introducing AI generation yet.

## Implementation Plan

1. Review the existing course map and challenge data structures.
2. Build a practice page client component.
3. Add a topic/world selector using the current static lesson data.
4. Pull one or more challenges from existing lessons into the arena.
5. Reuse the current answer/feedback patterns where possible.
6. Show clear next-question or retry actions.
7. Run tests and build validation.

## Files Likely Involved

- `src/app/practice/page.tsx`
- `src/components/`
- `src/data/courseMap.ts`
- `src/types/course.ts`
- potentially a new practice-specific component under `src/components/`

## Verification Checklist

- practice page is no longer a placeholder
- learner can choose a world or topic
- learner can answer at least one challenge
- feedback appears correctly
- the page works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should favor reuse of the existing lesson challenge model so the arena stays lightweight and aligned with the MVP data structure.
