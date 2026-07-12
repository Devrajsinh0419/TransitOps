import { BaseEntity } from './common';

export type VehicleStatus = 'available' | 'on_trip' | 'maintenance' | 'retired' | 'inactive' | 'disposed';

export type VehicleType = 'heavy_truck' | 'delivery_van' | 'trailer' | 'refrigerated' | 'sedan' | 'suv';

export interface Vehicle extends BaseEntity {
  name: string;
  registrationNumber: string;
  type: VehicleType;
  manufacturer: string;
  model: string;
  year: number;
  vinNumber: string;
  capacity: number; // in lbs or tons
  fuelType: 'diesel' | 'petrol' | 'electric' | 'hybrid' | 'cng';
  transmission: 'automatic' | 'manual';
  color: string;
  purchaseDate: string;
  purchaseCost: number;
  insuranceExpiry: string;
  registrationExpiry: string;
  currentOdometer: number;
  status: VehicleStatus;
  garageLocation: string;
  photoUrl?: string;
  insuranceDocUrl?: string;
  registrationDocUrl?: string;
  lastMaintenanceDate?: string;
  createdDate: string;
  archived: boolean;
}

export interface VehicleFilters {
  search: string;
  type: string;
  status: string;
  capacity: string;
  purchaseDateStart?: string;
  purchaseDateEnd?: string;
  sortBy: 'newest' | 'oldest' | 'name' | 'registrationNumber';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface VehicleForm {
  name: string;
  registrationNumber: string;
  type: VehicleType;
  manufacturer: string;
  model: string;
  year: number;
  vinNumber: string;
  capacity: number;
  fuelType: 'diesel' | 'petrol' | 'electric' | 'hybrid' | 'cng';
  transmission: 'automatic' | 'manual';
  color: string;
  purchaseDate: string;
  purchaseCost: number;
  insuranceExpiry: string;
  registrationExpiry: string;
  currentOdometer: number;
  status: VehicleStatus;
  garageLocation: string;
}

export interface VehicleDetails extends Vehicle {
  tripsCount: number;
  maintenanceCount: number;
  totalExpenses: number;
  fuelEfficiency: number; // mpg or km/L
}
