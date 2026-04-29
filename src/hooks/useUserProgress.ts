'use client';

import { useEffect, useMemo, useState } from 'react';

import { courseWorlds } from '@/data/courseMap';
import { loadProgressFromFirestore, saveLessonProgressToFirestore } from '@/firebase/firestore';
import { useAuth } from '@/hooks/useAuth';
import { getLessonStatus } from '@/lib/progress/mastery';
import { getLessonCompletionXp } from '@/lib/progress/xp';
import type { Lesson } from '@/types/course';
import type { LessonProgress, ProgressSnapshot } from '@/types/progress';

const STORAGE_KEY = 'calcquest-progress';

const defaultSnapshot: ProgressSnapshot = {
  totalXp: 0,
  streakCount: 1,
  dailyXpGoal: 75,
  currentWorldId: 'function-foundations',
  currentLessonId: 'function-machine-basics',
  lessonProgress: {},
};

const readLocalProgress = (): ProgressSnapshot => {
  if (typeof window === 'undefined') {
    return defaultSnapshot;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultSnapshot;
  }

  return { ...defaultSnapshot, ...(JSON.parse(raw) as ProgressSnapshot) };
};

export const useUserProgress = () => {
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(defaultSnapshot);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = async () => {
      const local = readLocalProgress();

      if (!user) {
        setSnapshot(local);
        setLoading(false);
        return;
      }

      const remote = await loadProgressFromFirestore(user.uid);
      const merged = {
        ...local,
        ...remote,
        lessonProgress: {
          ...local.lessonProgress,
          ...remote.lessonProgress,
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      setSnapshot(merged);
      setLoading(false);
    };

    void sync();
  }, [user]);

  const upsertProgress = async (lesson: Lesson, isCorrect: boolean, earnedXp: number) => {
    const current = snapshot.lessonProgress[lesson.id] ?? {
      lessonId: lesson.id,
      worldId: lesson.worldId,
      status: 'available',
      attempts: 0,
      correctCount: 0,
      incorrectCount: 0,
      bestScore: 0,
      xpEarned: 0,
      lastAttemptAt: new Date().toISOString(),
    };

    const next: LessonProgress = {
      ...current,
      attempts: current.attempts + 1,
      correctCount: current.correctCount + (isCorrect ? 1 : 0),
      incorrectCount: current.incorrectCount + (isCorrect ? 0 : 1),
      bestScore: Math.max(current.bestScore, isCorrect ? 100 : current.bestScore),
      xpEarned: current.xpEarned + earnedXp,
      lastAttemptAt: new Date().toISOString(),
    };

    next.status = getLessonStatus(next);

    if (next.status === 'completed' || next.status === 'mastered') {
      next.completedAt ??= new Date().toISOString();
    }

    const bonusXp =
      next.status === 'completed' && current.status !== 'completed' && current.status !== 'mastered'
        ? getLessonCompletionXp(next.incorrectCount === 0)
        : 0;
    const totalXp = snapshot.totalXp + earnedXp + bonusXp;
    const updatedSnapshot: ProgressSnapshot = {
      ...snapshot,
      totalXp,
      currentWorldId: lesson.worldId,
      currentLessonId: lesson.id,
      lessonProgress: {
        ...snapshot.lessonProgress,
        [lesson.id]: next,
      },
    };

    setSnapshot(updatedSnapshot);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnapshot));

    if (user) {
      await saveLessonProgressToFirestore(user.uid, next, totalXp);
    }
  };

  const worldProgress = useMemo(
    () =>
      courseWorlds.map((world) => {
        const completedCount = world.lessons.filter((lesson) => {
          const status = snapshot.lessonProgress[lesson.id]?.status;
          return status === 'completed' || status === 'mastered';
        }).length;

        return {
          worldId: world.id,
          progressPercent: Math.round((completedCount / world.lessons.length) * 100),
        };
      }),
    [snapshot.lessonProgress],
  );

  return {
    snapshot,
    loading,
    upsertProgress,
    worldProgress,
  };
};
