import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthContextValue, AuthUser } from '../types/auth';
import { clearAuthUser, getAuthUser, saveAuthUser } from '../utils/storage';
import { isValidEmail, validatePassword, validateName } from '../utils/validation';
import { createUser, verifyUser } from '../utils/userStorage';

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
    // Validate email format
    if (!email || !email.trim()) {
      throw new Error('Email is required');
    }

    if (!isValidEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate password
    if (!password || !password.trim()) {
      throw new Error('Password is required');
    }

    if (password.length < 4) {
      throw new Error('Password must be at least 4 characters long');
    }

    // Verify user credentials
    const storedUser = verifyUser(email.trim(), password);

    if (!storedUser) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Set authenticated user (without password)
    const authUser: AuthUser = {
      id: storedUser.id,
      name: storedUser.name,
      email: storedUser.email,
    };

    setUser(authUser);
  }, []);

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      // Validate name
      if (!name || !name.trim()) {
        throw new Error('Name is required');
      }

      const nameValidation = validateName(name);
      if (!nameValidation.isValid) {
        throw new Error(nameValidation.error || 'Invalid name');
      }

      // Validate email
      if (!email || !email.trim()) {
        throw new Error('Email is required');
      }

      if (!isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password
      if (!password || !password.trim()) {
        throw new Error('Password is required');
      }

      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        throw new Error(passwordValidation.errors[0] || 'Invalid password');
      }

      // Create new user
      try {
        const storedUser = createUser(name.trim(), email.trim(), password);

        // Set authenticated user (without password)
        const authUser: AuthUser = {
          id: storedUser.id,
          name: storedUser.name,
          email: storedUser.email,
        };

        setUser(authUser);
      } catch (error) {
        throw error;
      }
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

