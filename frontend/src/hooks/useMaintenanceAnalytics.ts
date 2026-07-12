'use client';

import { useState, useEffect } from 'react';
import { MaintenanceAnalyticsReport, ReportFilters } from '@/types/reports';

export function useMaintenanceAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<MaintenanceAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        maintenanceCost: [
          { name: 'Preventative', value: 450 },
          { name: 'Emergency Repair', value: 1200 },
          { name: 'Odometer Service', value: 100 },
        ],
        maintenanceFrequency: [
          { name: 'Jan', value: 2 },
          { name: 'Feb', value: 1 },
          { name: 'Mar', value: 3 },
          { name: 'Apr', value: 1 },
          { name: 'May', value: 2 },
          { name: 'Jun', value: 1 },
        ],
        vehiclesInShop: [
          { name: 'TRK-108-B', value: 4 },
          { name: 'VAN-102-X', value: 1 },
        ],
        maintenanceTrend: [
          { name: 'Jan', value: 1200 },
          { name: 'Feb', value: 1400 },
          { name: 'Mar', value: 1350 },
          { name: 'Apr', value: 1500 },
          { name: 'May', value: 1600 },
          { name: 'Jun', value: 1750 },
        ],
        downtimeAnalysis: [
          { name: 'Engine Repair', value: 48 },
          { name: 'Brake Check', value: 12 },
          { name: 'Routine Oil', value: 3 },
        ],
        cards: {
          highestMaintenanceVehicle: { label: 'HIGHEST SHOP BILLS', value: 'TRK-108-B', extra: '$1,250 total costs' },
          openRequests: { label: 'OPEN MAINTENANCE WORKORDERS', value: '2 Pending Tickets', extra: 'Scheduled for this week' },
          completedServices: { label: 'RESOLVED SERVICES (Q2)', value: '6 Tickets Cleared', extra: '94% timely checkout rate' },
          upcomingServices: { label: 'UPCOMING SCHEDULED SERVICES', value: '4 Reminders', extra: 'Routine preventative mileage checks' },
        },
      });
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useMaintenanceAnalytics;
