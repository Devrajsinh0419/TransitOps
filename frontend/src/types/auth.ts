export type UserRole = 'superadmin' | 'admin' | 'fleet_manager' | 'dispatcher' | 'driver' | 'viewer' | 'safety_officer' | 'financial_analyst';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState extends AuthSession {
  isLoading: boolean;
  error: string | null;
}

export interface AuthErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
