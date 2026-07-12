import { BaseEntity } from './common';

export type DriverStatus = 'available' | 'on_trip' | 'off_duty' | 'suspended' | 'leave' | 'inactive';

export type LicenseCategory = 'Class A CDL' | 'Class B CDL' | 'Class C CDL' | 'Class D' | 'Class M';

export interface Driver extends BaseEntity {
  name: string;
  employeeId: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatarUrl?: string;

  // License
  licenseNumber: string;
  licenseCategory: LicenseCategory;
  licenseIssueDate: string;
  licenseExpiry: string;
  issuingAuthority: string;
  licenseScanUrl?: string;

  // Employment
  joiningDate: string;
  department: string;
  experienceYears: number;
  status: DriverStatus;
  salaryPlaceholder?: number;
  assignedVehicleId?: string;
  assignedVehicleName?: string;

  // Health
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  medicalCertificateUrl?: string;
  healthStatus: 'fit' | 'monitoring' | 'unfit';
  visionTestUrl?: string;

  // Performance
  safetyScore: number;
  notes?: string;
  createdDate: string;
}

export interface DriverPerformance {
  safetyScore: number;
  tripsCompleted: number;
  distanceDriven: number; // in miles
  fuelEfficiency?: number; // mpg
  incidentsCount: number;
}

export interface DriverFilters {
  search: string;
  status: string;
  licenseCategory: string;
  availability: string;
  minSafetyScore: string;
  department: string;
  licenseExpiryRange: string;
  sortBy: 'newest' | 'oldest' | 'name' | 'safetyScore' | 'licenseExpiry';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface DriverActivity {
  id: string;
  type: 'registered' | 'trip_assigned' | 'trip_completed' | 'license_updated' | 'profile_edited';
  description: string;
  user: string;
  date: string;
}
