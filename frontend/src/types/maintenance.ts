import { BaseEntity } from './common';

export type MaintenanceType = 'routine' | 'repair' | 'inspection' | 'breakdown';
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface MaintenanceRecord extends BaseEntity {
  vehicleId: string;
  type: MaintenanceType;
  description: string;
  cost: number;
  scheduledDate: string;
  completedDate?: string;
  status: MaintenanceStatus;
  performedBy: string;
  odometerReading?: number;
}
