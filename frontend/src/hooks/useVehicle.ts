'use client';

import { useState, useEffect } from 'react';
import { VehicleDetails } from '@/types/vehicle';
import { useVehicles } from './useVehicles';

export function useVehicle(id: string) {
  const { vehicles } = useVehicles();
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      // Find in local memory
      const found = vehicles.find((v) => v.id === id);
      if (found) {
        setVehicle({
          ...found,
          tripsCount: id === 'veh-1' ? 42 : id === 'veh-2' ? 18 : 5,
          maintenanceCount: id === 'veh-3' ? 8 : 2,
          totalExpenses: id === 'veh-1' ? 8400 : 1200,
          fuelEfficiency: id === 'veh-2' ? 16.5 : 8.2,
        });
      } else {
        setError('Vehicle not found');
      }
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id, vehicles]);

  return {
    vehicle,
    isLoading,
    error,
  };
}

export default useVehicle;
