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

import { getStoredDemoUser, loginWithEmail, loginWithGoogle, logoutUser, registerWithEmail } from '@/firebase/auth';
import { auth, isFirebaseConfigured } from '@/firebase/client';
import type { AppUser } from '@/types/user';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapFirebaseUser = (user: User): AppUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

const isDemoUser = (user: AppUser | User): user is AppUser => 'isDemo' in user;

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setUser(getStoredDemoUser());
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
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
        setUser(isDemoUser(nextUser) ? nextUser : mapFirebaseUser(nextUser));
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
