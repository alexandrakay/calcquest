'use client';

import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  getStoredDemoUser,
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  resolveGoogleRedirectSignIn,
} from '@/firebase/auth';
import { auth, isFirebaseConfigured } from '@/firebase/client';
import type { AppUser } from '@/types/user';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<'popup' | 'redirect' | 'demo'>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapFirebaseUser = (user: User): AppUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const debugAuthState = (message: string, details?: Record<string, unknown>) => {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
    return;
  }

  console.info('[CalcQuest auth]', message, details ?? {});
};

const isDemoUser = (user: AppUser | User): user is AppUser => 'isDemo' in user;
const isGoogleRedirectResult = (
  value: AppUser | { user: User; mode: 'popup' } | { user: null; mode: 'redirect' },
): value is { user: User; mode: 'popup' } | { user: null; mode: 'redirect' } => 'mode' in value;

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      debugAuthState('Firebase not configured, using stored demo user fallback.');
      setUser(getStoredDemoUser());
      setLoading(false);
      return;
    }

    void resolveGoogleRedirectSignIn().catch((error) => {
      debugAuthState('Google redirect resolution failed.', {
        error: error instanceof Error ? error.message : 'unknown',
      });
    });

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      debugAuthState('Auth state changed.', {
        authenticated: Boolean(nextUser),
        uid: nextUser?.uid ?? null,
      });
      setUser(nextUser ? mapFirebaseUser(nextUser) : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      login: async (email, password) => {
        const nextUser = await loginWithEmail(email, password);
        setUser(isDemoUser(nextUser) ? nextUser : mapFirebaseUser(nextUser));
      },
      register: async (name, email, password) => {
        const nextUser = await registerWithEmail(name, email, password);
        setUser(isDemoUser(nextUser) ? nextUser : mapFirebaseUser(nextUser));
      },
      loginWithGoogle: async () => {
        const nextUser = await loginWithGoogle();
        if ('isDemo' in nextUser) {
          setUser(nextUser);
          return 'demo';
        }

        if (isGoogleRedirectResult(nextUser) && nextUser.mode === 'popup' && nextUser.user) {
          setUser(mapFirebaseUser(nextUser.user));
        }

        return isGoogleRedirectResult(nextUser) ? nextUser.mode : 'demo';
      },
      logout: async () => {
        await logoutUser();
        setUser(null);
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};
