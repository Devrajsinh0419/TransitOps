'use client';

import { useState, useEffect } from 'react';
import { TripAnalyticsReport, ReportFilters } from '@/types/reports';

export function useTripAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<TripAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        tripsPerMonth: [
          { name: 'Jan', value: 110 },
          { name: 'Feb', value: 125 },
          { name: 'Mar', value: 130 },
          { name: 'Apr', value: 142 },
          { name: 'May', value: 148 },
          { name: 'Jun', value: 154 },
        ],
        tripsByRoute: [
          { name: 'Houston - Dallas', value: 45 },
          { name: 'Chicago - Detroit', value: 38 },
          { name: 'Austin - Houston', value: 29 },
          { name: 'Dallas - Austin', value: 22 },
          { name: 'Orlando - Miami', value: 18 },
        ],
        tripsByDriver: [
          { name: 'Marcus Miller', value: 24 },
          { name: 'David Richardson', value: 18 },
          { name: 'Amanda Sterling', value: 14 },
          { name: 'Sarah Connor', value: 12 },
        ],
        tripsByVehicle: [
          { name: 'TRK-491-A', value: 32 },
          { name: 'VAN-102-X', value: 26 },
          { name: 'TRK-108-B', value: 20 },
        ],
        distanceCovered: [
          { name: 'Jan', value: 12400 },
          { name: 'Feb', value: 13800 },
          { name: 'Mar', value: 14200 },
          { name: 'Apr', value: 15600 },
          { name: 'May', value: 16100 },
          { name: 'Jun', value: 17200 },
        ],
        revenueTrend: [
          { name: 'Jan', value: 18000 },
          { name: 'Feb', value: 20000 },
          { name: 'Mar', value: 21500 },
          { name: 'Apr', value: 22000 },
          { name: 'May', value: 23500 },
          { name: 'Jun', value: 24800 },
        ],
        cards: {
          longestTrip: { label: 'LONGEST TRIP DISTANCE', value: '850 km', extra: 'Chicago Hub to NYC Depot' },
          highestRevenueTrip: { label: 'HIGHEST REVENUE TRIP', value: '₹4,250', extra: 'Heavy Logistics load #991' },
          cancelledTrips: { label: 'CANCELLED TRIP RATIO', value: '2.4%', extra: '4 trips cancelled' },
          completedTrips: { label: 'COMPLETED TRIP RATE', value: '97.6%', extra: '154 completed manifest orders' },
          averageDistance: { label: 'AVERAGE TRIP DISTANCE', value: '280 km', extra: 'Standard routing average' },
          averageDuration: { label: 'AVERAGE TRIP DURATION', value: '5.5 Hours', extra: 'Excludes highway layovers' },
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

export default useTripAnalytics;
