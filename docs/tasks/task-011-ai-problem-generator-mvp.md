# Task 011: Build AI Problem Generator MVP

## Branch

`codex/task-ai-problem-generator-mvp`

## Status

`planned`

## Summary

CalcQuest now has enough static lessons, practice, and progress systems to support the first AI-powered feature. The next MVP step is to add a server-side problem generator route and a lightweight UI entry point for generating structured practice problems safely.

## Problem

The app currently relies entirely on static challenge content. That means:

- practice is limited to a small set of built-in questions
- learners cannot generate fresh examples within a topic
- the AI architecture described in the product spec is not yet present

## Expected Behavior

The AI problem generator MVP should:

- expose a server-side API route for structured problem generation
- keep the API key server-only
- return a typed JSON problem object
- validate generated output before returning it
- provide a lightweight UI trigger for generating a new practice problem

The first version should prioritize structure, validation, and safe integration over advanced prompt complexity.

## Implementation Plan

1. Add shared AI request/response types and validation helpers.
2. Add a server-side route for problem generation.
3. Add prompt-building logic tailored to the existing CalcQuest topic model.
4. Create a simple UI trigger that requests a generated problem.
5. Render the generated problem in a lightweight practice-style card.
6. Keep the implementation resilient when `OPENAI_API_KEY` is missing.
7. Run tests and build validation.

## Files Likely Involved

- `src/app/api/`
- `src/lib/`
- `src/components/`
- `src/types/`
- potentially practice or lesson page integration points

## Verification Checklist

- server-side AI route exists
- API key remains server-only
- generated problem output is structured and validated
- UI can request and display a generated problem
- missing API key is handled gracefully
- `npm test` passes
- `npm run build` passes

## Notes

This task should keep the AI integration narrow and typed. The goal is to establish safe infrastructure and one useful learner-facing path, not the full tutor system yet.
