import type { LessonProgress, LessonStatus } from '@/types/progress';

export const getAccuracy = (progress: Pick<LessonProgress, 'correctCount' | 'incorrectCount'>): number => {
  const total = progress.correctCount + progress.incorrectCount;
  return total === 0 ? 0 : progress.correctCount / total;
};

export const getLessonStatus = (progress: LessonProgress): LessonStatus => {
  const accuracy = getAccuracy(progress);

  if (accuracy >= 0.9 && progress.attempts >= 2) {
    return 'mastered';
  }

  if (accuracy >= 0.7 && progress.correctCount > 0) {
    return 'completed';
  }

  if (progress.attempts > 0) {
    return 'in-progress';
  }

  return progress.status;
};
