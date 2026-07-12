'use client';

import { useState, useEffect } from 'react';
import { Trip } from '@/types/trip';
import { useTrips } from './useTrips';

export function useTrip(id: string) {
  const { trips, updateLocalTrip } = useTrips();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const found = trips.find((t) => t.id === id);
      if (found) {
        setTrip(found);
      } else {
        setError('Trip manifest not found');
      }
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id, trips]);

  const updateTripState = async (updates: Partial<Trip>) => {
    updateLocalTrip(id, updates);
  };

  return {
    trip,
    isLoading,
    error,
    updateTripState,
  };
}

export default useTrip;
