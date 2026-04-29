# Task 003: Improve Google Sign-In Reliability

## Branch

`codex/task-google-signin-reliability`

## Status

`planned`

## Summary

The "Continue with Google" button is not reliably signing users into CalcQuest. The current implementation uses a direct Firebase popup flow with minimal error handling, which can fail silently or surface confusing browser or Firebase errors.

## Problem

Users clicking the Google sign-in button can encounter:

- popup-related browser warnings
- 404 errors from the auth flow
- no successful sign-in completion
- vague or low-signal error feedback

The current code path is:

- create a `GoogleAuthProvider`
- call `signInWithPopup`
- immediately route to `/dashboard`

This is brittle because popup auth can fail for browser-policy reasons, popup blockers, or Firebase provider configuration issues.

## Expected Behavior

The Google sign-in button should:

- attempt sign-in in a browser-safe way
- fall back to redirect-based sign-in when popup auth fails
- provide a useful error message when Firebase setup is incomplete
- complete login cleanly and route the user to the dashboard

## Likely Root Cause

The current implementation relies entirely on `signInWithPopup` and does not:

- fall back to `signInWithRedirect`
- handle popup-blocked or popup-closed failures well
- translate Firebase auth errors into setup guidance

## Implementation Plan

1. Add a task-safe auth flow that can use popup first and redirect as a fallback.
2. Handle Firebase redirect results when the app loads after a Google auth redirect.
3. Improve Google auth error messaging in the login UI.
4. Preserve demo fallback behavior when Firebase is not configured.
5. Verify the login flow still works for email/password auth.
6. Run tests and production build validation.

## Files Likely Involved

- `src/firebase/auth.ts`
- `src/hooks/useAuth.tsx`
- `src/components/auth/AuthForm.tsx`
- potentially login-page messaging if setup guidance needs to be clearer

## Verification Checklist

- Google sign-in button triggers a working auth flow
- popup-blocked flows fall back cleanly
- redirect return is handled correctly
- Firebase configuration issues produce helpful guidance
- email/password auth still works
- `npm test` passes
- `npm run build` passes

## Notes

This task is focused on reliability and user feedback around Google auth, not broader Firebase account management features.
