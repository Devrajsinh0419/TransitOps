import { VehicleStatus } from '@/types/vehicle';
import { DriverStatus } from '@/types/driver';
import { TripStatus } from '@/types/trip';
import { MaintenanceStatus } from '@/types/maintenance';
import { ExpenseStatus } from '@/types/expense';

export const VEHICLE_STATUSES: Record<string, VehicleStatus> = {
  AVAILABLE: 'available',
  ON_TRIP: 'on_trip',
  MAINTENANCE: 'maintenance',
  RETIRED: 'retired',
  INACTIVE: 'inactive',
  DISPOSED: 'disposed',
};

export const VEHICLE_STATUS_LABELS: Record<VehicleStatus, string> = {
  available: 'Available',
  on_trip: 'On Trip',
  maintenance: 'Maintenance',
  retired: 'Retired',
  inactive: 'Inactive',
  disposed: 'Disposed',
};

export const DRIVER_STATUSES: Record<string, DriverStatus> = {
  AVAILABLE: 'available',
  ON_TRIP: 'on_trip',
  OFF_DUTY: 'off_duty',
  SUSPENDED: 'suspended',
  LEAVE: 'leave',
  INACTIVE: 'inactive',
};

export const DRIVER_STATUS_LABELS: Record<DriverStatus, string> = {
  available: 'Available',
  on_trip: 'On Trip',
  off_duty: 'Off Duty',
  suspended: 'Suspended',
  leave: 'On Leave',
  inactive: 'Inactive',
};

export const TRIP_STATUSES: Record<string, TripStatus> = {
  DRAFT: 'draft',
  DISPATCHED: 'dispatched',
  IN_TRANSIT: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
};

export const TRIP_STATUS_LABELS: Record<TripStatus, string> = {
  draft: 'Draft',
  dispatched: 'Dispatched',
  in_progress: 'In Progress',
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
