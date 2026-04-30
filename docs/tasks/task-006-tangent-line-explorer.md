# Task 006: Build TangentLineExplorer

## Branch

`codex/task-tangent-line-explorer`

## Status

`planned`

## Summary

CalcQuest now has a working visual lesson tool for limits. The next major learning interaction for the MVP is a derivative visualizer that shows how a tangent line changes as a point moves along a curve.

## Problem

The Derivatives world currently has lesson content, but it does not yet include the interactive visual tool described in the MVP scope. That means learners are still missing the central intuition for derivatives as instantaneous rate of change.

## Expected Behavior

The `TangentLineExplorer` should let the learner:

- move a point along a curve
- see the tangent line update in real time
- observe whether the slope is positive, negative, or zero
- connect the graph behavior to derivative intuition

The first MVP version should prioritize clarity and responsiveness over advanced graphing features.

## Implementation Plan

1. Review the Derivatives lesson route and identify where the visualizer should appear.
2. Create a client component for the tangent line explorer.
3. Add a control for moving the active point along the curve.
4. Draw the curve, the active point, and the tangent line.
5. Display numerical or plain-English slope feedback.
6. Wire the component into the Derivatives lesson experience.
7. Run tests and build validation.

## Files Likely Involved

- `src/components/lessons/`
- `src/data/lessons/world-7-derivatives.ts`
- `src/components/lessons/LessonExperience.tsx`
- potentially a small math helper under `src/lib/math/`

## Verification Checklist

- derivatives lesson includes the tangent line explorer
- learner can move the active point along the curve
- tangent line updates correctly
- feedback reflects whether the slope is positive, negative, or zero
- component works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should follow the same MVP philosophy as the limit visualizer: intuitive, visual, and immediately useful rather than mathematically exhaustive.
