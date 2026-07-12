'use client';

import { useState, useEffect } from 'react';
import { FuelLog } from '@/types/fuel';
import { fuelService } from '@/services/fuel.service';

export function useFuelLog(id: string) {
  const [log, setLog] = useState<FuelLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchFuelLog = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fuelService.getFuelLog(id);
        setLog(data);
      } catch (err: any) {
        setError('Fuel log not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFuelLog();
  }, [id]);

  return {
    log,
    isLoading,
    error,
  };
}

export default useFuelLog;
