# Task 013: Dashboard Hydration and Next World Flow

## Summary

Address two UX issues in the learner journey:

1. The live dashboard feels slow because it blocks on Firebase auth and Firestore progress loading before rendering.
2. After completing a mastery checkpoint, the learner should be able to continue directly into the next relevant world or lesson instead of bouncing back to the dashboard flow.

## Problems

### Problem 1: Slow dashboard loading

Current dashboard rendering waits for:

- Firebase auth resolution
- Firestore progress hydration

This creates a full-screen spinner in production even when local progress is already available and the rest of the UI could render immediately.

### Problem 2: Weak post-checkpoint continuation

Current lesson completion feedback updates mastery state, but it does not create a strong forward path into the next world. The learner should get an explicit next-step button when a mastery checkpoint is passed.

## Goals

- Make the dashboard feel fast by rendering from local progress immediately.
- Keep cloud sync, but move it into the background when possible.
- Preserve correct auth-aware behavior for signed-in and guest users.
- Add a clear next-step CTA after passing a mastery checkpoint.
- Route the learner to the next unlocked lesson/world instead of relying on a dashboard detour.

## Planned Changes

### Dashboard hydration

- Read local progress immediately on the client.
- Stop blocking the dashboard on the Firestore roundtrip.
- Separate "initial local render" from "background cloud sync" state.
- Keep auth resolution logic safe so guest users are still redirected correctly.
- Continue showing sync state messaging, but do not use it as a hard render gate.

### Lesson continuation flow

- Detect when the primary mastery checkpoint is passed.
- Compute the next recommended lesson based on world order and unlock status.
- Show a CTA button after success.
- If the next lesson is in a new world, route directly there.
- If there is no next lesson, route to the world map or dashboard with a completion-style CTA.

## Files Likely Involved

- `src/hooks/useUserProgress.ts`
- `src/components/dashboard/DashboardClient.tsx`
- `src/components/lessons/LessonExperience.tsx`
- `src/lib/progress/unlock.ts`
- `src/data/courseMap.ts`

## Verification Plan

- Dashboard renders quickly with local progress before cloud sync completes.
- Signed-in users still receive merged Firestore progress once the sync finishes.
- Guest users still redirect/login correctly.
- Completing a mastery checkpoint reveals a clear next-step button.
- The next-step button routes into the next relevant lesson/world.
- `npm test` passes.
- `npm run build` passes.
