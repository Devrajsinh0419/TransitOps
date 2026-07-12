'use client';

import { useState } from 'react';
import { MaintenanceRecord } from '@/types/maintenance';
import { activeMaintenance } from './useMaintenance';
import { MaintenanceSchemaInput } from '@/validation/maintenance.schema';
import { toast } from 'sonner';

export function useUpdateMaintenance() {
  const [isLoading, setIsLoading] = useState(false);

  const updateMaintenance = async (id: string, data: MaintenanceSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = activeMaintenance.findIndex((m) => m.id === id);
        if (idx !== -1) {
          const totalCost = data.labourCost + data.partsCost + data.tax;
          
          activeMaintenance[idx] = {
            ...activeMaintenance[idx],
            ...data,
            totalCost: totalCost || data.estimatedCost,
            updatedAt: new Date().toISOString(),
          };
          toast.success('Maintenance ticket updated successfully');
          setIsLoading(false);
          resolve(true);
        } else {
          toast.error('Maintenance ticket not found');
          setIsLoading(false);
          resolve(false);
        }
      }, 500);
    });
  };

  return {
    updateMaintenance,
    isLoading,
  };
}

export default useUpdateMaintenance;
