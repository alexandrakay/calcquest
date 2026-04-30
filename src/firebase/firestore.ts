'use client';

import { collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import type { FirestoreError } from 'firebase/firestore';

import { db } from '@/firebase/client';
import type { LessonProgress, ProgressSnapshot } from '@/types/progress';

export interface FirestoreSyncResult<T> {
  data: T;
  errorCode?: string;
}

const getFirestoreErrorCode = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error
    ? String((error as FirestoreError).code)
    : 'unknown';

export const loadProgressFromFirestore = async (
  userId: string,
): Promise<FirestoreSyncResult<Partial<ProgressSnapshot>>> => {
  if (!db) {
    return { data: {} };
  }

  try {
    const progressSnapshot = await getDocs(collection(db, 'users', userId, 'progress'));
    const lessonProgress = Object.fromEntries(
      progressSnapshot.docs.map((entry) => [entry.id, entry.data() as LessonProgress]),
    );

    return { data: { lessonProgress } };
  } catch (error) {
    return {
      data: {},
      errorCode: getFirestoreErrorCode(error),
    };
  }
};

export const saveLessonProgressToFirestore = async (
  userId: string,
  progress: LessonProgress,
  totalXp: number,
): Promise<FirestoreSyncResult<null>> => {
  if (!db) {
    return { data: null };
  }

  try {
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

    return { data: null };
  } catch (error) {
    return {
      data: null,
      errorCode: getFirestoreErrorCode(error),
    };
  }
};
