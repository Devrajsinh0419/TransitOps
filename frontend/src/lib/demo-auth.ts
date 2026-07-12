import { User, UserRole, LoginResponse } from '@/types/auth';

export interface DemoUser extends User {
  password?: string;
}

export const DEMO_USERS: Record<string, DemoUser> = {
  'admin@transitops.com': {
    id: 'demo-admin',
    email: 'admin@transitops.com',
    name: 'System Administrator',
    role: 'admin',
    password: 'Admin@123',
    phoneNumber: '+1 (555) 123-4567',
    createdAt: new Date().toISOString(),
  },
  'fleet@transitops.com': {
    id: 'demo-fleet',
    email: 'fleet@transitops.com',
    name: 'Fleet Manager User',
    role: 'fleet_manager',
    password: 'Fleet@123',
    phoneNumber: '+1 (555) 234-5678',
    createdAt: new Date().toISOString(),
  },
  'safety@transitops.com': {
    id: 'demo-safety',
    email: 'safety@transitops.com',
    name: 'Safety Officer User',
    role: 'safety_officer',
    password: 'Safety@123',
    phoneNumber: '+1 (555) 345-6789',
    createdAt: new Date().toISOString(),
  },
  'finance@transitops.com': {
    id: 'demo-finance',
    email: 'finance@transitops.com',
    name: 'Financial Analyst User',
    role: 'financial_analyst',
    password: 'Finance@123',
    phoneNumber: '+1 (555) 456-7890',
    createdAt: new Date().toISOString(),
  },
};

export async function login(credentials: Record<string, string>): Promise<LoginResponse> {
  const { email, password } = credentials;
  
  // Find matching user
  const user = DEMO_USERS[email];
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.');
  }

  // Create fake tokens
  const accessToken = `demo-access-token-for-${user.role}-${Date.now()}`;
  const refreshToken = `demo-refresh-token-for-${user.role}-${Date.now()}`;
  const expiresAt = String(Date.now() + 60 * 60 * 24 * 7 * 1000); // 7 days from now

  // Store in localStorage as requested: accessToken, refreshToken, user, role, expiresAt
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    }));
    localStorage.setItem('role', user.role);
    localStorage.setItem('expiresAt', expiresAt);
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
    },
    accessToken,
    refreshToken,
  };
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('expiresAt');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    const expiresAt = localStorage.getItem('expiresAt');
    if (!token || !expiresAt) return false;
    
    // Check expiration
    if (Date.now() > Number(expiresAt)) {
      logout();
      return false;
    }
    return true;
  }
  return false;
}
