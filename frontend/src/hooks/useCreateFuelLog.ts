'use client';

import { useState } from 'react';
import { FuelSchemaInput } from '@/validation/fuel.schema';
import { fuelService } from '@/services/fuel.service';
import { toast } from 'sonner';

export function useCreateFuelLog() {
  const [isLoading, setIsLoading] = useState(false);

  const createFuelLog = async (data: FuelSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    try {
      await fuelService.createFuelLog(data);
      toast.success('Fuel log created successfully');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to create fuel log';
      toast.error('Failed to save fuel log', { description: msg });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createFuelLog,
    isLoading,
  };
}

export default useCreateFuelLog;
