'use client';

import { useState } from 'react';
import { FuelLog } from '@/types/fuel';
import { activeFuelLogs } from './useFuelLogs';
import { activeVehicles } from './useVehicles';
import { FuelSchemaInput } from '@/validation/fuel.schema';
import { toast } from 'sonner';

export function useCreateFuelLog() {
  const [isLoading, setIsLoading] = useState(false);

  const createFuelLog = async (data: FuelSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextIdNumber = activeFuelLogs.length + 1;
        const fuelLogId = `FUL-2026-${String(nextIdNumber).padStart(4, '0')}`;
        const id = `ful-${Date.now()}`;

        // Get details of related assets
        const vehicle = activeVehicles.find((v) => v.id === data.vehicleId);
        
        const newLog: FuelLog = {
          id,
          fuelLogId,
          ...data,
          vehicleRegistration: vehicle?.registrationNumber || 'TRK-UNKNOWN',
          vehicleName: vehicle?.name || 'Assigned Fleet Vehicle',
          driverName: 'Roster Driver', // default placeholder
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        activeFuelLogs.unshift(newLog);

        // Lifecycle: Update vehicle odometer in database if it is higher
        if (vehicle && data.odometer > vehicle.currentOdometer) {
          const vIdx = activeVehicles.findIndex((v) => v.id === vehicle.id);
          if (vIdx !== -1) {
            activeVehicles[vIdx].currentOdometer = data.odometer;
          }
        }

        toast.success(`Fuel log ${fuelLogId} created successfully`);
        setIsLoading(false);
        resolve(true);
      }, 500);
    });
  };

  return {
    createFuelLog,
    isLoading,
  };
}

export default useCreateFuelLog;
