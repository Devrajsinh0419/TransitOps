'use client';

import { useState } from 'react';
import { MaintenanceRecord } from '@/types/maintenance';
import { activeMaintenance } from './useMaintenance';
import { MaintenanceSchemaInput } from '@/validation/maintenance.schema';
import { toast } from 'sonner';

import { activeVehicles } from './useVehicles';

export function useCreateMaintenance() {
  const [isLoading, setIsLoading] = useState(false);

  const createMaintenance = async (data: MaintenanceSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextIdNumber = activeMaintenance.length + 1;
        const maintenanceId = `MNT-2026-${String(nextIdNumber).padStart(4, '0')}`;
        const id = `mnt-${Date.now()}`;
        
        const nowStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Calculate total cost
        const totalCost = data.labourCost + data.partsCost + data.tax;

        const vehicle = activeVehicles.find((v) => v.id === data.vehicleId);

        const newRecord: MaintenanceRecord = {
          id,
          maintenanceId,
          ...data,
          vehicleRegistration: vehicle?.registrationNumber || data.vehicleRegistration || 'TRK-UNKNOWN',
          vehicleName: vehicle?.name || 'Assigned Fleet Vehicle',
          vehicleStatus: vehicle?.status || 'active',
          status: 'pending',
          totalCost: totalCost || data.estimatedCost, // fallback if totalCost is 0
          timeline: [
            {
              id: `tl-m-${Date.now()}`,
              type: 'created',
              description: `Maintenance request created: ${data.issueTitle}`,
              user: 'System Admin',
              date: nowStr,
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        activeMaintenance.unshift(newRecord);
        toast.success(`Maintenance order ${maintenanceId} registered in PENDING status`);
        setIsLoading(false);
        resolve(true);
      }, 500);
    });
  };

  return {
    createMaintenance,
    isLoading,
  };
}

export default useCreateMaintenance;
