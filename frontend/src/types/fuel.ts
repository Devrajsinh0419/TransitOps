import { BaseEntity } from './common';

export interface FuelLog extends BaseEntity {
  fuelLogId: string; // e.g. FUL-2026-0001
  vehicleId: string;
  vehicleRegistration: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  tripId?: string;
  tripNumber?: string;
  fuelType: string;
  quantity: number; // in liters
  pricePerLiter: number;
  totalCost: number; // quantity * pricePerLiter
  odometer: number;
  fuelStation: string;
  invoiceNumber: string;
  receiptImage?: string;
  date: string;
}

export interface FuelSummary {
  totalCost: number;
  totalLiters: number;
  averageMileage: number; // miles per liter
  averageFuelCost: number; // average fuel cost per fill
}

export interface FuelFilters {
  search?: string;
  vehicleId?: string;
  fuelType?: string;
  dateRange?: string;
  page: number;
  limit: number;
}
