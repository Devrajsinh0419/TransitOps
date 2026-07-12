'use client';

import { useState, useEffect } from 'react';
import { FuelAnalyticsReport, ReportFilters } from '@/types/reports';

export function useFuelAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<FuelAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        fuelCostTrend: [
          { name: 'Jan', value: 800 },
          { name: 'Feb', value: 750 },
          { name: 'Mar', value: 720 },
          { name: 'Apr', value: 710 },
          { name: 'May', value: 690 },
          { name: 'Jun', value: 674.1 },
        ],
        fuelConsumption: [
          { name: 'Jan', value: 510 },
          { name: 'Feb', value: 480 },
          { name: 'Mar', value: 460 },
          { name: 'Apr', value: 450 },
          { name: 'May', value: 440 },
          { name: 'Jun', value: 435 },
        ],
        mileageTrend: [
          { name: 'Jan', value: 11.2 },
          { name: 'Feb', value: 11.3 },
          { name: 'Mar', value: 11.5 },
          { name: 'Apr', value: 11.4 },
          { name: 'May', value: 11.6 },
          { name: 'Jun', value: 11.8 },
        ],
        fuelEfficiency: [
          { name: 'Volvo FH16', value: 8.2 },
          { name: 'Ford Transit', value: 14.8 },
          { name: 'Scania R500', value: 7.9 },
        ],
        fuelByVehicle: [
          { name: 'TRK-491-A', value: 186 },
          { name: 'VAN-102-X', value: 74 },
          { name: 'TRK-108-B', value: 314 },
        ],
        cards: {
          highestFuelCost: { label: 'HIGHEST REFUEL TRANSACTION', value: '$314.00', extra: 'TRK-108-B at Highway 10 Shell' },
          averageMileage: { label: 'AVERAGE FLEET MILEAGE', value: '11.8 mi/L', extra: 'Overall fuel consumption ratio' },
          mostEfficientVehicle: { label: 'MOST EFFICIENT VEHICLE', value: 'VAN-102-X', extra: '14.8 miles per liter' },
          leastEfficientVehicle: { label: 'LEAST EFFICIENT VEHICLE', value: 'TRK-108-B', extra: '7.2 miles per liter' },
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

export default useFuelAnalytics;
