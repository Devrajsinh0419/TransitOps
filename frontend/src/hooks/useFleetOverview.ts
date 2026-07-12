'use client';

import { useState, useEffect } from 'react';
import { FleetSummary } from '@/types/dashboard';
import { dashboardService } from '@/services/dashboard.service';

export function useFleetOverview() {
  const [overview, setOverview] = useState<FleetSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await dashboardService.getFleetOverview();
        const formattedOverview: FleetSummary = {
          averageFuelCost: data.averageFuelCost ?? 4520,
          averageTripDistance: data.averageTripDistance ?? 245,
          maintenanceCost: data.maintenanceCost ?? 12400,
          vehicleRoi: data.vehicleRoi ?? 14.8,
        };
        setOverview(formattedOverview);
      } catch (err: any) {
        setError('Failed to fetch fleet overview');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return {
    overview,
    isLoading,
    error,
  };
}

export default useFleetOverview;
