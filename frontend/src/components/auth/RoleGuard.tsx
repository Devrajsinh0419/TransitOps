'use client';

import React, { useEffect, useState } from 'react';
import { UserRole } from '@/types/auth';
import { authStore } from '@/store/auth.store';
import { EmptyState } from '../empty-state/EmptyState';

export interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const [user, setUser] = useState(authStore.getState().user);

  useEffect(() => {
    const unsubscribe = authStore.subscribe((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  const hasAccess = user && allowedRoles.includes(user.role);

  if (!hasAccess) {
    return (
      fallback || (
        <EmptyState
          variant="denied"
          title="Access Denied"
          description="Your current user role does not possess permissions to load this module."
        />
      )
    );
  }

  return <>{children}</>;
}

export default RoleGuard;
