'use client';

import { useState, useEffect } from 'react';
import { MaintenanceRecord, MaintenanceFilters, MaintenanceStatus, MaintenancePriority } from '@/types/maintenance';
import { toast } from 'sonner';

const initialMockMaintenance: MaintenanceRecord[] = [
  {
    id: 'mnt-1',
    maintenanceId: 'MNT-2026-0001',
    vehicleId: 'veh-1',
    vehicleRegistration: 'TRK-491-A',
    vehicleName: 'Volvo FH16 Globetrotter',
    vehicleOdometer: 14200,
    vehicleStatus: 'available',
    type: 'routine',
    issueTitle: 'Engine Oil & Filter Service',
    description: 'Routine 15,000-mile engine lubrication service, air filter replacement, and full diagnostic scan.',
    priority: 'medium',
    status: 'approved',
    technicianName: 'Sarah Jenkins',
    workshop: 'Main Houston Workshop',
    scheduledDate: '2026-07-15',
    completionDate: '2026-07-16',
    estimatedDuration: '4 Hours',
    estimatedCost: 350,
    labourCost: 120,
    partsCost: 200,
    tax: 30,
    totalCost: 350,
    timeline: [
      { id: 'tl-1', type: 'created', description: 'Maintenance ticket registered by Dispatcher', user: 'Admin', date: '2026-07-10 09:00' },
      { id: 'tl-2', type: 'approved', description: 'Maintenance approved and parts ordered', user: 'Fleet Manager', date: '2026-07-10 11:30' },
    ],
    createdBy: 'Dispatcher John',
    createdAt: '2026-07-10T09:00:00Z',
    updatedAt: '2026-07-10T11:30:00Z',
  },
  {
    id: 'mnt-2',
    maintenanceId: 'MNT-2026-0002',
    vehicleId: 'veh-3',
    vehicleRegistration: 'TRK-108-B',
    vehicleName: 'Scania R500 V8',
    vehicleOdometer: 98400,
    vehicleStatus: 'maintenance',
    type: 'repair',
    issueTitle: 'Brake Pad Replacement & Caliper Overhaul',
    description: 'Front brakes squealing under load. Replace pads, turn rotors, and overhaul hydraulic caliper seals.',
    priority: 'high',
    status: 'in_progress',
    technicianName: 'Robert Martinez',
    workshop: 'Dallas Fleet Hub',
    scheduledDate: '2026-07-11',
    completionDate: '2026-07-13',
    estimatedDuration: '1.5 Days',
    estimatedCost: 1250,
    labourCost: 450,
    partsCost: 700,
    tax: 100,
    totalCost: 1250,
    timeline: [
      { id: 'tl-3', type: 'created', description: 'Break report registered by driver David', user: 'David Richardson', date: '2026-07-11 07:00' },
      { id: 'tl-4', type: 'approved', description: 'Emergency repairs approved by supervisor', user: 'Operations Manager', date: '2026-07-11 08:15' },
      { id: 'tl-5', type: 'technician_assigned', description: 'Robert Martinez assigned to job', user: 'Workshop Lead', date: '2026-07-11 09:00' },
      { id: 'tl-6', type: 'started', description: 'Vehicle booked in and teardown begun', user: 'Robert Martinez', date: '2026-07-12 08:30' },
    ],
    createdBy: 'David Richardson',
    createdAt: '2026-07-11T07:00:00Z',
    updatedAt: '2026-07-12T08:30:00Z',
  },
  {
    id: 'mnt-3',
    maintenanceId: 'MNT-2026-0003',
    vehicleId: 'veh-2',
    vehicleRegistration: 'VAN-102-X',
    vehicleName: 'Ford Transit Cargo Van',
    vehicleOdometer: 38200,
    vehicleStatus: 'available',
    type: 'inspection',
    issueTitle: 'Annual DOT Safety Inspection',
    description: 'Mandatory annual Department of Transportation compliance safety check and emissions verification.',
    priority: 'low',
    status: 'completed',
    technicianName: 'Alex Mercer',
    workshop: 'Chicago West Garage',
    scheduledDate: '2026-07-05',
    completionDate: '2026-07-05',
    estimatedDuration: '2 Hours',
    estimatedCost: 150,
    labourCost: 100,
    partsCost: 40,
    tax: 10,
    totalCost: 150,
    timeline: [
      { id: 'tl-7', type: 'created', description: 'Inspection scheduled automatically by scheduler', user: 'System', date: '2026-07-01 00:00' },
      { id: 'tl-8', type: 'approved', description: 'Work order approved', user: 'Fleet Manager', date: '2026-07-02 10:00' },
      { id: 'tl-9', type: 'started', description: 'Technician Alex started safety checks', user: 'Alex Mercer', date: '2026-07-05 09:00' },
      { id: 'tl-10', type: 'completed', description: 'Passed inspection with zero violations. Sticker updated.', user: 'Alex Mercer', date: '2026-07-05 11:00' },
    ],
    createdBy: 'System Scheduler',
    createdAt: '2026-07-01T00:00:00Z',
    updatedAt: '2026-07-05T11:00:00Z',
  },
];

// Share state at module scope
let activeMaintenance = [...initialMockMaintenance];

export function useMaintenance() {
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>([]);
  const [filters, setFilters] = useState<MaintenanceFilters>({
    search: '',
    vehicleId: '',
    status: '',
    priority: '',
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaintenance = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      let result = [...activeMaintenance];

      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (m) =>
            m.maintenanceId.toLowerCase().includes(query) ||
            m.issueTitle.toLowerCase().includes(query) ||
            m.vehicleRegistration.toLowerCase().includes(query) ||
            m.technicianName.toLowerCase().includes(query) ||
            m.workshop.toLowerCase().includes(query)
        );
      }

      // Filter by Vehicle
      if (filters.vehicleId) {
        result = result.filter((m) => m.vehicleId === filters.vehicleId);
      }

      // Filter by Status
      if (filters.status) {
        result = result.filter((m) => m.status === filters.status);
      }

      // Filter by Priority
      if (filters.priority) {
        result = result.filter((m) => m.priority === filters.priority);
      }

      // Sort newest first
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setMaintenance(result);
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchMaintenance();
  }, [filters]);

  const addLocalMaintenance = (record: MaintenanceRecord) => {
    activeMaintenance = [record, ...activeMaintenance];
    fetchMaintenance();
  };

  const updateLocalMaintenance = (id: string, updated: Partial<MaintenanceRecord>) => {
    activeMaintenance = activeMaintenance.map((m) => (m.id === id ? { ...m, ...updated, updatedAt: new Date().toISOString() } : m));
    fetchMaintenance();
  };

  const deleteLocalMaintenance = (id: string) => {
    activeMaintenance = activeMaintenance.filter((m) => m.id !== id);
    toast.success('Maintenance record deleted successfully');
    fetchMaintenance();
  };

  return {
    maintenance,
    filters,
    setFilters,
    isLoading,
    error,
    totalCount: activeMaintenance.length,
    addLocalMaintenance,
    updateLocalMaintenance,
    deleteLocalMaintenance,
    refetch: fetchMaintenance,
  };
}

export { activeMaintenance };
export default useMaintenance;
