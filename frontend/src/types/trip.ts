import { BaseEntity } from './common';

export type TripStatus = 'scheduled' | 'in_transit' | 'completed' | 'cancelled' | 'delayed';

export interface Trip extends BaseEntity {
  tripNumber: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  departureTime: string;
  estimatedArrivalTime: string;
  actualArrivalTime?: string;
  status: TripStatus;
  distanceKm?: number;
  notes?: string;
}
