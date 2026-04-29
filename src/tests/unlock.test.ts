import { describe, expect, it } from 'vitest';

import { isWorldUnlocked } from '@/lib/progress/unlock';
import type { LessonProgress } from '@/types/progress';

describe('unlock rules', () => {
  it('keeps composition locked until function foundations progress exists', () => {
    expect(isWorldUnlocked('composition', {})).toBe(false);
  });

  it('unlocks composition after the prerequisite lesson is completed', () => {
    const lessonProgress: Record<string, LessonProgress> = {
      'function-machine-basics': {
        lessonId: 'function-machine-basics',
        worldId: 'function-foundations',
        status: 'completed',
        attempts: 1,
        correctCount: 1,
        incorrectCount: 0,
        bestScore: 100,
        xpEarned: 30,
        lastAttemptAt: new Date().toISOString(),
      },
    };

    expect(isWorldUnlocked('composition', lessonProgress)).toBe(true);
  });
});
