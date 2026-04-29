'use client';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type UserCredential,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db, isFirebaseConfigured } from '@/firebase/client';
import type { AppUser } from '@/types/user';

const DEMO_USER_KEY = 'calcquest-demo-user';

const createUserDoc = async (credential: UserCredential) => {
  if (!db) {
    return;
  }

  const { user } = credential;

  await setDoc(
    doc(db, 'users', user.uid),
    {
      displayName: user.displayName ?? user.email?.split('@')[0] ?? 'Learner',
      email: user.email,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      totalXp: 0,
      currentWorldId: 'function-foundations',
      currentLessonId: 'function-machine-basics',
      dailyXpGoal: 75,
      streakCount: 1,
      lastActivityDate: new Date().toISOString().slice(0, 10),
    },
    { merge: true },
  );
};

export const registerWithEmail = async (name: string, email: string, password: string) => {
  if (!isFirebaseConfigured || !auth) {
    const demoUser: AppUser = {
      uid: 'demo-user',
      email,
      displayName: name,
      isDemo: true,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  }

  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (name) {
    await updateProfile(credential.user, { displayName: name });
  }
  await createUserDoc(credential);
  return credential.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  if (!isFirebaseConfigured || !auth) {
    const demoUser: AppUser = {
      uid: 'demo-user',
      email,
      displayName: email.split('@')[0],
      isDemo: true,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  }

  const credential = await signInWithEmailAndPassword(auth, email, password);
  await createUserDoc(credential);
  return credential.user;
};

export const loginWithGoogle = async () => {
  if (!isFirebaseConfigured || !auth) {
    const demoUser: AppUser = {
      uid: 'demo-google-user',
      email: 'demo@calcquest.app',
      displayName: 'Demo Explorer',
      isDemo: true,
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  }

  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  await createUserDoc(credential);
  return credential.user;
};

export const logoutUser = async () => {
  localStorage.removeItem(DEMO_USER_KEY);

  if (auth) {
    await signOut(auth);
  }
};

export const getStoredDemoUser = (): AppUser | null => {
  const raw = localStorage.getItem(DEMO_USER_KEY);
  return raw ? (JSON.parse(raw) as AppUser) : null;
};
