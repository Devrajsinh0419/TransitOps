'use client';

import { useState, useEffect } from 'react';
import { DashboardStats } from '@/types/dashboard';

const mockStats: DashboardStats = {
  totalVehicles: 142,
  availableVehicles: 88,
  vehiclesOnTrip: 42,
  vehiclesInMaintenance: 12,
  totalDrivers: 156,
  driversOnDuty: 94,
  activeTrips: 38,
  fleetUtilization: 82.5,
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 600); // Small loading animation simulation
    return () => clearTimeout(timer);
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
}

export default useDashboardStats;
