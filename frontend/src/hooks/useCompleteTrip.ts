'use client';

import { useState } from 'react';
import { useTrips } from './useTrips';
import { toast } from 'sonner';

export interface CompletionData {
  finalOdometer: number;
  actualDistance: number;
  fuelConsumed: number;
  actualRevenue: number;
  notes?: string;
}

export function useCompleteTrip() {
  const { updateLocalTrip } = useTrips();
  const [isLoading, setIsLoading] = useState(false);

  const completeTrip = async (id: string, data: CompletionData): Promise<boolean> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        updateLocalTrip(id, {
          status: 'completed',
          finalOdometer: data.finalOdometer,
          actualDistance: data.actualDistance,
          fuelConsumed: data.fuelConsumed,
          actualRevenue: data.actualRevenue,
          completionTime: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Add timeline event
        const tripsModule = require('./useTrips');
        const found = tripsModule.activeTrips.find((t: any) => t.id === id);
        if (found) {
          found.timeline.push({
            id: `tl-${Date.now()}`,
            type: 'completed',
            description: `Trip completed. Final Odometer: ${data.finalOdometer} mi.`,
            user: 'Receiver Agent',
            date: timestamp,
          });
          if (data.notes) {
            found.notes = data.notes;
          }
        }

        setIsLoading(false);
        toast.success('Trip manifest completed!');
        resolve(true);
      }, 800);
    });
  };

  return {
    completeTrip,
    isLoading,
  };
}

export default useCompleteTrip;
