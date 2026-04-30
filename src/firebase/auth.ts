'use client';

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type AuthError,
  type UserCredential,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import { auth, db, isFirebaseConfigured } from '@/firebase/client';
import type { AppUser } from '@/types/user';

const DEMO_USER_KEY = 'calcquest-demo-user';

export class GoogleSignInError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'GoogleSignInError';
    this.code = code;
  }
}

const createGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  return provider;
};

const getAuthErrorCode = (error: unknown) =>
  typeof error === 'object' && error !== null && 'code' in error
    ? String((error as AuthError).code)
    : undefined;

const getGoogleSignInErrorMessage = (code?: string) => {
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'Google sign-in is blocked because this domain is not authorized in Firebase Authentication.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled yet in Firebase Authentication.';
    case 'auth/popup-blocked':
      return 'Google sign-in popup was blocked by the browser.';
    case 'auth/popup-closed-by-user':
      return 'The Google sign-in popup was closed before the sign-in finished.';
    case 'auth/configuration-not-found':
      return 'Google sign-in is missing Firebase provider configuration.';
    default:
      return 'Unable to sign in with Google right now.';
  }
};

const shouldFallbackToRedirect = (code?: string) =>
  code === 'auth/popup-blocked' ||
  code === 'auth/cancelled-popup-request' ||
  code === 'auth/operation-not-supported-in-this-environment';

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

  const provider = createGoogleProvider();

  try {
    const credential = await signInWithPopup(auth, provider);
    await createUserDoc(credential);
    return {
      user: credential.user,
      mode: 'popup' as const,
    };
  } catch (error) {
    const code = getAuthErrorCode(error);

    if (shouldFallbackToRedirect(code)) {
      await signInWithRedirect(auth, provider);
      return {
        user: null,
        mode: 'redirect' as const,
      };
    }

    throw new GoogleSignInError(getGoogleSignInErrorMessage(code), code);
  }
};

export const resolveGoogleRedirectSignIn = async () => {
  if (!isFirebaseConfigured || !auth) {
    return null;
  }

  try {
    const credential = await getRedirectResult(auth);
    if (!credential) {
      return null;
    }

    await createUserDoc(credential);
    return credential.user;
  } catch (error) {
    const code = getAuthErrorCode(error);
    throw new GoogleSignInError(getGoogleSignInErrorMessage(code), code);
  }
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
