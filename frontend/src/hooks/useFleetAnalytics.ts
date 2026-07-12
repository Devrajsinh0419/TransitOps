'use client';

import { useState, useEffect } from 'react';
import { FleetAnalyticsReport, ReportFilters } from '@/types/reports';

export function useFleetAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<FleetAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        vehicleStatusDistribution: [
          { name: 'Available', value: 5 },
          { name: 'On Trip', value: 4 },
          { name: 'In Maintenance', value: 2 },
          { name: 'Inactive', value: 1 },
        ],
        fleetUtilizationTrend: [
          { name: 'Jan', value: 72 },
          { name: 'Feb', value: 75 },
          { name: 'Mar', value: 78 },
          { name: 'Apr', value: 80 },
          { name: 'May', value: 82 },
          { name: 'Jun', value: 84 },
        ],
        vehicleUsageByType: [
          { name: 'Heavy Truck', value: 420 },
          { name: 'Delivery Van', value: 280 },
          { name: 'Trailer', value: 150 },
          { name: 'Refrigerated', value: 310 },
        ],
        vehicleAvailability: [
          { name: 'Ready', value: 92 },
          { name: 'Down', value: 8 },
        ],
        vehicleLifecycle: [
          { name: '2020', value: 1 },
          { name: '2021', value: 1 },
          { name: '2022', value: 1 },
          { name: '2023', value: 2 },
          { name: '2024', value: 1 },
        ],
        vehicleROIPositioning: [
          { name: 'Volvo FH16', value: 88, cost: 350 },
          { name: 'Scania R500', value: 76, cost: 1250 },
          { name: 'Ford Transit', value: 92, cost: 74 },
        ],
        cards: {
          mostUsedVehicle: { label: 'MOST ACTIVE VEHICLE', value: 'VAN-102-X', extra: '92% utilization rate' },
          leastUsedVehicle: { label: 'LEAST ACTIVE VEHICLE', value: 'TRL-809-Y', extra: '38% active runtime' },
          highestCostVehicle: { label: 'HIGHEST MAINTENANCE COST', value: 'TRK-108-B', extra: '$1,250 total bills' },
          newestVehicle: { label: 'NEWEST FLEET ASSET', value: 'Volvo FH16', extra: 'Year 2024' },
          oldestVehicle: { label: 'OLDEST FLEET ASSET', value: 'Freightliner', extra: 'Year 2020' },
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

export default useFleetAnalytics;
