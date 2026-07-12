'use client';

import { useState, useEffect } from 'react';
import { Trip, TripFilters, TripStatus } from '@/types/trip';
import { toast } from 'sonner';

const initialMockTrips: Trip[] = [
  {
    id: 'trp-1',
    tripNumber: 'TRP-2026-0001',
    tripName: 'Houston-Dallas Heavy Haul',
    tripType: 'one_way',
    priority: 'high',
    description: 'Scheduled dispatch of industrial drill rigs and generator assets.',
    status: 'in_progress',
    route: {
      source: 'Houston Port Terminal A, TX',
      destination: 'Dallas Logistics Hub, TX',
      plannedDistance: 240,
      estimatedTime: '4.5 Hours',
      gpsLocation: '30.1205, -95.4211 (I-45 Northbound)',
    },
    vehicleId: 'veh-1',
    vehicleName: 'Volvo FH16 Globetrotter',
    vehicleRegistration: 'TRK-491-A',
    vehicleCapacity: 45000,
    vehicleOdometer: 148900,
    driverId: 'drv-1',
    driverName: 'Marcus Miller',
    driverPhone: '+15550192831',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    driverLicenseExpiry: '2027-02-10',
    driverSafetyScore: 98,
    cargo: {
      type: 'Industrial Machinery',
      weight: 38000,
      value: 125000,
      specialInstructions: 'Oversize load flags. Keep speed under 65 MPH.',
    },
    expectedRevenue: 2850,
    estimatedFuelCost: 450,
    estimatedToll: 45,
    estimatedExpenses: 80,
    expenses: [
      { id: 'exp-1', category: 'fuel', amount: 440, description: 'Initial diesel fill-up', date: '2026-07-12' },
      { id: 'exp-2', category: 'toll', amount: 42, description: 'Sam Houston tollway', date: '2026-07-12' },
    ],
    timeline: [
      { id: 'tl-1', type: 'created', description: 'Trip manifest registered in Draft', user: 'Admin Desk', date: '2026-07-12 08:30' },
      { id: 'tl-2', type: 'vehicle_assigned', description: 'Volvo FH16 (TRK-491-A) assigned to route', user: 'Admin Desk', date: '2026-07-12 08:35' },
      { id: 'tl-3', type: 'driver_assigned', description: 'Marcus Miller assigned as driver', user: 'Admin Desk', date: '2026-07-12 08:40' },
      { id: 'tl-4', type: 'dispatched', description: 'Pre-trip safety checklist verified. Dispatched.', user: 'Dispatch Lead', date: '2026-07-12 09:00' },
      { id: 'tl-5', type: 'started', description: 'GPS tracker active. Driver initiated route.', user: 'System Auto', date: '2026-07-12 09:15' },
    ],
    dispatchTime: '2026-07-12T09:00:00Z',
    createdBy: 'Admin Desk',
    createdAt: '2026-07-12T08:30:00Z',
    updatedAt: '2026-07-12T09:15:00Z',
  },
  {
    id: 'trp-2',
    tripNumber: 'TRP-2026-0002',
    tripName: 'Last-Mile Medical Shuttle',
    tripType: 'round_trip',
    priority: 'critical',
    description: 'Urgent delivery of temperature-sensitive vaccines and lab devices.',
    status: 'draft',
    route: {
      source: 'Chicago Central Depot, IL',
      destination: 'Naperville Medical Center, IL',
      plannedDistance: 35,
      estimatedTime: '1 Hour',
    },
    vehicleId: 'veh-2',
    vehicleName: 'Ford Transit Cargo Van',
    vehicleRegistration: 'VAN-102-X',
    vehicleCapacity: 3500,
    vehicleOdometer: 42100,
    driverId: 'drv-2',
    driverName: 'David Richardson',
    driverPhone: '+15550228391',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    driverLicenseExpiry: '2026-09-12',
    driverSafetyScore: 94,
    cargo: {
      type: 'Pharmaceuticals',
      weight: 1200,
      value: 65000,
      specialInstructions: 'Maintain refrigeration container temperature at 4°C.',
    },
    expectedRevenue: 450,
    estimatedFuelCost: 60,
    estimatedToll: 12,
    estimatedExpenses: 0,
    expenses: [],
    timeline: [
      { id: 'tl-6', type: 'created', description: 'Medical cargo manifest compiled in Draft', user: 'Admin Desk', date: '2026-07-12 10:15' },
    ],
    createdBy: 'Admin Desk',
    createdAt: '2026-07-12T10:15:00Z',
    updatedAt: '2026-07-12T10:15:00Z',
  },
  {
    id: 'trp-3',
    tripNumber: 'TRP-2026-0003',
    tripName: 'Austin Depot Return Shuttles',
    tripType: 'round_trip',
    priority: 'low',
    description: 'Standard inventory restocking trip.',
    status: 'completed',
    route: {
      source: 'Austin Distribution Terminal, TX',
      destination: 'Houston North Depot, TX',
      plannedDistance: 165,
      estimatedTime: '3 Hours',
    },
    vehicleId: 'veh-1',
    vehicleName: 'Volvo FH16 Globetrotter',
    vehicleRegistration: 'TRK-491-A',
    vehicleCapacity: 45000,
    vehicleOdometer: 148300,
    driverId: 'drv-1',
    driverName: 'Marcus Miller',
    driverPhone: '+15550192831',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    driverLicenseExpiry: '2027-02-10',
    driverSafetyScore: 98,
    cargo: {
      type: 'Empty Pallets & Racks',
      weight: 8000,
      value: 2500,
    },
    expectedRevenue: 980,
    estimatedFuelCost: 280,
    estimatedToll: 25,
    estimatedExpenses: 10,
    actualRevenue: 980,
    finalOdometer: 148467,
    actualDistance: 167,
    fuelConsumed: 25,
    actualExpenses: 285,
    expenses: [
      { id: 'exp-3', category: 'fuel', amount: 260, description: 'Fuel top-up', date: '2026-07-10' },
      { id: 'exp-4', category: 'toll', amount: 25, description: 'Toll charges', date: '2026-07-10' },
    ],
    timeline: [
      { id: 'tl-7', type: 'created', description: 'Trip manifest registered', user: 'System Admin', date: '2026-07-10 07:00' },
      { id: 'tl-8', type: 'dispatched', description: 'Dispatched to route', user: 'System Admin', date: '2026-07-10 07:15' },
      { id: 'tl-9', type: 'started', description: 'Route tracking active', user: 'System Auto', date: '2026-07-10 07:30' },
      { id: 'tl-10', type: 'completed', description: 'Trip completed. Odometer & fuel stats verified.', user: 'Marcus Miller', date: '2026-07-10 11:30' },
    ],
    dispatchTime: '2026-07-10T07:15:00Z',
    completionTime: '2026-07-10T11:30:00Z',
    createdBy: 'System Admin',
    createdAt: '2026-07-10T07:00:00Z',
    updatedAt: '2026-07-10T11:30:00Z',
  },
  {
    id: 'trp-4',
    tripNumber: 'TRP-2026-0004',
    tripName: 'Cancelled HAZMAT Delivery',
    tripType: 'one_way',
    priority: 'medium',
    description: 'Interstate transport of fuel stabilizers.',
    status: 'cancelled',
    route: {
      source: 'Houston Port Terminal A, TX',
      destination: 'New Orleans Hub, LA',
      plannedDistance: 350,
      estimatedTime: '6 Hours',
    },
    vehicleId: 'veh-3', // Placeholder
    vehicleName: 'Peterbilt 579 Semi-Truck',
    vehicleRegistration: 'TRK-982-Z',
    vehicleCapacity: 50000,
    vehicleOdometer: 89000,
    driverId: 'drv-4',
    driverName: 'Robert Vance',
    driverPhone: '+15550992831',
    driverAvatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    driverLicenseExpiry: '2026-06-10',
    driverSafetyScore: 84,
    cargo: {
      type: 'Stabilizer chemicals',
      weight: 22000,
      value: 80000,
    },
    expectedRevenue: 3800,
    estimatedFuelCost: 650,
    estimatedToll: 80,
    estimatedExpenses: 120,
    expenses: [],
    cancellationReason: 'Driver License Expired',
    cancellationNotes: 'Trip cancelled by compliance team. Driver license TX-DL-3810294 is expired.',
    timeline: [
      { id: 'tl-11', type: 'created', description: 'Chemical freight manifest registered', user: 'Compliance Team', date: '2026-07-09 13:00' },
      { id: 'tl-12', type: 'cancelled', description: 'Cancelled due to compliance block: driver license expired', user: 'Compliance Team', date: '2026-07-09 14:30' },
    ],
    createdBy: 'Compliance Team',
    createdAt: '2026-07-09T13:00:00Z',
    updatedAt: '2026-07-09T14:30:00Z',
  },
];

// In-memory persist simulator for trips
let activeTrips = [...initialMockTrips];

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filters, setFilters] = useState<TripFilters>({
    search: '',
    status: '',
    driverId: '',
    vehicleId: '',
    priority: '',
    dateRange: '',
    sortBy: 'newest',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      let result = [...activeTrips];

      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (t) =>
            t.tripNumber.toLowerCase().includes(query) ||
            t.tripName.toLowerCase().includes(query) ||
            t.route.source.toLowerCase().includes(query) ||
            t.route.destination.toLowerCase().includes(query) ||
            t.driverName.toLowerCase().includes(query) ||
            t.vehicleRegistration.toLowerCase().includes(query)
        );
      }

      // Filters
      if (filters.status) {
        result = result.filter((t) => t.status === filters.status);
      }
      if (filters.driverId) {
        result = result.filter((t) => t.driverId === filters.driverId);
      }
      if (filters.vehicleId) {
        result = result.filter((t) => t.vehicleId === filters.vehicleId);
      }
      if (filters.priority) {
        result = result.filter((t) => t.priority === filters.priority);
      }

      // Sort
      result.sort((a, b) => {
        if (filters.sortBy === 'tripNumber') {
          return filters.sortOrder === 'asc'
            ? a.tripNumber.localeCompare(b.tripNumber)
            : b.tripNumber.localeCompare(a.tripNumber);
        }
        if (filters.sortBy === 'revenue') {
          return filters.sortOrder === 'asc'
            ? a.expectedRevenue - b.expectedRevenue
            : b.expectedRevenue - a.expectedRevenue;
        }
        if (filters.sortBy === 'distance') {
          return filters.sortOrder === 'asc'
            ? a.route.plannedDistance - b.route.plannedDistance
            : b.route.plannedDistance - a.route.plannedDistance;
        }
        if (filters.sortBy === 'oldest') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        // default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setTrips(result);
      setIsLoading(false);
    }, 450);
  };

  useEffect(() => {
    fetchTrips();
  }, [filters]);

  const addLocalTrip = (newTrip: Trip) => {
    activeTrips = [newTrip, ...activeTrips];
    fetchTrips();
  };

  const updateLocalTrip = (id: string, updated: Partial<Trip>) => {
    activeTrips = activeTrips.map((t) => (t.id === id ? { ...t, ...updated, updatedAt: new Date().toISOString() } : t));
    fetchTrips();
  };

  const deleteLocalTrip = (id: string) => {
    activeTrips = activeTrips.filter((t) => t.id !== id);
    toast.success('Trip record removed successfully');
    fetchTrips();
  };

  return {
    trips,
    filters,
    setFilters,
    isLoading,
    error,
    totalCount: activeTrips.length,
    addLocalTrip,
    updateLocalTrip,
    deleteLocalTrip,
    refetch: fetchTrips,
  };
}

export { activeTrips };
export default useTrips;
