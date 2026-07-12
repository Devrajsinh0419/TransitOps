'use client';

import { useState, useEffect } from 'react';
import { Vehicle, VehicleFilters, VehicleStatus } from '@/types/vehicle';
import { toast } from 'sonner';

const initialMockVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    name: 'Volvo FH16 Globetrotter',
    registrationNumber: 'TRK-491-A',
    type: 'heavy_truck',
    manufacturer: 'Volvo Trucks',
    model: 'FH16',
    year: 2024,
    vinNumber: 'VLV16FH1234567890',
    capacity: 22000,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'Midnight Blue',
    purchaseDate: '2024-01-15',
    purchaseCost: 145000,
    insuranceExpiry: '2027-01-15',
    registrationExpiry: '2027-01-15',
    currentOdometer: 14200,
    status: 'available',
    garageLocation: 'Houston Depot North',
    photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format&fit=crop&q=60',
    createdDate: '2024-01-15',
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    archived: false,
  },
  {
    id: 'veh-2',
    name: 'Ford Transit Cargo Van',
    registrationNumber: 'VAN-102-X',
    type: 'delivery_van',
    manufacturer: 'Ford Motor Company',
    model: 'Transit 350',
    year: 2023,
    vinNumber: 'FRD350TR123456789',
    capacity: 4500,
    fuelType: 'petrol',
    transmission: 'automatic',
    color: 'Oxford White',
    purchaseDate: '2023-05-10',
    purchaseCost: 48000,
    insuranceExpiry: '2026-05-10',
    registrationExpiry: '2026-05-10',
    currentOdometer: 38200,
    status: 'on_trip',
    garageLocation: 'Chicago Hub East',
    photoUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=60',
    createdDate: '2023-05-10',
    createdAt: '2023-05-10T09:12:00Z',
    updatedAt: '2023-05-10T09:12:00Z',
    archived: false,
  },
  {
    id: 'veh-3',
    name: 'Scania R500 V8',
    registrationNumber: 'TRK-108-B',
    type: 'heavy_truck',
    manufacturer: 'Scania AB',
    model: 'R500',
    year: 2022,
    vinNumber: 'SCN500R8123456789',
    capacity: 24000,
    fuelType: 'diesel',
    transmission: 'manual',
    color: 'Crimson Red',
    purchaseDate: '2022-09-20',
    purchaseCost: 132000,
    insuranceExpiry: '2026-09-20',
    registrationExpiry: '2026-09-20',
    currentOdometer: 98400,
    status: 'maintenance',
    garageLocation: 'Dallas Shop Main',
    photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
    createdDate: '2022-09-20',
    createdAt: '2022-09-20T10:00:00Z',
    updatedAt: '2022-09-20T10:00:00Z',
    archived: false,
  },
  {
    id: 'veh-4',
    name: 'Mercedes-Benz Actros',
    registrationNumber: 'TRK-552-C',
    type: 'refrigerated',
    manufacturer: 'Mercedes-Benz',
    model: 'Actros 2645',
    year: 2021,
    vinNumber: 'MBZ2645AC12345678',
    capacity: 20000,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'Carbon Grey',
    purchaseDate: '2021-11-05',
    purchaseCost: 158000,
    insuranceExpiry: '2026-11-05',
    registrationExpiry: '2026-11-05',
    currentOdometer: 164200,
    status: 'retired',
    garageLocation: 'Retired Yard South',
    photoUrl: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a44?w=800&auto=format&fit=crop&q=60',
    createdDate: '2021-11-05',
    createdAt: '2021-11-05T14:40:00Z',
    updatedAt: '2021-11-05T14:40:00Z',
    archived: false,
  },
  {
    id: 'veh-5',
    name: 'Utility Dry Van Trailer',
    registrationNumber: 'TRL-809-Y',
    type: 'trailer',
    manufacturer: 'Utility Trailer Mfg',
    model: '4000D-X',
    year: 2023,
    vinNumber: 'UTL4000DX12345678',
    capacity: 55000,
    fuelType: 'diesel',
    transmission: 'manual',
    color: 'Silver Metallic',
    purchaseDate: '2023-03-12',
    purchaseCost: 38500,
    insuranceExpiry: '2026-03-12',
    registrationExpiry: '2026-03-12',
    currentOdometer: 24000,
    status: 'inactive',
    garageLocation: 'Houston Depot North',
    createdDate: '2023-03-12',
    createdAt: '2023-03-12T11:15:00Z',
    updatedAt: '2023-03-12T11:15:00Z',
    archived: false,
  },
  {
    id: 'veh-6',
    name: 'Freightliner Cascadia',
    registrationNumber: 'TRK-789-M',
    type: 'heavy_truck',
    manufacturer: 'Freightliner',
    model: 'Cascadia',
    year: 2020,
    vinNumber: 'FRG789CS123456789',
    capacity: 22000,
    fuelType: 'diesel',
    transmission: 'automatic',
    color: 'Jet Black',
    purchaseDate: '2020-06-18',
    purchaseCost: 125000,
    insuranceExpiry: '2025-06-18',
    registrationExpiry: '2025-06-18',
    currentOdometer: 312000,
    status: 'disposed',
    garageLocation: 'Disposal Yard East',
    createdDate: '2020-06-18',
    createdAt: '2020-06-18T16:20:00Z',
    updatedAt: '2020-06-18T16:20:00Z',
    archived: true,
  },
];

// In-memory persist simulator for the hackathon
let activeVehicles = [...initialMockVehicles];

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({
    search: '',
    type: '',
    status: '',
    capacity: '',
    sortBy: 'newest',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      // Apply Search
      let result = activeVehicles.filter(
        (v) =>
          v.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          v.registrationNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
          v.vinNumber.toLowerCase().includes(filters.search.toLowerCase())
      );

      // Apply Filters
      if (filters.type) {
        result = result.filter((v) => v.type === filters.type);
      }
      if (filters.status) {
        result = result.filter((v) => v.status === filters.status);
      }
      if (filters.capacity) {
        const capacityLimit = parseInt(filters.capacity, 10);
        result = result.filter((v) => v.capacity >= capacityLimit);
      }

      // Apply Sort
      result.sort((a, b) => {
        let fieldA: any = a.createdDate;
        let fieldB: any = b.createdDate;

        if (filters.sortBy === 'name') {
          fieldA = a.name;
          fieldB = b.name;
        } else if (filters.sortBy === 'registrationNumber') {
          fieldA = a.registrationNumber;
          fieldB = b.registrationNumber;
        } else if (filters.sortBy === 'oldest') {
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        } else if (filters.sortBy === 'newest') {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        }

        if (fieldA < fieldB) return filters.sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      setVehicles(result);
      setIsLoading(false);
    }, 450);
  };

  useEffect(() => {
    fetchVehicles();
  }, [filters]);

  const archiveVehicle = async (id: string) => {
    activeVehicles = activeVehicles.map((v) =>
      v.id === id ? { ...v, status: 'inactive' as VehicleStatus, archived: true } : v
    );
    toast.success('Vehicle archived successfully');
    fetchVehicles();
  };

  const restoreVehicle = async (id: string) => {
    activeVehicles = activeVehicles.map((v) =>
      v.id === id ? { ...v, status: 'available' as VehicleStatus, archived: false } : v
    );
    toast.success('Vehicle restored successfully');
    fetchVehicles();
  };

  const addLocalVehicle = (vehicle: Vehicle) => {
    activeVehicles = [vehicle, ...activeVehicles];
    fetchVehicles();
  };

  const updateLocalVehicle = (id: string, updated: Partial<Vehicle>) => {
    activeVehicles = activeVehicles.map((v) => (v.id === id ? { ...v, ...updated } : v));
    fetchVehicles();
  };

  const deleteLocalVehicle = (id: string) => {
    activeVehicles = activeVehicles.filter((v) => v.id !== id);
    toast.success('Vehicle deleted successfully');
    fetchVehicles();
  };

  return {
    vehicles,
    filters,
    setFilters,
    isLoading,
    error,
    totalCount: activeVehicles.length,
    archiveVehicle,
    restoreVehicle,
    addLocalVehicle,
    updateLocalVehicle,
    deleteLocalVehicle,
    refetch: fetchVehicles,
  };
}

export default useVehicles;
