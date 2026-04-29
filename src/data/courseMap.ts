import { compositionWorld } from '@/data/lessons/world-2-composition';
import { derivativesWorld } from '@/data/lessons/world-7-derivatives';
import { functionFoundationsWorld } from '@/data/lessons/world-1-functions';
import { integralsWorld } from '@/data/lessons/world-9-integrals';
import { limitsWorld } from '@/data/lessons/world-6-limits';

export const courseWorlds = [
  functionFoundationsWorld,
  compositionWorld,
  limitsWorld,
  derivativesWorld,
  integralsWorld,
];

export const courseWorldById = Object.fromEntries(courseWorlds.map((world) => [world.id, world]));

export const allLessons = courseWorlds.flatMap((world) => world.lessons);

export const lessonById = Object.fromEntries(allLessons.map((lesson) => [lesson.id, lesson]));
