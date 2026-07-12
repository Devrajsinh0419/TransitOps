'use client';

import { useState } from 'react';
import { Driver } from '@/types/driver';
import { useDrivers } from './useDrivers';
import { toast } from 'sonner';

export function useUpdateDriver() {
  const { updateLocalDriver } = useDrivers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateDriver = async (id: string, data: any): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        updateLocalDriver(id, data);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success('Driver information updated successfully');
        resolve(true);
      }, 700);
    });
  };

  return {
    updateDriver,
    isLoading,
    error,
    isSuccess,
  };
}

export default useUpdateDriver;
