'use client';

import { useState, useEffect } from 'react';
import { Driver, DriverPerformance, DriverActivity } from '@/types/driver';
import { useDrivers } from './useDrivers';

// Realistic trip history logs for the driver profile tab
export interface DriverTripLog {
  id: string;
  tripCode: string;
  vehicleName: string;
  vehicleRegistration: string;
  distance: number;
  cargo: string;
  revenue: number;
  status: 'completed' | 'delayed' | 'cancelled';
  date: string;
}

const mockTrips: Record<string, DriverTripLog[]> = {
  'drv-1': [
    { id: 't-1', tripCode: 'TRP-1092', vehicleName: 'Volvo FH16', vehicleRegistration: 'TRK-491-A', distance: 412, cargo: 'Industrial Gears', revenue: 2450, status: 'completed', date: '2026-07-01' },
    { id: 't-2', tripCode: 'TRP-1077', vehicleName: 'Volvo FH16', vehicleRegistration: 'TRK-491-A', distance: 380, cargo: 'Steel Sheets', revenue: 1980, status: 'completed', date: '2026-06-24' },
    { id: 't-3', tripCode: 'TRP-1051', vehicleName: 'Volvo FH16', vehicleRegistration: 'TRK-491-A', distance: 512, cargo: 'Power Generators', revenue: 3100, status: 'completed', date: '2026-06-18' },
  ],
  'drv-2': [
    { id: 't-4', tripCode: 'TRP-1099', vehicleName: 'Ford Transit', vehicleRegistration: 'VAN-102-X', distance: 45, cargo: 'Medical Supplies', revenue: 320, status: 'completed', date: '2026-07-10' },
    { id: 't-5', tripCode: 'TRP-1095', vehicleName: 'Ford Transit', vehicleRegistration: 'VAN-102-X', distance: 88, cargo: 'Electronics', revenue: 490, status: 'completed', date: '2026-07-08' },
    { id: 't-6', tripCode: 'TRP-1082', vehicleName: 'Ford Transit', vehicleRegistration: 'VAN-102-X', distance: 64, cargo: 'Office Furniture', revenue: 410, status: 'completed', date: '2026-07-02' },
  ],
};

const mockPerformances: Record<string, DriverPerformance> = {
  'drv-1': { safetyScore: 98, tripsCompleted: 142, distanceDriven: 48900, fuelEfficiency: 6.8, incidentsCount: 0 },
  'drv-2': { safetyScore: 94, tripsCompleted: 284, distanceDriven: 18200, fuelEfficiency: 18.2, incidentsCount: 1 },
  'drv-3': { safetyScore: 91, tripsCompleted: 88, distanceDriven: 32400, fuelEfficiency: 7.2, incidentsCount: 1 },
  'drv-4': { safetyScore: 84, tripsCompleted: 210, distanceDriven: 84200, fuelEfficiency: 6.5, incidentsCount: 3 },
  'drv-5': { safetyScore: 96, tripsCompleted: 98, distanceDriven: 14200, fuelEfficiency: 24.1, incidentsCount: 0 },
  'drv-6': { safetyScore: 78, tripsCompleted: 154, distanceDriven: 62000, fuelEfficiency: 6.7, incidentsCount: 4 },
};

const mockActivities: Record<string, DriverActivity[]> = {
  'drv-1': [
    { id: 'act-1', type: 'trip_completed', description: 'Completed route TRP-1092 to Austin Depot', user: 'System Auto', date: '2026-07-01 16:45' },
    { id: 'act-2', type: 'trip_assigned', description: 'Assigned to route TRP-1092 with Volvo FH16', user: 'Dispatch Desk', date: '2026-07-01 08:00' },
    { id: 'act-3', type: 'profile_edited', description: 'Updated address and emergency contact', user: 'Marcus Miller', date: '2026-06-15 11:22' },
    { id: 'act-4', type: 'license_updated', description: 'Uploaded Class A CDL scan, valid till 2027', user: 'Compliance Office', date: '2026-02-10 14:15' },
    { id: 'act-5', type: 'registered', description: 'Driver registered on TransitOps platform', user: 'Admin Desk', date: '2021-03-01 08:00' },
  ],
  'drv-2': [
    { id: 'act-6', type: 'trip_completed', description: 'Completed cargo route TRP-1099', user: 'System Auto', date: '2026-07-10 12:30' },
    { id: 'act-7', type: 'trip_assigned', description: 'Assigned to delivery route TRP-1099', user: 'Dispatch Desk', date: '2026-07-10 09:00' },
    { id: 'act-8', type: 'registered', description: 'Driver registered on TransitOps platform', user: 'Admin Desk', date: '2023-05-15 09:00' },
  ],
};

export function useDriver(id: string) {
  const { drivers } = useDrivers();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [performance, setPerformance] = useState<DriverPerformance | null>(null);
  const [trips, setTrips] = useState<DriverTripLog[]>([]);
  const [activities, setActivities] = useState<DriverActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const found = drivers.find((d) => d.id === id);
      if (found) {
        setDriver(found);
        setPerformance(
          mockPerformances[id] || {
            safetyScore: found.safetyScore,
            tripsCompleted: 12,
            distanceDriven: found.experienceYears * 12000,
            fuelEfficiency: 7.0,
            incidentsCount: 0,
          }
        );
        setTrips(mockTrips[id] || []);
        setActivities(
          mockActivities[id] || [
            {
              id: 'act-gen',
              type: 'registered',
              description: 'Driver registered on platform',
              user: 'System Admin',
              date: found.joiningDate,
            },
          ]
        );
      } else {
        setError('Driver not found');
      }
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id, drivers]);

  return {
    driver,
    performance,
    trips,
    activities,
    isLoading,
    error,
  };
}

export default useDriver;
