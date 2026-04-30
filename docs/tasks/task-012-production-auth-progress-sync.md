# Task 012: Fix Production Auth and Progress Sync State

## Branch

`codex/task-production-auth-progress-sync`

## Status

`planned`

## Summary

In production on Vercel, Google sign-in can succeed, but the app still behaves like the user is effectively in guest mode. The dashboard and progression logic do not fully recognize the authenticated state, which prevents next worlds from unlocking as expected.

## Problem

The user can authenticate in production, but the app still shows guest-like behavior:

- the dashboard indicates guest mode or local-only behavior incorrectly
- progress state does not fully align with the signed-in account
- next worlds do not unlock even after progress should permit it

This creates a confusing production experience because authentication appears to work, but the progression model does not trust or reflect that state.

## Expected Behavior

When a user is successfully authenticated in production:

- the app should stop presenting guest-mode messaging
- user progress should hydrate correctly for the authenticated account
- local fallback should not mask a valid signed-in state
- world unlock logic should reflect the user’s actual completed lessons

## Likely Root Cause

The most likely issue is a mismatch between:

- Firebase auth state resolution
- user document or progress hydration
- local fallback logic in `useUserProgress`
- and the unlock/status logic that depends on the hydrated snapshot

## Implementation Plan

1. Review the production auth flow and progress hydration logic together.
2. Identify where authenticated users can still fall into guest/local fallback messaging.
3. Verify how progress defaults are merged when remote data is empty or unavailable.
4. Fix the logic so authenticated users are represented correctly even when Firestore is partially configured.
5. Ensure world unlock status is computed from the right snapshot state.
6. Keep guest fallback available only for real guest-mode cases.
7. Run tests and build validation.

## Files Likely Involved

- `src/hooks/useAuth.tsx`
- `src/hooks/useUserProgress.ts`
- `src/firebase/firestore.ts`
- `src/components/dashboard/DashboardClient.tsx`
- potentially world unlock helpers or related UI components

## Verification Checklist

- signed-in users no longer see guest-mode messaging incorrectly
- progress snapshot reflects authenticated state correctly
- world unlocking responds to completed lessons as expected
- guest fallback still works for actual unauthenticated users
- `npm test` passes
- `npm run build` passes

## Notes

This task is focused on production auth/progress state correctness, not on adding new learning features.
