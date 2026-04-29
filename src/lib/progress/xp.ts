import type { Challenge } from '@/types/course';

export const XP_RULES = {
  conceptLesson: 25,
  perfectLessonBonus: 20,
  dailyGoalBonus: 50,
  bossChallenge: 100,
  difficulty: {
    easy: 5,
    medium: 10,
    hard: 20,
  },
} as const;

export const getChallengeXp = (challenge: Challenge): number =>
  challenge.xp || XP_RULES.difficulty[challenge.difficulty];

export const getLessonCompletionXp = (isPerfect: boolean): number =>
  XP_RULES.conceptLesson + (isPerfect ? XP_RULES.perfectLessonBonus : 0);
