import { BaseEntity } from './common';

export type VehicleStatus = 'active' | 'in_service' | 'maintenance' | 'out_of_service';
export type FuelType = 'diesel' | 'petrol' | 'electric' | 'hybrid' | 'cng';

export interface Vehicle extends BaseEntity {
  plateNumber: string;
  make: string;
  model: string;
  year: number;
  type: string; // E.g., 'Truck', 'Van', 'Sedan'
  status: VehicleStatus;
  fuelType: FuelType;
  fuelCapacity: number; // in Liters
  currentOdometer: number; // in km
  vin: string;
  insuranceExpiry: string;
  lastServiceDate?: string;
}
