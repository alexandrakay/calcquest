# Task 007: Build AreaUnderCurveVisualizer

## Branch

`codex/task-area-under-curve-visualizer`

## Status

`planned`

## Summary

CalcQuest now has visual lesson tools for limits and derivatives. The next major MVP interaction is the integrals visualizer that helps learners see accumulation and area under a curve instead of treating integration as a purely symbolic process.

## Problem

The Integrals world currently has lesson content, but it does not yet include the interactive visual tool described in the MVP scope. That means learners are still missing the intuition that integrals add many tiny pieces into a total area.

## Expected Behavior

The `AreaUnderCurveVisualizer` should let the learner:

- view a curve over an interval
- change the number of rectangles used in an area estimate
- see the rectangles fill the area under the curve
- compare rough and refined estimates
- connect the picture to accumulation

The first MVP version should prioritize intuition and responsiveness over advanced numerical methods.

## Implementation Plan

1. Review the Integrals lesson route and identify where the visualizer should appear.
2. Create a client component for the area-under-curve visualizer.
3. Add controls for interval and rectangle count at an MVP-friendly level.
4. Draw the curve and rectangle approximation visually.
5. Show the current estimated area and explain how more slices improve the estimate.
6. Wire the component into the Integrals lesson experience.
7. Run tests and build validation.

## Files Likely Involved

- `src/components/lessons/`
- `src/data/lessons/world-9-integrals.ts`
- `src/components/lessons/LessonExperience.tsx`
- potentially a small math helper under `src/lib/math/`

## Verification Checklist

- integrals lesson includes the visualizer
- learner can change rectangle count
- area estimate updates correctly
- explanation reflects accumulation and approximation quality
- component works on desktop and tablet layouts
- `npm test` passes
- `npm run build` passes

## Notes

This task should mirror the previous visualizers: simple, clear, and game-like enough to make the concept feel tangible right away.
