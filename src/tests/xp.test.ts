import { describe, expect, it } from 'vitest';

import { getChallengeXp, getLessonCompletionXp } from '@/lib/progress/xp';

describe('xp helpers', () => {
  it('returns challenge xp', () => {
    expect(
      getChallengeXp({
        id: 'challenge',
        type: 'numeric-input',
        prompt: 'demo',
        correctAnswer: 6,
        explanation: 'demo',
        hints: [],
        xp: 10,
        difficulty: 'easy',
      }),
    ).toBe(10);
  });

  it('adds the perfect lesson bonus', () => {
    expect(getLessonCompletionXp(true)).toBeGreaterThan(getLessonCompletionXp(false));
  });
});
