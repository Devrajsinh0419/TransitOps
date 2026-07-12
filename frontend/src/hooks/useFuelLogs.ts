'use client';

import { useState, useEffect } from 'react';
import { FuelLog, FuelSummary, FuelFilters } from '@/types/fuel';
import { toast } from 'sonner';

const initialMockFuelLogs: FuelLog[] = [
  {
    id: 'ful-1',
    fuelLogId: 'FUL-2026-0001',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    vehicleName: 'Volvo FH16 Globetrotter',
    driverId: 'drv-1',
    driverName: 'Marcus Miller',
    tripId: 'trp-1',
    tripNumber: 'TRP-2026-0001',
    fuelType: 'Diesel Premium',
    quantity: 120, // liters
    pricePerLiter: 1.55,
    totalCost: 186.00,
    odometer: 14020,
    fuelStation: 'Shell Highway 10 North',
    invoiceNumber: 'INV-F-99881',
    receiptImage: '/receipts/fuel_sample.jpg',
    date: '2026-07-02',
    createdBy: 'Marcus Miller',
    createdAt: '2026-07-02T10:15:00Z',
    updatedAt: '2026-07-02T10:15:00Z',
  },
  {
    id: 'ful-2',
    fuelLogId: 'FUL-2026-0002',
    vehicleId: 'veh-2',
    vehicleRegistration: 'VAN-102-X',
    vehicleName: 'Ford Transit Cargo Van',
    driverId: 'drv-2',
    driverName: 'David Richardson',
    tripId: 'trp-2',
    tripNumber: 'TRP-2026-0002',
    fuelType: 'Regular Unleaded',
    quantity: 50,
    pricePerLiter: 1.48,
    totalCost: 74.00,
    odometer: 38100,
    fuelStation: 'Exxon Travel Plaza',
    invoiceNumber: 'INV-F-88201',
    date: '2026-07-04',
    createdBy: 'David Richardson',
    createdAt: '2026-07-04T14:30:00Z',
    updatedAt: '2026-07-04T14:30:00Z',
  },
  {
    id: 'ful-3',
    fuelLogId: 'FUL-2026-0003',
    vehicleId: 'veh-3',
    vehicleRegistration: 'TRK-108-B',
    vehicleName: 'Scania R500 V8',
    driverId: 'drv-3',
    driverName: 'Amanda Sterling',
    fuelType: 'Diesel High-Flow',
    quantity: 150,
    pricePerLiter: 1.58,
    totalCost: 237.00,
    odometer: 98120,
    fuelStation: 'Chevron Fleet Station',
    invoiceNumber: 'INV-F-77441',
    date: '2026-07-07',
    createdBy: 'Amanda Sterling',
    createdAt: '2026-07-07T08:00:00Z',
    updatedAt: '2026-07-07T08:00:00Z',
  },
  {
    id: 'ful-4',
    fuelLogId: 'FUL-2026-0004',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    vehicleName: 'Volvo FH16 Globetrotter',
    driverId: 'drv-1',
    driverName: 'Marcus Miller',
    fuelType: 'Diesel Premium',
    quantity: 115,
    pricePerLiter: 1.54,
    totalCost: 177.10,
    odometer: 14200,
    fuelStation: 'Shell Highway 10 North',
    invoiceNumber: 'INV-F-99901',
    date: '2026-07-09',
    createdBy: 'Marcus Miller',
    createdAt: '2026-07-09T18:45:00Z',
    updatedAt: '2026-07-09T18:45:00Z',
  },
];

// Share state at module scope
let activeFuelLogs = [...initialMockFuelLogs];

export function useFuelLogs() {
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [filters, setFilters] = useState<FuelFilters>({
    search: '',
    vehicleId: '',
    fuelType: '',
    dateRange: '',
    page: 1,
    limit: 10,
  });
  const [summary, setSummary] = useState<FuelSummary>({
    totalCost: 0,
    totalLiters: 0,
    averageMileage: 0,
    averageFuelCost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFuelLogs = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      let result = [...activeFuelLogs];

      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (log) =>
            log.fuelLogId.toLowerCase().includes(query) ||
            log.vehicleRegistration.toLowerCase().includes(query) ||
            log.driverName.toLowerCase().includes(query) ||
            log.fuelStation.toLowerCase().includes(query) ||
            log.invoiceNumber.toLowerCase().includes(query)
        );
      }

      // Filter by Vehicle
      if (filters.vehicleId) {
        result = result.filter((log) => log.vehicleId === filters.vehicleId);
      }

      // Filter by Fuel Type
      if (filters.fuelType) {
        result = result.filter((log) => log.fuelType === filters.fuelType);
      }

      // Sort newest first
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Calculations for Summary Cards
      const totalCost = result.reduce((sum, item) => sum + item.totalCost, 0);
      const totalLiters = result.reduce((sum, item) => sum + item.quantity, 0);
      
      // Calculate Average Mileage (approximated miles per liter)
      // Standard heavy vehicles yield ~1.2 to 2.5 miles/liter, van yields ~4.5 miles/liter.
      const averageMileage = totalLiters > 0 ? parseFloat((670 / totalLiters).toFixed(2)) : 0; // Simulated ratio
      const averageFuelCost = result.length > 0 ? parseFloat((totalCost / totalLiters).toFixed(2)) : 0;

      setSummary({
        totalCost: parseFloat(totalCost.toFixed(2)),
        totalLiters: parseFloat(totalLiters.toFixed(2)),
        averageMileage,
        averageFuelCost,
      });

      setFuelLogs(result);
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchFuelLogs();
  }, [filters]);

  const addLocalFuelLog = (log: FuelLog) => {
    activeFuelLogs = [log, ...activeFuelLogs];
    fetchFuelLogs();
  };

  return {
    fuelLogs,
    filters,
    setFilters,
    summary,
    isLoading,
    error,
    addLocalFuelLog,
    refetch: fetchFuelLogs,
  };
}

export { activeFuelLogs };
export default useFuelLogs;
