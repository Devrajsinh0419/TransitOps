import { BaseEntity } from './common';

export type UserRole = 'admin' | 'fleet_manager' | 'safety_officer' | 'viewer';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  avatarUrl?: string;
}

export interface Role extends BaseEntity {
  name: string;
  code: UserRole;
  description: string;
  userCount: number;
}

export interface Permission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
  approve: boolean;
}

export type NotificationCategory = 'trips' | 'maintenance' | 'drivers' | 'vehicles' | 'fuel' | 'expenses' | 'system';
export type NotificationStatus = 'read' | 'unread';

export interface Notification extends BaseEntity {
  category: NotificationCategory;
  title: string;
  description: string;
  time: string;
  status: NotificationStatus;
}

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  employeeId: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  language: string;
  address?: string;
  emergencyContact?: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  sidebarMode: 'expanded' | 'collapsed' | 'compact';
  colorAccent: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface FleetSettings {
  vehicleTypes: string[];
  fuelTypes: string[];
  maintenanceCategories: string[];
  expenseCategories: string[];
  tripPriorities: string[];
  defaultDistanceUnit: 'mi' | 'km';
  defaultFuelUnit: 'gal' | 'l' | 'L';
  defaultCurrency: 'USD' | 'EUR' | 'GBP' | 'INR';
  defaultTimezone: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeoutMinutes: number;
  ipWhitelist?: string;
}
