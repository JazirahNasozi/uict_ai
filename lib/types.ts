// User roles
export type UserRole = 'student' | 'lecturer' | 'admin';

// User model
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  department?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

// Auth state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Login/Register forms
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  // the `name` field represents the school name in the current UI
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // optional metadata retained for compatibility
  role?: UserRole;
  studentId?: string;
}

// Conversation
export interface Message {
  id: string;
  author: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Analytics
export interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalStudents: number;
  totalLecturers: number;
  totalAdmins: number;
  chatVolume: number;
  activeChats: number;
}
