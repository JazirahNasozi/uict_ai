import { User, LoginFormData, RegisterFormData, UserRole } from './types';

// Mock user database
const MOCK_USERS: Record<string, User & { password: string }> = {
  'student@uict.ac.ug': {
    id: '1',
    name: 'John Mukasa',
    email: 'student@uict.ac.ug',
    role: 'student',
    studentId: 'UICT/2021/001',
    department: 'Computer Science',
    status: 'active',
    password: 'password123',
    createdAt: new Date('2021-09-01'),
  },
  'lecturer@uict.ac.ug': {
    id: '2',
    name: 'Dr. Sarah Namazzi',
    email: 'lecturer@uict.ac.ug',
    role: 'lecturer',
    department: 'Computer Science',
    status: 'active',
    password: 'password123',
    createdAt: new Date('2020-01-15'),
  },
  'admin@uict.ac.ug': {
    id: '3',
    name: 'Admin User',
    email: 'admin@uict.ac.ug',
    role: 'admin',
    status: 'active',
    password: 'password123',
    createdAt: new Date('2019-06-01'),
  },
};

// Simulate API call with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function loginUser(data: LoginFormData): Promise<User | null> {
  await delay(300);
  const user = MOCK_USERS[data.email];
  if (user && user.password === data.password) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function registerUser(data: RegisterFormData): Promise<User | null> {
  await delay(300);
  
  // Validate passwords match
  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Check if user exists
  if (MOCK_USERS[data.email]) {
    throw new Error('Email already registered');
  }

  const newUser: User & { password: string } = {
    id: String(Object.keys(MOCK_USERS).length + 1),
    name: data.name,
    email: data.email,
    role: data.role,
    studentId: data.studentId,
    department: 'Not specified',
    status: 'active',
    password: data.password,
    createdAt: new Date(),
  };

  MOCK_USERS[data.email] = newUser;
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export async function getUser(email: string): Promise<User | null> {
  await delay(200);
  const user = MOCK_USERS[email];
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function getAllUsers(): Promise<User[]> {
  await delay(300);
  return Object.values(MOCK_USERS).map(({ password, ...user }) => user);
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  await delay(300);
  const userEntry = Object.entries(MOCK_USERS).find(([_, u]) => u.id === id);
  if (!userEntry) return null;
  
  const [email, user] = userEntry;
  const updated = { ...user, ...updates };
  MOCK_USERS[email] = updated;
  
  const { password, ...userWithoutPassword } = updated;
  return userWithoutPassword;
}

export async function deleteUser(id: string): Promise<boolean> {
  await delay(300);
  const userEntry = Object.entries(MOCK_USERS).find(([_, u]) => u.id === id);
  if (!userEntry) return false;
  
  delete MOCK_USERS[userEntry[0]];
  return true;
}

// Get users by role
export async function getUsersByRole(role: UserRole): Promise<User[]> {
  await delay(300);
  return Object.values(MOCK_USERS)
    .filter(u => u.role === role)
    .map(({ password, ...user }) => user);
}

// Demo credentials comment
export const DEMO_CREDENTIALS = {
  student: { email: 'student@uict.ac.ug', password: 'password123' },
  lecturer: { email: 'lecturer@uict.ac.ug', password: 'password123' },
  admin: { email: 'admin@uict.ac.ug', password: 'password123' },
};

// additional helpers could be added here later
