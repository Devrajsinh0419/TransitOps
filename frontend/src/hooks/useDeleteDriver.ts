'use client';

import { useState } from 'react';
import { useDrivers } from './useDrivers';

export function useDeleteDriver() {
  const { deleteLocalDriver } = useDrivers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDriver = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    return new Promise((resolve) => {
      setTimeout(() => {
        deleteLocalDriver(id);
        setIsLoading(false);
        resolve(true);
      }, 600);
    });
  };

  return {
    deleteDriver,
    isLoading,
    error,
  };
}

export default useDeleteDriver;
