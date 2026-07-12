import { User, UserRole, LoginResponse } from '@/types/auth';
import { authStore } from '@/store/auth.store';
import { toast } from 'sonner';

export const MOCK_DEMO_USERS: Record<UserRole, User> = {
  superadmin: {
    id: 'usr-admin',
    email: 'sarah.jenkins@transitops.io',
    name: 'Sarah Jenkins',
    role: 'superadmin',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    phoneNumber: '+1 (555) 019-2834',
    createdAt: '2026-01-10T09:00:00Z',
  },
  admin: {
    id: 'usr-admin-2',
    email: 'robert.martinez@transitops.io',
    name: 'Robert Martinez',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    phoneNumber: '+1 (555) 019-8821',
    createdAt: '2026-01-12T10:00:00Z',
  },
  fleet_manager: {
    id: 'usr-mgr',
    email: 'manager.sarah@transitops.io',
    name: 'Sarah Fleet Manager',
    role: 'fleet_manager',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    phoneNumber: '+1 (555) 019-9988',
    createdAt: '2026-02-15T08:30:00Z',
  },
  dispatcher: {
    id: 'usr-disp',
    email: 'emily.chen@transitops.io',
    name: 'Emily Chen',
    role: 'dispatcher',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    phoneNumber: '+1 (555) 019-4411',
    createdAt: '2026-03-20T11:45:00Z',
  },
  driver: {
    id: 'usr-drv',
    email: 'marcus.miller@transitops.io',
    name: 'Marcus Miller',
    role: 'driver',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    phoneNumber: '+1 (555) 019-5566',
    createdAt: '2026-04-01T06:00:00Z',
  },
  viewer: {
    id: 'usr-view',
    email: 'guest.auditor@transitops.io',
    name: 'Audit Guest',
    role: 'viewer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    phoneNumber: '+1 (555) 019-0000',
    createdAt: '2026-05-10T14:20:00Z',
  },
};

export function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('transitops_demo_mode') !== 'false';
}

export function getMockSession(role: UserRole = 'superadmin'): LoginResponse {
  const user = MOCK_DEMO_USERS[role];
  return {
    user,
    accessToken: `demo-jwt-token-for-${role}`,
    refreshToken: `demo-refresh-token-for-${role}`,
  };
}

export function switchDemoRole(role: UserRole) {
  const session = getMockSession(role);
  authStore.setSession(session.user, session.accessToken, session.refreshToken);
  
  toast.success(`Switched role to ${role.replace('_', ' ').toUpperCase()}`, {
    description: `Logged in as ${session.user.name}`,
  });
  
  // Reload window to re-fetch query caches with new permissions context
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

export function resetDemoData() {
  if (typeof window === 'undefined') return;
  
  // Clear non-system storage to reset mocks
  localStorage.clear();
  
  // Re-establish session
  const defaultRole: UserRole = 'superadmin';
  const session = getMockSession(defaultRole);
  authStore.setSession(session.user, session.accessToken, session.refreshToken);
  
  toast.info('Demo database state re-initialized to defaults', {
    description: 'All modified vehicles, drivers, trips, and settings have been reset.',
  });

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
