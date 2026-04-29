import { describe, expect, it } from 'vitest';

import { getAccuracy, getLessonStatus } from '@/lib/progress/mastery';

describe('mastery helpers', () => {
  it('calculates accuracy', () => {
    expect(getAccuracy({ correctCount: 7, incorrectCount: 3 })).toBe(0.7);
  });

  it('marks mastered after high accuracy and two attempts', () => {
    expect(
      getLessonStatus({
        lessonId: 'demo',
        worldId: 'composition',
        status: 'available',
        attempts: 2,
        correctCount: 9,
        incorrectCount: 1,
        bestScore: 100,
        xpEarned: 40,
        lastAttemptAt: new Date().toISOString(),
      }),
    ).toBe('mastered');
  });
});
