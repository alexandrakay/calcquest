import type { WorldId } from '@/types/course';

export type LessonStatus =
  | 'locked'
  | 'available'
  | 'in-progress'
  | 'completed'
  | 'mastered';

export interface LessonProgress {
  lessonId: string;
  worldId: WorldId;
  status: LessonStatus;
  attempts: number;
  correctCount: number;
  incorrectCount: number;
  bestScore: number;
  xpEarned: number;
  completedAt?: string;
  lastAttemptAt: string;
}

export interface ProgressSnapshot {
  totalXp: number;
  streakCount: number;
  dailyXpGoal: number;
  currentWorldId: WorldId;
  currentLessonId: string;
  lessonProgress: Record<string, LessonProgress>;
}
