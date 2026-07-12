'use client';

import { useState, useEffect } from 'react';
import { MaintenanceRecord, MaintenanceStatus } from '@/types/maintenance';
import { activeMaintenance } from './useMaintenance';
import { activeVehicles } from './useVehicles';
import { toast } from 'sonner';

export function useMaintenanceDetails(id: string) {
  const [record, setRecord] = useState<MaintenanceRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    
    // Find maintenance log
    const found = activeMaintenance.find((m) => m.id === id || m.maintenanceId === id);
    if (found) {
      setRecord({ ...found });
    } else {
      setError('Maintenance record not found');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const updateStatus = async (status: MaintenanceStatus) => {
    if (!record) return false;

    // Mutate in-memory maintenance record
    const idx = activeMaintenance.findIndex((m) => m.id === record.id);
    if (idx !== -1) {
      const nowStr = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newTimelineNode = {
        id: `tl-m-${Date.now()}`,
        type: status,
        description: `Status transitioned to ${status.toUpperCase().replace('_', ' ')}`,
        user: 'Fleet Admin',
        date: nowStr,
      };

      const updatedRecord = {
        ...activeMaintenance[idx],
        status,
        timeline: [...activeMaintenance[idx].timeline, newTimelineNode],
        updatedAt: new Date().toISOString(),
      };

      activeMaintenance[idx] = updatedRecord;

      // Sync vehicle status based on business rules
      const vehicleIdx = activeVehicles.findIndex((v) => v.id === record.vehicleId);
      if (vehicleIdx !== -1) {
        if (status === 'approved' || status === 'in_progress') {
          // Vehicle status becomes "maintenance" (represented as "In Shop" in display)
          activeVehicles[vehicleIdx].status = 'maintenance';
        } else if (status === 'completed' || status === 'cancelled') {
          // Vehicle returns to "available"
          activeVehicles[vehicleIdx].status = 'available';
        }
      }

      setRecord(updatedRecord);
      toast.success(`Maintenance status updated to ${status}`);
      return true;
    }
    return false;
  };

  const approve = () => updateStatus('approved');
  const start = () => updateStatus('in_progress');
  const complete = () => updateStatus('completed');
  const cancel = () => updateStatus('cancelled');

  return {
    record,
    isLoading,
    error,
    approve,
    start,
    complete,
    cancel,
    refetch: fetchDetails,
  };
}

export default useMaintenanceDetails;
