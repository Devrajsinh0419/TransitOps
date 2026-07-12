export interface DashboardStats {
  totalVehicles: number;
  availableVehicles: number;
  vehiclesOnTrip: number;
  vehiclesInMaintenance: number;
  totalDrivers: number;
  driversOnDuty: number;
  activeTrips: number;
  fleetUtilization: number;
}

export interface FleetSummary {
  averageFuelCost: number;
  averageTripDistance: number;
  maintenanceCost: number;
  vehicleRoi: number;
}

export interface TripSummary {
  id: string;
  vehicle: string;
  driver: string;
  source: string;
  destination: string;
  cargo: string;
  status: 'pending' | 'on_trip' | 'completed' | 'cancelled' | 'maintenance';
  eta: string;
}

export interface Activity {
  id: string;
  type: 'vehicle_added' | 'trip_created' | 'maintenance_started' | 'driver_assigned' | 'fuel_logged';
  time: string;
  description: string;
  user: string;
}

export interface Notification {
  id: string;
  category: 'trips' | 'maintenance' | 'drivers' | 'vehicles' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface ChartData {
  vehicleStatus: { name: string; value: number; color: string }[];
  monthlyTrips: { month: string; trips: number; completed: number }[];
  fuelCostTrend: { date: string; cost: number; consumption: number }[];
  fleetUtilization: { time: string; percentage: number }[];
}
