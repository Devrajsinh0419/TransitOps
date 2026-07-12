'use client';

import { useState } from 'react';
import { useTrips } from './useTrips';
import { toast } from 'sonner';

export function useDispatchTrip() {
  const { updateLocalTrip } = useTrips();
  const [isLoading, setIsLoading] = useState(false);

  const dispatchTrip = async (id: string): Promise<boolean> => {
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
        
        updateLocalTrip(id, {
          status: 'dispatched',
          dispatchTime: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        // Add timeline event
        // (For simulation, we fetch the trip from activeTrips and add the timeline event directly)
        const tripsModule = require('./useTrips');
        const found = tripsModule.activeTrips.find((t: any) => t.id === id);
        if (found) {
          found.timeline.push({
            id: `tl-${Date.now()}`,
            type: 'dispatched',
            description: 'Trip dispatched. GPS positioning active.',
            user: 'Dispatch Coordinator',
            date: timestamp,
          });
        }

        setIsLoading(false);
        toast.success('Trip dispatched successfully!');
        resolve(true);
      }, 800);
    });
  };

  return {
    dispatchTrip,
    isLoading,
  };
}

export default useDispatchTrip;
