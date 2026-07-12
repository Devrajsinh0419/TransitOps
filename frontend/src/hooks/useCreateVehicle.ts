'use client';

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { useVehicles } from './useVehicles';
import { toast } from 'sonner';

export function useCreateVehicle() {
  const { addLocalVehicle } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createVehicle = async (data: any): Promise<Vehicle | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newVehicle: Vehicle = {
          id: `veh-${Date.now()}`,
          name: data.name,
          registrationNumber: data.registrationNumber,
          type: data.type,
          manufacturer: data.manufacturer,
          model: data.model,
          year: data.year,
          vinNumber: data.vinNumber,
          capacity: data.capacity,
          fuelType: data.fuelType,
          transmission: data.transmission,
          color: data.color,
          purchaseDate: data.purchaseDate,
          purchaseCost: data.purchaseCost,
          insuranceExpiry: data.insuranceExpiry,
          registrationExpiry: data.registrationExpiry,
          currentOdometer: data.currentOdometer || 0,
          status: data.status || 'available',
          garageLocation: data.garageLocation,
          createdDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          archived: false,
        };

        addLocalVehicle(newVehicle);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success('Vehicle registered successfully!');
        resolve(newVehicle);
      }, 800);
    });
  };

  return {
    createVehicle,
    isLoading,
    error,
    isSuccess,
  };
}

export default useCreateVehicle;
