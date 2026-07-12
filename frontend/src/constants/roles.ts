import { UserRole } from '@/types/auth';

export const ROLES: Record<string, UserRole> = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  FLEET_MANAGER: 'fleet_manager',
  DISPATCHER: 'dispatcher',
  DRIVER: 'driver',
  VIEWER: 'viewer',
  SAFETY_OFFICER: 'safety_officer',
  FINANCIAL_ANALYST: 'financial_analyst',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: 'Super Admin',
  admin: 'Administrator',
  fleet_manager: 'Fleet Manager',
  dispatcher: 'Dispatcher',
  driver: 'Driver',
  viewer: 'Viewer / Read-Only',
  safety_officer: 'Safety Officer',
  financial_analyst: 'Financial Analyst',
};
