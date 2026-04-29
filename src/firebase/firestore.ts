'use client';

import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '@/firebase/client';
import type { LessonProgress, ProgressSnapshot } from '@/types/progress';

export const loadProgressFromFirestore = async (userId: string): Promise<Partial<ProgressSnapshot>> => {
  if (!db) {
    return {};
  }

  const progressSnapshot = await getDocs(collection(db, 'users', userId, 'progress'));
  const lessonProgress = Object.fromEntries(
    progressSnapshot.docs.map((entry) => [entry.id, entry.data() as LessonProgress]),
  );

  return { lessonProgress };
};

export const saveLessonProgressToFirestore = async (
  userId: string,
  progress: LessonProgress,
  totalXp: number,
) => {
  if (!db) {
    return;
  }

  await setDoc(doc(db, 'users', userId, 'progress', progress.lessonId), progress, { merge: true });
  await setDoc(
    doc(db, 'users', userId),
    {
      totalXp,
      currentWorldId: progress.worldId,
      currentLessonId: progress.lessonId,
      lastLoginAt: serverTimestamp(),
      lastActivityDate: new Date().toISOString().slice(0, 10),
    },
    { merge: true },
  );
};
