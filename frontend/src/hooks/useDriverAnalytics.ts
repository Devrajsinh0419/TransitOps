'use client';

import { useState, useEffect } from 'react';
import { DriverAnalyticsReport, ReportFilters } from '@/types/reports';

export function useDriverAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<DriverAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        driverPerformance: [
          { name: 'Marcus Miller', value: 98 },
          { name: 'Sarah Connor', value: 96 },
          { name: 'David Richardson', value: 94 },
          { name: 'Amanda Sterling', value: 91 },
          { name: 'Robert Vance', value: 84 },
        ],
        tripsCompleted: [
          { name: 'Marcus Miller', value: 24 },
          { name: 'David Richardson', value: 18 },
          { name: 'Amanda Sterling', value: 14 },
          { name: 'Sarah Connor', value: 12 },
        ],
        safetyScore: [
          { name: '95-100 (Excellent)', value: 3 },
          { name: '90-94 (Good)', value: 2 },
          { name: '80-89 (Average)', value: 1 },
          { name: 'Under 80 (Alert)', value: 0 },
        ],
        licenseStatus: [
          { name: 'Active & Valid', value: 4 },
          { name: 'Expiring Soon', value: 1 },
          { name: 'Expired/Suspended', value: 1 },
        ],
        distanceDriven: [
          { name: 'Marcus Miller', value: 6800 },
          { name: 'David Richardson', value: 4200 },
          { name: 'Amanda Sterling', value: 3900 },
          { name: 'Sarah Connor', value: 2900 },
        ],
        cards: {
          topDriver: { label: 'TOP RATED DRIVER', value: 'Marcus Miller', extra: '98 safety rating score' },
          lowestSafetyScore: { label: 'LOWEST SAFETY SCORE', value: 'Robert Vance', extra: '84 safety rating (Suspended)' },
          driversOnDuty: { label: 'DRIVERS ACTIVE ON TRIP', value: '2 Drivers', extra: 'On-road dispatch routing' },
          driversOffDuty: { label: 'DRIVERS STANDBY/OFF DUTY', value: '4 Drivers', extra: 'Available or on weekend leave' },
          licenseExpiringSoon: { label: 'LICENSE RENEWAL CHECKS', value: '1 Active Alert', extra: 'Amanda Sterling expires soon' },
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

export default useDriverAnalytics;
