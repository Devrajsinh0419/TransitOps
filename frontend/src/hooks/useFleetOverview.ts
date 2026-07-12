'use client';

import { useState, useEffect } from 'react';
import { FleetSummary } from '@/types/dashboard';

const mockOverview: FleetSummary = {
  averageFuelCost: 4520,
  averageTripDistance: 245,
  maintenanceCost: 12400,
  vehicleRoi: 14.8,
};

export function useFleetOverview() {
  const [overview, setOverview] = useState<FleetSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverview(mockOverview);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return {
    overview,
    isLoading,
    error,
  };
}

export default useFleetOverview;
