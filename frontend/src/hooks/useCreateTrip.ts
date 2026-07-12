'use client';

import { useState } from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from './useTrips';
import { toast } from 'sonner';

export function useCreateTrip() {
  const { addLocalTrip, totalCount } = useTrips();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const createTrip = async (data: any): Promise<Trip | null> => {
    setIsLoading(true);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        const nextNum = String(totalCount + 1).padStart(4, '0');
        const tripNumber = `TRP-2026-${nextNum}`;

        const newTrip: Trip = {
          id: `trp-${Date.now()}`,
          tripNumber,
          tripName: data.tripName,
          tripType: data.tripType,
          priority: data.priority,
          description: data.description,
          status: 'draft',
          route: {
            source: data.source,
            destination: data.destination,
            plannedDistance: Number(data.plannedDistance),
            estimatedTime: data.estimatedTime,
          },
          vehicleId: data.vehicleId,
          vehicleName: data.vehicleName || 'Volvo FH16',
          vehicleRegistration: data.vehicleRegistration || 'TRK-999-X',
          vehicleCapacity: Number(data.vehicleCapacity),
          vehicleOdometer: Number(data.vehicleOdometer || 0),
          driverId: data.driverId,
          driverName: data.driverName || 'Marcus Miller',
          driverPhone: data.driverPhone || '+15550001111',
          driverLicenseExpiry: data.driverLicenseExpiry || '2028-12-31',
          driverSafetyScore: Number(data.driverSafetyScore || 100),
          cargo: {
            type: data.cargoType,
            weight: Number(data.cargoWeight),
            value: Number(data.cargoValue),
            specialInstructions: data.specialInstructions,
          },
          expectedRevenue: Number(data.expectedRevenue || 0),
          estimatedFuelCost: Number(data.estimatedFuelCost || 0),
          estimatedToll: Number(data.estimatedToll || 0),
          estimatedExpenses: Number(data.estimatedExpenses || 0),
          expenses: [],
          timeline: [
            {
              id: `tl-${Date.now()}-1`,
              type: 'created',
              description: 'Trip manifest registered in Draft',
              user: 'System Admin',
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            },
            {
              id: `tl-${Date.now()}-2`,
              type: 'vehicle_assigned',
              description: `Vehicle assigned: ${data.vehicleRegistration || 'TRK-999-X'}`,
              user: 'System Admin',
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            },
            {
              id: `tl-${Date.now()}-3`,
              type: 'driver_assigned',
              description: `Driver assigned: ${data.driverName || 'Marcus Miller'}`,
              user: 'System Admin',
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
            },
          ],
          createdBy: 'System Admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        addLocalTrip(newTrip);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success('Trip registered successfully in Draft status!');
        resolve(newTrip);
      }, 700);
    });
  };

  return {
    createTrip,
    isLoading,
    isSuccess,
  };
}

export default useCreateTrip;
