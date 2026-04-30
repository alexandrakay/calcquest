# Task 005: Build LimitApproachVisualizer

## Branch

`codex/task-limit-approach-visualizer`

## Status

`planned`

## Summary

CalcQuest needs a real interactive visual lesson component for the Limits world. This task builds the first `LimitApproachVisualizer` so learners can see values approach a target from the left and right instead of only reading static lesson text.

## Problem

The Limits world currently has lesson content, but it does not yet include the interactive visual tool described in the MVP scope. That means learners are missing the core intuition-building experience that the product is supposed to prioritize.

## Expected Behavior

The `LimitApproachVisualizer` should let the learner:

- choose or view a target `x` value
- move `x` closer to that target from the left and right
- see the corresponding `f(x)` values update
- compare left-hand and right-hand behavior
- understand whether the two-sided limit exists

The visualizer should support simple MVP-friendly behavior first, with clear explanation over mathematical complexity.

## Implementation Plan

1. Review the Limits lesson route and identify where the visualizer should appear.
2. Create a client component for the limit visualizer.
3. Add controls for approaching a target from the left and right.
4. Display numerical values and a simple visual graph or coordinate plot.
5. Add plain-English feedback describing whether the left-hand and right-hand limits agree.
6. Wire the component into the Limits lesson experience.
7. Run tests and build validation.

## Files Likely Involved

- `src/components/lessons/`
- `src/data/lessons/world-6-limits.ts`
- `src/components/lessons/LessonExperience.tsx`
- potentially a small math helper under `src/lib/math/`

## Verification Checklist

- limits lesson includes the visualizer
- learner can approach the target from left and right
- displayed values update correctly
- explanation reflects whether the left and right limits agree
- component works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should prioritize clarity and interactivity over sophisticated graphing infrastructure. A simple SVG-based MVP is enough if the learning signal is strong.
