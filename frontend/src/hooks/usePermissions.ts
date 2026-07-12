'use client';

import { useState, useEffect } from 'react';
import { Permission } from '@/types/settings';
import { toast } from 'sonner';

const DEFAULT_PERMISSIONS: Permission[] = [
  { module: 'Dashboard', view: true, create: false, edit: false, delete: false, export: true, approve: false },
  { module: 'Vehicles', view: true, create: true, edit: true, delete: false, export: true, approve: false },
  { module: 'Drivers', view: true, create: true, edit: true, delete: false, export: true, approve: false },
  { module: 'Trips', view: true, create: true, edit: true, delete: true, export: true, approve: true },
  { module: 'Maintenance', view: true, create: true, edit: true, delete: false, export: true, approve: true },
  { module: 'Fuel Logs', view: true, create: true, edit: true, delete: false, export: true, approve: false },
  { module: 'Expenses', view: true, create: true, edit: true, delete: false, export: true, approve: true },
  { module: 'Reports', view: true, create: false, edit: false, delete: false, export: true, approve: false },
  { module: 'Settings', view: true, create: false, edit: true, delete: false, export: false, approve: false },
];

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('transitops_permissions');
    if (saved) {
      setPermissions(JSON.parse(saved));
    } else {
      setPermissions(DEFAULT_PERMISSIONS);
      localStorage.setItem('transitops_permissions', JSON.stringify(DEFAULT_PERMISSIONS));
    }
    setIsLoading(false);
  }, []);

  const updatePermission = async (moduleName: string, action: keyof Omit<Permission, 'module'>, value: boolean): Promise<boolean> => {
    const updated = permissions.map((p) => {
      if (p.module === moduleName) {
        return { ...p, [action]: value };
      }
      return p;
    });

    setPermissions(updated);
    localStorage.setItem('transitops_permissions', JSON.stringify(updated));
    return true;
  };

  const saveAllPermissions = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    localStorage.setItem('transitops_permissions', JSON.stringify(permissions));
    toast.success('Enterprise security permissions matrix synchronized successfully!');
    setIsLoading(false);
    return true;
  };

  return {
    permissions,
    isLoading,
    updatePermission,
    saveAllPermissions,
  };
}

export default usePermissions;
