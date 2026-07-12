'use client';

import { useState, useEffect } from 'react';
import { FuelLog } from '@/types/fuel';
import { activeFuelLogs } from './useFuelLogs';

export function useFuelLog(id: string) {
  const [log, setLog] = useState<FuelLog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const found = activeFuelLogs.find((l) => l.id === id || l.fuelLogId === id);
      if (found) {
        setLog({ ...found });
      } else {
        setError('Fuel log not found');
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  return {
    log,
    isLoading,
    error,
  };
}

export default useFuelLog;
