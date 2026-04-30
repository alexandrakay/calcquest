import type { AIGeneratedProblem } from '@/types/ai';

const isDifficulty = (value: unknown): value is AIGeneratedProblem['difficulty'] =>
  value === 'easy' || value === 'medium' || value === 'hard';

const isProblemType = (value: unknown): value is AIGeneratedProblem['type'] =>
  value === 'multiple-choice' || value === 'numeric-input' || value === 'short-explanation' || value === 'bug-hunt';

export const validateAIProblemResponse = (value: unknown): value is AIGeneratedProblem => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const problem = value as Record<string, unknown>;

  return (
    typeof problem.id === 'string' &&
    typeof problem.topic === 'string' &&
    isDifficulty(problem.difficulty) &&
    isProblemType(problem.type) &&
    typeof problem.prompt === 'string' &&
    (typeof problem.correctAnswer === 'string' ||
      typeof problem.correctAnswer === 'number' ||
      (Array.isArray(problem.correctAnswer) && problem.correctAnswer.every((item) => typeof item === 'string'))) &&
    Array.isArray(problem.solutionSteps) &&
    problem.solutionSteps.every((item) => typeof item === 'string') &&
    typeof problem.explanation === 'string' &&
    Array.isArray(problem.hints) &&
    problem.hints.every((item) => typeof item === 'string') &&
    Array.isArray(problem.commonMistakes) &&
    problem.commonMistakes.every((item) => typeof item === 'string') &&
    typeof problem.xp === 'number' &&
    (!problem.choices || (Array.isArray(problem.choices) && problem.choices.every((item) => typeof item === 'string')))
  );
};
