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
      const respData = err.response?.data;
      let msg = 'Failed to create fuel log';
      if (respData) {
        if (respData.detail) {
          msg = respData.detail;
        } else if (typeof respData === 'object') {
          // Extract the first validation error message
          const errors = Object.values(respData).flat();
          if (errors.length > 0 && typeof errors[0] === 'string') {
            msg = errors[0];
          }
        }
      }
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
