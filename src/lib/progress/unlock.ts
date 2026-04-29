import { courseWorlds } from '@/data/courseMap';
import type { LessonProgress, LessonStatus } from '@/types/progress';
import type { WorldId } from '@/types/course';

export const isWorldUnlocked = (
  worldId: WorldId,
  lessonProgress: Record<string, LessonProgress>,
): boolean => {
  const world = courseWorlds.find((entry) => entry.id === worldId);

  if (!world || world.prerequisites.length === 0) {
    return true;
  }

  return world.prerequisites.every((prerequisiteId) => {
    const prerequisiteWorld = courseWorlds.find((entry) => entry.id === prerequisiteId);

    if (!prerequisiteWorld) {
      return true;
    }

    const completedLessons = prerequisiteWorld.lessons.filter((lesson) => {
      const status = lessonProgress[lesson.id]?.status;
      return status === 'completed' || status === 'mastered';
    }).length;

    return completedLessons >= Math.max(1, Math.ceil(prerequisiteWorld.lessons.length * 0.5));
  });
};

export const getWorldStatus = (
  worldId: WorldId,
  lessonProgress: Record<string, LessonProgress>,
): LessonStatus => {
  if (!isWorldUnlocked(worldId, lessonProgress)) {
    return 'locked';
  }

  const world = courseWorlds.find((entry) => entry.id === worldId);
  if (!world) {
    return 'locked';
  }

  const statuses = world.lessons.map((lesson) => lessonProgress[lesson.id]?.status ?? 'available');

  if (statuses.every((status) => status === 'mastered')) {
    return 'mastered';
  }

  if (statuses.every((status) => status === 'completed' || status === 'mastered')) {
    return 'completed';
  }

  if (statuses.some((status) => status === 'in-progress' || status === 'completed' || status === 'mastered')) {
    return 'in-progress';
  }

  return 'available';
};
