import { BaseEntity } from './common';

export type DriverStatus = 'active' | 'on_trip' | 'off_duty' | 'suspended';

export interface Driver extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  status: DriverStatus;
  currentVehicleId?: string;
  avatarUrl?: string;
  rating?: number;
}
