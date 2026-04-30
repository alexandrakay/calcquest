# Task 009: Build Profile and Progress MVP

## Branch

`codex/task-profile-progress-mvp`

## Status

`planned`

## Summary

CalcQuest now has functioning lessons, world progression, sync status, and a practice arena, but the Profile page is still a placeholder. The next MVP step is to turn it into a meaningful progress screen that helps learners see what they have completed and where they should focus next.

## Problem

The current Profile page does not show real learner progress. That means:

- users cannot review completed lesson status in one place
- there is no progress summary beyond the dashboard hero cards
- the app is missing one of its core persistent learning screens

## Expected Behavior

The Profile and Progress MVP should let the learner:

- view total XP and streak information
- see lesson completion/mastery status across worlds
- understand which worlds are in progress or finished
- get a compact overview of their current learning state

The first version should reuse the existing local/Firebase-backed progress data rather than introducing new analytics infrastructure.

## Implementation Plan

1. Review existing progress state in `useUserProgress`.
2. Design a profile page layout that summarizes progress clearly.
3. Add a world-level summary section.
4. Add a lesson-level completion or mastery list.
5. Reuse existing status and XP logic instead of inventing new metrics.
6. Keep the page responsive and visually aligned with the rest of the app.
7. Run tests and build validation.

## Files Likely Involved

- `src/app/profile/page.tsx`
- `src/components/`
- `src/hooks/useUserProgress.ts`
- potentially shared status-display UI components

## Verification Checklist

- profile page is no longer a placeholder
- total XP and core progress stats are visible
- world and lesson status are visible
- completion/mastery states are understandable at a glance
- page works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should focus on making current progress data useful and visible, not on inventing a full analytics dashboard yet.
