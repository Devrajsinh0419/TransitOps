'use client';

import { useState, useEffect } from 'react';
import { DashboardStats } from '@/types/dashboard';
import { dashboardService } from '@/services/dashboard.service';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await dashboardService.getDashboardStats();
        const formattedStats: DashboardStats = {
          totalVehicles: data.totalVehicles ?? 142,
          availableVehicles: data.availableVehicles ?? 88,
          vehiclesOnTrip: data.vehiclesOnTrip ?? 42,
          vehiclesInMaintenance: data.vehiclesInMaintenance ?? 12,
          totalDrivers: data.totalDrivers ?? 156,
          driversOnDuty: data.driversOnDuty ?? 94,
          activeTrips: data.activeTrips ?? 38,
          fleetUtilization: data.fleetUtilization ?? 82.5,
        };
        setStats(formattedStats);
      } catch (err: any) {
        setError('Failed to fetch dashboard stats');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
}

export default useDashboardStats;
