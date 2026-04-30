# Task 004: Add Visible Sync Status UI

## Branch

`codex/task-sync-status-ui`

## Status

`planned`

## Summary

CalcQuest now falls back to local progress when Firestore sync fails, but the user has no visible indication of whether their progress is cloud-synced or local-only. This task adds clear, lightweight sync status messaging in the UI.

## Problem

The app can currently:

- save progress locally
- attempt to sync progress to Firestore
- fall back when Firestore permissions are missing

But the UI does not clearly tell the user which mode they are in. That makes it hard to understand:

- whether progress is actually saved to the cloud
- whether Firebase setup is complete
- why a Firebase issue might affect persistence across devices

## Expected Behavior

The app should display a visible sync status that:

- indicates when progress is syncing normally
- explains when the app is using local-only progress
- gives a short, helpful explanation when Firestore permissions are missing
- avoids overwhelming the learner with technical noise

## Implementation Plan

1. Review current progress hook output and identify where sync status can be exposed.
2. Create a lightweight UI component for sync status messaging.
3. Add the component to the dashboard and lesson experience where progress matters most.
4. Tailor the message for:
   - cloud sync available
   - local-only fallback
   - Firestore permissions not configured
5. Keep the design consistent with the existing dark-mode card layout.
6. Run tests and build validation.

## Files Likely Involved

- `src/hooks/useUserProgress.ts`
- `src/components/dashboard/`
- `src/components/lessons/`
- potentially a new shared UI component under `src/components/ui/`

## Verification Checklist

- dashboard shows current sync mode clearly
- lesson page shows relevant sync status near progress-related UI
- permission-denied state explains local-only fallback
- messaging remains concise and not overly technical
- `npm test` passes
- `npm run build` passes

## Notes

This task is about communication and UX clarity, not changing the underlying progress logic again.
