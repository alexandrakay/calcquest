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

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultSnapshot;
    }

    return { ...defaultSnapshot, ...(JSON.parse(raw) as ProgressSnapshot) };
  } catch {
    return defaultSnapshot;
  }
};

export const useUserProgress = () => {
  const { user, loading: authLoading } = useAuth();
  const [snapshot, setSnapshot] = useState<ProgressSnapshot>(defaultSnapshot);
  const [loading, setLoading] = useState(true);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncState, setSyncState] = useState<'cloud' | 'local' | 'guest'>('guest');

  const debugProgressState = (message: string, details?: Record<string, unknown>) => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    console.info('[CalcQuest progress]', message, details ?? {});
  };

  useEffect(() => {
    const sync = async () => {
      if (authLoading) {
        debugProgressState('Waiting for auth to resolve before hydrating progress.');
        return;
      }

      setLoading(true);

      try {
        const local = readLocalProgress();

        if (!user) {
          debugProgressState('No authenticated user. Falling back to guest/local progress.', {
            localLessonCount: Object.keys(local.lessonProgress).length,
          });
          setSnapshot(local);
          setSyncState('guest');
          setSyncMessage('You are in guest mode. Progress is being saved on this device only until you sign in.');
          return;
        }

        const remote = await loadProgressFromFirestore(user.uid);
        const merged = {
          ...local,
          ...remote.data,
          lessonProgress: {
            ...local.lessonProgress,
            ...remote.data.lessonProgress,
          },
        };

        debugProgressState('Hydrated progress for authenticated user.', {
          uid: user.uid,
          remoteErrorCode: remote.errorCode ?? null,
          localLessonCount: Object.keys(local.lessonProgress).length,
          mergedLessonCount: Object.keys(merged.lessonProgress).length,
        });

        if (remote.errorCode === 'permission-denied') {
          setSyncState('local');
          setSyncMessage('Cloud sync is unavailable because Firestore permissions are not configured yet. Progress is being saved locally for now.');
        } else if (remote.errorCode) {
          setSyncState('local');
          setSyncMessage('Cloud sync is temporarily unavailable. Progress is still being saved locally on this device.');
        } else {
          setSyncState('cloud');
          setSyncMessage('Cloud sync is active. Your progress is connected to your signed-in account.');
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        setSnapshot(merged);
      } catch {
        debugProgressState('Progress hydration hit an unexpected error and is falling back.', {
          authenticated: Boolean(user),
        });
        setSnapshot(defaultSnapshot);
        setSyncState(user ? 'local' : 'guest');
        setSyncMessage(
          user
            ? 'We hit a progress sync problem, so CalcQuest is falling back to a safe local state for now.'
            : 'Guest mode is active. Progress is being saved on this device only.',
        );
      } finally {
        setLoading(false);
      }
    };

    void sync();
  }, [authLoading, user]);

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
      const saveResult = await saveLessonProgressToFirestore(user.uid, next, totalXp);

      if (saveResult.errorCode === 'permission-denied') {
        setSyncState('local');
        setSyncMessage('Progress was saved locally, but Firestore denied cloud sync. Check your Firebase rules to enable account-based saving.');
      } else if (saveResult.errorCode) {
        setSyncState('local');
        setSyncMessage('Progress was saved locally, but cloud sync is temporarily unavailable.');
      } else {
        setSyncState('cloud');
        setSyncMessage('Cloud sync is active. Your progress is connected to your signed-in account.');
      }
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
    syncMessage,
    syncState,
  };
};
