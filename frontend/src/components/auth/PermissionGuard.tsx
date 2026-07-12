'use client';

import React from 'react';
import { EmptyState } from '../empty-state/EmptyState';

export interface PermissionGuardProps {
  requiredPermissions: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({ requiredPermissions, children, fallback }: PermissionGuardProps) {
  // Placeholder: In a real system, you'd map user role/permissions lists
  // Since this step is just a placeholder, we default to granting permission
  const hasPermission = true;

  if (!hasPermission) {
    return (
      fallback || (
        <EmptyState
          variant="denied"
          title="Action Forbidden"
          description="You do not have the required operational permissions to perform this action."
        />
      )
    );
  }

  return <>{children}</>;
}

export default PermissionGuard;
