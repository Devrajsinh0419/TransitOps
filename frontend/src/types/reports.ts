import { BaseEntity } from './common';

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface ReportFilters {
  dateRange?: string; // e.g. "2026-07-01 to 2026-07-31"
  vehicleId?: string;
  driverId?: string;
  tripStatus?: string;
  vehicleType?: string;
  maintenanceStatus?: string;
  fuelType?: string;
  expenseType?: string;
  priority?: string;
  search?: string;
}

export interface ExecutiveKPICardData {
  title: string;
  value: string | number;
  trend: number; // e.g. +12.5% or -3.4%
  comparison: string; // e.g. "vs last month"
  iconName: string;
  sparkline: number[];
}

export interface ExecutiveKPIs {
  totalFleet: ExecutiveKPICardData;
  fleetUtilization: ExecutiveKPICardData;
  tripsCompleted: ExecutiveKPICardData;
  tripsActive: ExecutiveKPICardData;
  maintenanceCost: ExecutiveKPICardData;
  fuelCost: ExecutiveKPICardData;
  operationalCost: ExecutiveKPICardData;
  averageFuelEfficiency: ExecutiveKPICardData;
  driverPerformance: ExecutiveKPICardData;
  revenue: ExecutiveKPICardData;
  profit: ExecutiveKPICardData;
  vehicleAvailability: ExecutiveKPICardData;
}

export interface FleetAnalyticsReport {
  vehicleStatusDistribution: ChartDataPoint[];
  fleetUtilizationTrend: ChartDataPoint[];
  vehicleUsageByType: ChartDataPoint[];
  vehicleAvailability: ChartDataPoint[];
  vehicleLifecycle: ChartDataPoint[];
  vehicleROIPositioning: ChartDataPoint[]; // scatter / bubble representation
  cards: {
    mostUsedVehicle: { label: string; value: string; extra: string };
    leastUsedVehicle: { label: string; value: string; extra: string };
    highestCostVehicle: { label: string; value: string; extra: string };
    newestVehicle: { label: string; value: string; extra: string };
    oldestVehicle: { label: string; value: string; extra: string };
  };
}

export interface TripAnalyticsReport {
  tripsPerMonth: ChartDataPoint[];
  tripsByRoute: ChartDataPoint[];
  tripsByDriver: ChartDataPoint[];
  tripsByVehicle: ChartDataPoint[];
  distanceCovered: ChartDataPoint[];
  revenueTrend: ChartDataPoint[];
  cards: {
    longestTrip: { label: string; value: string; extra: string };
    highestRevenueTrip: { label: string; value: string; extra: string };
    cancelledTrips: { label: string; value: string; extra: string };
    completedTrips: { label: string; value: string; extra: string };
    averageDistance: { label: string; value: string; extra: string };
    averageDuration: { label: string; value: string; extra: string };
  };
}

export interface DriverAnalyticsReport {
  driverPerformance: ChartDataPoint[];
  tripsCompleted: ChartDataPoint[];
  safetyScore: ChartDataPoint[];
  licenseStatus: ChartDataPoint[];
  distanceDriven: ChartDataPoint[];
  cards: {
    topDriver: { label: string; value: string; extra: string };
    lowestSafetyScore: { label: string; value: string; extra: string };
    driversOnDuty: { label: string; value: string; extra: string };
    driversOffDuty: { label: string; value: string; extra: string };
    licenseExpiringSoon: { label: string; value: string; extra: string };
  };
}

export interface MaintenanceAnalyticsReport {
  maintenanceCost: ChartDataPoint[];
  maintenanceFrequency: ChartDataPoint[];
  vehiclesInShop: ChartDataPoint[];
  maintenanceTrend: ChartDataPoint[];
  downtimeAnalysis: ChartDataPoint[];
  cards: {
    highestMaintenanceVehicle: { label: string; value: string; extra: string };
    openRequests: { label: string; value: string; extra: string };
    completedServices: { label: string; value: string; extra: string };
    upcomingServices: { label: string; value: string; extra: string };
  };
}

export interface FuelAnalyticsReport {
  fuelCostTrend: ChartDataPoint[];
  fuelConsumption: ChartDataPoint[];
  mileageTrend: ChartDataPoint[];
  fuelEfficiency: ChartDataPoint[];
  fuelByVehicle: ChartDataPoint[];
  cards: {
    highestFuelCost: { label: string; value: string; extra: string };
    averageMileage: { label: string; value: string; extra: string };
    mostEfficientVehicle: { label: string; value: string; extra: string };
    leastEfficientVehicle: { label: string; value: string; extra: string };
  };
}

export interface ExpenseAnalyticsReport {
  expensesByCategory: ChartDataPoint[];
  monthlyExpenses: ChartDataPoint[];
  vehicleExpenses: ChartDataPoint[];
  departmentExpenses: ChartDataPoint[];
  cards: {
    highestExpense: { label: string; value: string; extra: string };
    lowestExpense: { label: string; value: string; extra: string };
    averageMonthlyExpense: { label: string; value: string; extra: string };
    expenseDistribution: { label: string; value: string; extra: string };
  };
}

export interface CustomReportConfig {
  module: 'fleet' | 'trips' | 'drivers' | 'maintenance' | 'fuel' | 'expenses';
  columns: string[];
  filters: Record<string, string>;
  dateRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface CustomReport extends BaseEntity {
  name: string;
  config: CustomReportConfig;
  queryResults: Record<string, any>[];
}

export interface SavedReport {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  createdBy: string;
  pinned: boolean;
  favorite: boolean;
}

export interface RecentReport {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}
