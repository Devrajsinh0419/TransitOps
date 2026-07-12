'use client';

import { useState, useEffect } from 'react';
import { ExecutiveKPIs, ReportFilters } from '@/types/reports';

export function useExecutiveKPIs(filters?: ReportFilters) {
  const [kpis, setKpis] = useState<ExecutiveKPIs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setKpis({
        totalFleet: {
          title: 'TOTAL FLEET SIZE',
          value: 12,
          trend: 2.1,
          comparison: 'vs last month',
          iconName: 'truck',
          sparkline: [10, 10, 11, 11, 12, 12, 12],
        },
        fleetUtilization: {
          title: 'FLEET UTILIZATION',
          value: '84.2%',
          trend: 4.8,
          comparison: 'vs last week',
          iconName: 'activity',
          sparkline: [78, 80, 81, 79, 83, 82, 84.2],
        },
        tripsCompleted: {
          title: 'TRIPS COMPLETED',
          value: 154,
          trend: 12.3,
          comparison: 'vs last month',
          iconName: 'navigation',
          sparkline: [120, 130, 135, 142, 148, 150, 154],
        },
        tripsActive: {
          title: 'ACTIVE TRIPS',
          value: 4,
          trend: -10,
          comparison: 'vs yesterday',
          iconName: 'compass',
          sparkline: [6, 5, 5, 4, 3, 5, 4],
        },
        maintenanceCost: {
          title: 'MAINTENANCE COSTS',
          value: '$1,750',
          trend: 8.5,
          comparison: 'vs last month',
          iconName: 'wrench',
          sparkline: [1200, 1400, 1350, 1500, 1600, 1650, 1750],
        },
        fuelCost: {
          title: 'FUEL EXPENDITURES',
          value: '$674.10',
          trend: -3.2,
          comparison: 'vs last month',
          iconName: 'fuel',
          sparkline: [800, 750, 720, 710, 690, 680, 674.1],
        },
        operationalCost: {
          title: 'TOTAL OPERATIONAL COST',
          value: '$1,976',
          trend: 4.2,
          comparison: 'vs last month',
          iconName: 'dollar-sign',
          sparkline: [1800, 1850, 1820, 1900, 1920, 1950, 1976],
        },
        averageFuelEfficiency: {
          title: 'FUEL EFFICIENCY',
          value: '11.8 mi/L',
          trend: 3.1,
          comparison: 'vs last week',
          iconName: 'zap',
          sparkline: [11.2, 11.3, 11.5, 11.4, 11.6, 11.7, 11.8],
        },
        driverPerformance: {
          title: 'DRIVER SAFETY SCORE',
          value: '94.3/100',
          trend: 1.5,
          comparison: 'vs last month',
          iconName: 'users',
          sparkline: [92, 92.5, 93, 93.4, 93.8, 94.1, 94.3],
        },
        revenue: {
          title: 'GROSS REVENUE',
          value: '$24,800',
          trend: 14.2,
          comparison: 'vs last month',
          iconName: 'trending-up',
          sparkline: [18000, 20000, 21500, 22000, 23500, 24000, 24800],
        },
        profit: {
          title: 'NET PROFIT',
          value: '$22,824',
          trend: 15.1,
          comparison: 'vs last month',
          iconName: 'award',
          sparkline: [16200, 18150, 19680, 20100, 21580, 22050, 22824],
        },
        vehicleAvailability: {
          title: 'VEHICLE AVAILABILITY',
          value: '91.6%',
          trend: 1.2,
          comparison: 'vs last week',
          iconName: 'check-circle',
          sparkline: [89, 90, 90.5, 91, 91.2, 91.5, 91.6],
        },
      });
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    kpis,
    isLoading,
    error,
  };
}

export default useExecutiveKPIs;
