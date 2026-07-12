'use client';

import { useState } from 'react';
import { useVehicles } from './useVehicles';

export function useDeleteVehicle() {
  const { deleteLocalVehicle } = useVehicles();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteVehicle = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        deleteLocalVehicle(id);
        setIsSuccess(true);
        setIsLoading(false);
        resolve(true);
      }, 700);
    });
  };

  return {
    deleteVehicle,
    isLoading,
    error,
    isSuccess,
  };
}

export default useDeleteVehicle;
