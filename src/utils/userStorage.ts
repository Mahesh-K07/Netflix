interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
  createdAt: string;
}

const USERS_KEY = 'netfix_users';

function getAllUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveAllUsers(users: StoredUser[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function getUserByEmail(email: string): StoredUser | null {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function createUser(
  name: string,
  email: string,
  password: string,
): StoredUser {
  const users = getAllUsers();

  // Check if user already exists
  if (getUserByEmail(email)) {
    throw new Error('An account with this email already exists');
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password, // In production, hash this password
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveAllUsers(users);

  return newUser;
}

export function verifyUser(email: string, password: string): StoredUser | null {
  const user = getUserByEmail(email);

  if (!user) {
    return null;
  }

  // In production, compare hashed passwords
  if (user.password !== password) {
    return null;
  }

  return user;
}
