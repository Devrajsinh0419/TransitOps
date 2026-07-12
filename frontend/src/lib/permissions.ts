import { UserRole } from '@/types/auth';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve';
export type ResourceType = 'vehicles' | 'drivers' | 'trips' | 'maintenance' | 'fuel' | 'expenses' | 'reports' | 'settings';

export const ROLE_PERMISSIONS: Record<UserRole, Record<ResourceType, PermissionAction[]>> = {
  superadmin: {
    vehicles: ['view', 'create', 'edit', 'delete'],
    drivers: ['view', 'create', 'edit', 'delete'],
    trips: ['view', 'create', 'edit', 'delete'],
    maintenance: ['view', 'create', 'edit', 'delete'],
    fuel: ['view', 'create', 'edit', 'delete'],
    expenses: ['view', 'create', 'edit', 'delete', 'approve'],
    reports: ['view', 'create', 'edit', 'delete'],
    settings: ['view', 'create', 'edit', 'delete'],
  },
  admin: {
    vehicles: ['view', 'create', 'edit', 'delete'],
    drivers: ['view', 'create', 'edit', 'delete'],
    trips: ['view', 'create', 'edit', 'delete'],
    maintenance: ['view', 'create', 'edit', 'delete'],
    fuel: ['view', 'create', 'edit', 'delete'],
    expenses: ['view', 'create', 'edit', 'delete', 'approve'],
    reports: ['view', 'create', 'edit'],
    settings: ['view', 'edit'],
  },
  fleet_manager: {
    vehicles: ['view', 'create', 'edit'],
    drivers: ['view', 'create', 'edit'],
    trips: ['view', 'create', 'edit'],
    maintenance: ['view', 'create', 'edit'],
    fuel: ['view', 'create', 'edit'],
    expenses: ['view', 'create', 'edit'],
    reports: ['view', 'create'],
    settings: ['view'],
  },
  dispatcher: {
    vehicles: ['view'],
    drivers: ['view'],
    trips: ['view', 'create', 'edit'],
    maintenance: ['view'],
    fuel: ['view'],
    expenses: ['view'],
    reports: ['view'],
    settings: [],
  },
  driver: {
    vehicles: ['view'],
    drivers: ['view'],
    trips: ['view'],
    maintenance: ['view', 'create'],
    fuel: ['view', 'create'],
    expenses: ['view', 'create'],
    reports: [],
    settings: [],
  },
  viewer: {
    vehicles: ['view'],
    drivers: ['view'],
    trips: ['view'],
    maintenance: ['view'],
    fuel: ['view'],
    expenses: ['view'],
    reports: ['view'],
    settings: [],
  },
};

export function hasPermission(role: UserRole, resource: ResourceType, action: PermissionAction): boolean {
  const permissions = ROLE_PERMISSIONS[role]?.[resource];
  if (!permissions) return false;
  return permissions.includes(action);
}
