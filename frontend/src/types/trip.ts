import { BaseEntity } from './common';

export type TripStatus = 'draft' | 'dispatched' | 'in_progress' | 'completed' | 'cancelled' | 'delayed';

export type TripPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TripRoute {
  source: string;
  destination: string;
  plannedDistance: number; // miles
  estimatedTime: string; // hours/days
  intermediateStops?: string[];
  gpsLocation?: string;
}

export interface TripCargo {
  type: string;
  weight: number; // lbs
  value: number; // USD
  specialInstructions?: string;
}

export interface TripExpense {
  id: string;
  category: 'fuel' | 'toll' | 'maintenance' | 'other';
  amount: number;
  description: string;
  date: string;
}

export interface TripTimeline {
  id: string;
  type: 'created' | 'vehicle_assigned' | 'driver_assigned' | 'dispatched' | 'started' | 'completed' | 'cancelled' | 'delayed';
  description: string;
  user: string;
  date: string;
}

export interface Trip extends BaseEntity {
  tripNumber: string;
  tripName: string;
  tripType: 'one_way' | 'round_trip' | 'multi_stop';
  priority: TripPriority;
  description?: string;
  status: TripStatus;
  
  route: TripRoute;
  
  // Vehicle Assignment
  vehicleId: string;
  vehicleName: string;
  vehicleRegistration: string;
  vehicleCapacity: number; // max weight load
  vehicleOdometer: number;
  
  // Driver Assignment
  driverId: string;
  driverName: string;
  driverPhone: string;
  driverAvatarUrl?: string;
  driverLicenseExpiry: string;
  driverSafetyScore: number;
  
  cargo: TripCargo;
  
  // Financial parameters
  expectedRevenue: number;
  estimatedFuelCost: number;
  estimatedToll: number;
  estimatedExpenses: number;
  
  // Actual values (recorded on completion)
  actualRevenue?: number;
  finalOdometer?: number;
  actualDistance?: number;
  fuelConsumed?: number;
  actualExpenses?: number;
  
  expenses: TripExpense[];
  timeline: TripTimeline[];
  
  dispatchTime?: string;
  completionTime?: string;
  cancellationReason?: string;
  cancellationNotes?: string;
  createdBy: string;
}

export interface TripFilters {
  search: string;
  status: string;
  driverId: string;
  vehicleId: string;
  priority: string;
  dateRange: string;
  sortBy: 'newest' | 'oldest' | 'revenue' | 'distance' | 'tripNumber';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}
