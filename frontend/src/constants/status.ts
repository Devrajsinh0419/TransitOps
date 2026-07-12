import { VehicleStatus } from '@/types/vehicle';
import { DriverStatus } from '@/types/driver';
import { TripStatus } from '@/types/trip';
import { MaintenanceStatus } from '@/types/maintenance';
import { ExpenseStatus } from '@/types/expense';

export const VEHICLE_STATUSES: Record<string, VehicleStatus> = {
  ACTIVE: 'active',
  IN_SERVICE: 'in_service',
  MAINTENANCE: 'maintenance',
  OUT_OF_SERVICE: 'out_of_service',
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  active: 'Active',
  in_service: 'In Service',
  maintenance: 'Maintenance',
  out_of_service: 'Out of Service',
};

export const DRIVER_STATUSES: Record<string, DriverStatus> = {
  ACTIVE: 'active',
  ON_TRIP: 'on_trip',
  OFF_DUTY: 'off_duty',
  SUSPENDED: 'suspended',
};

export const DRIVER_STATUS_LABELS: Record<DriverStatus, string> = {
  active: 'Active',
  on_trip: 'On Trip',
  off_duty: 'Off Duty',
  suspended: 'Suspended',
};

export const TRIP_STATUSES: Record<string, TripStatus> = {
  SCHEDULED: 'scheduled',
  IN_TRANSIT: 'in_transit',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
};

export const TRIP_STATUS_LABELS: Record<TripStatus, string> = {
  scheduled: 'Scheduled',
  in_transit: 'In Transit',
  completed: 'Completed',
  cancelled: 'Cancelled',
  delayed: 'Delayed',
};

export const MAINTENANCE_STATUSES: Record<string, MaintenanceStatus> = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const MAINTENANCE_STATUS_LABELS: Record<MaintenanceStatus, string> = {
  scheduled: 'Scheduled',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const EXPENSE_STATUSES: Record<string, ExpenseStatus> = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const EXPENSE_STATUS_LABELS: Record<ExpenseStatus, string> = {
  pending: 'Pending Approval',
  approved: 'Approved',
  rejected: 'Rejected',
};
