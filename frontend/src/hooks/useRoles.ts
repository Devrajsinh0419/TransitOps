'use client';

import { useState, useEffect } from 'react';
import { Role } from '@/types/settings';
import { toast } from 'sonner';

export const activeRoles: Role[] = [
  { id: 'rol-1', name: 'Administrator', code: 'admin', description: 'Full access to all system modules, billing accounts, user provisioning, and settings toggles.', userCount: 1, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'rol-2', name: 'Fleet Manager', code: 'fleet_manager', description: 'Access to vehicle manifests, routing schedules, fuel entries, and workshop repairs. Restricted from system preferences.', userCount: 1, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'rol-3', name: 'Safety Officer', code: 'safety_officer', description: 'Access to driver rosters, license certifications, safety ratings logs, and compliance alerts.', userCount: 1, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
  { id: 'rol-4', name: 'Viewer', code: 'viewer', description: 'Read-only access across analytical pages, maps, and vehicle statuses. Cannot write, edit, or approve manifests.', userCount: 1, createdAt: '2026-01-01', updatedAt: '2026-01-01' },
];

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setRoles([...activeRoles]);
    setIsLoading(false);
  }, []);

  const createRole = async (name: string, description: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newRole: Role = {
      id: `rol-${Date.now()}`,
      name,
      code: 'viewer', // default code category
      description,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };

    activeRoles.push(newRole);
    setRoles([...activeRoles]);
    toast.success(`Role ${name} created successfully.`);
    setIsLoading(false);
    return true;
  };

  return {
    roles,
    isLoading,
    createRole,
  };
}

export default useRoles;
