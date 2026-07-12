'use client';

import { useState } from 'react';
import { Vehicle } from '@/types/vehicle';
import { useVehicles } from './useVehicles';
import { toast } from 'sonner';

export function useUpdateVehicle() {
  const { updateLocalVehicle } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateVehicle = async (id: string, data: any): Promise<Vehicle | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        updateLocalVehicle(id, data);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success('Vehicle updated successfully!');
        resolve({ id, ...data } as Vehicle);
      }, 800);
    });
  };

  return {
    updateVehicle,
    isLoading,
    error,
    isSuccess,
  };
}

export default useUpdateVehicle;
