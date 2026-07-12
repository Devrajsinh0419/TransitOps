import { BaseEntity } from './common';

export interface FuelLog extends BaseEntity {
  vehicleId: string;
  driverId: string;
  date: string;
  odometer: number;
  gallonsOrLiters: number;
  costPerUnit: number;
  totalCost: number;
  fuelStation?: string;
  receiptImage?: string;
}
