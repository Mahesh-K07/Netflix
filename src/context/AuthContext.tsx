import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthContextValue, AuthUser } from '../types/auth';
import { clearAuthUser, getAuthUser, saveAuthUser } from '../utils/storage';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    getAuthUser<AuthUser>(),
  );

  useEffect(() => {
    if (user) {
      saveAuthUser(user);
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const existing = getAuthUser<AuthUser>();
    const nameFromEmail = email.split('@')[0] || 'User';

    const authUser: AuthUser = existing?.email === email
      ? existing
      : {
          id: crypto.randomUUID(),
          name: existing?.name ?? nameFromEmail,
          email,
        };

    setUser(authUser);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      const authUser: AuthUser = {
        id: crypto.randomUUID(),
        name,
        email,
      };

      setUser(authUser);
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    clearAuthUser();
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [login, logout, signup, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

