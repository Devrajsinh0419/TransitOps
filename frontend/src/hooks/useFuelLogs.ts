'use client';

import { useState, useEffect } from 'react';
import { FuelLog, FuelFilters, FuelSummary } from '@/types/fuel';
import { fuelService } from '@/services/fuel.service';
import { toast } from 'sonner';

export function useFuelLogs() {
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [filters, setFilters] = useState<FuelFilters>({
    search: '',
    vehicleId: '',
    fuelType: '',
    dateRange: '',
    page: 1,
    limit: 10,
  });
  const [summary, setSummary] = useState<FuelSummary>({
    totalCost: 0,
    totalLiters: 0,
    averageMileage: 0,
    averageFuelCost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFuelLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fuelService.getFuelLogs(filters);
      // DRF viewset without pagination returns a plain array
      const logs: FuelLog[] = Array.isArray(response) ? response : (response as any).results ?? (response as any).data ?? [];
      setFuelLogs(logs);

      const totalCost = logs.reduce((sum, item) => sum + (Number(item.totalCost) || 0), 0);
      const totalLiters = logs.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
      const averageFuelCost = totalLiters > 0 ? parseFloat((totalCost / totalLiters).toFixed(2)) : 0;
      const averageMileage = 0; // requires odometer delta — not available per-log

      setSummary({
        totalCost: parseFloat(totalCost.toFixed(2)),
        totalLiters: parseFloat(totalLiters.toFixed(2)),
        averageMileage,
        averageFuelCost,
      });
    } catch (e: any) {
      const detail = e?.response?.data?.detail || 'Could not fetch fuel transaction logs.';
      setError(detail);
      toast.error('Sync Error', { description: detail });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelLogs();
  }, [filters]);

  return {
    fuelLogs,
    filters,
    setFilters,
    summary,
    isLoading,
    error,
    refetch: fetchFuelLogs,
  };
}

export default useFuelLogs;
