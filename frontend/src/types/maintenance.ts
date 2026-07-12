import { BaseEntity } from './common';

export type MaintenanceType = 'routine' | 'repair' | 'inspection' | 'breakdown';
export type MaintenanceStatus = 'pending' | 'approved' | 'in_progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'critical';

export interface MaintenanceRecord extends BaseEntity {
  maintenanceId: string; // e.g. MNT-2026-0001
  vehicleId: string;
  vehicleRegistration: string;
  vehicleName: string;
  vehicleOdometer: number;
  vehicleStatus: string;
  type: MaintenanceType;
  issueTitle: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  technicianName: string;
  workshop: string;
  scheduledDate: string; // expected start date
  completionDate?: string; // expected or actual completion date
  estimatedDuration: string;
  
  // Cost breakdown
  estimatedCost: number;
  labourCost: number;
  partsCost: number;
  tax: number;
  totalCost: number;
  
  timeline: {
    id: string;
    type: string;
    description: string;
    user: string;
    date: string;
  }[];
}

export interface MaintenanceFilters {
  search?: string;
  vehicleId?: string;
  status?: string;
  priority?: string;
  dateRange?: string;
  page: number;
  limit: number;
}
