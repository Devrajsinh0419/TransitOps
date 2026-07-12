'use client';

import { useState } from 'react';
import { useTrips } from './useTrips';
import { toast } from 'sonner';

export interface CancellationData {
  cancellationReason: string;
  cancellationNotes?: string;
}

export function useCancelTrip() {
  const { updateLocalTrip } = useTrips();
  const [isLoading, setIsLoading] = useState(false);

  const cancelTrip = async (id: string, data: CancellationData): Promise<boolean> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        updateLocalTrip(id, {
          status: 'cancelled',
          cancellationReason: data.cancellationReason,
          cancellationNotes: data.cancellationNotes,
          updatedAt: new Date().toISOString(),
        });

        // Add timeline event
        const tripsModule = require('./useTrips');
        const found = tripsModule.activeTrips.find((t: any) => t.id === id);
        if (found) {
          found.timeline.push({
            id: `tl-${Date.now()}`,
            type: 'cancelled',
            description: `Trip Cancelled. Reason: ${data.cancellationReason}`,
            user: 'Compliance Lead',
            date: timestamp,
          });
        }

        setIsLoading(false);
        toast.warning('Trip manifest has been cancelled.');
        resolve(true);
      }, 800);
    });
  };

  return {
    cancelTrip,
    isLoading,
  };
}

export default useCancelTrip;
