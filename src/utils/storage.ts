const AUTH_KEY = 'netfix_auth_user';

export function saveAuthUser(value: unknown) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function getAuthUser<T>(): T | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function clearAuthUser() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}

