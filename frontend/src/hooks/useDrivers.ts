'use client';

import { useState, useEffect } from 'react';
import { Driver, DriverFilters } from '@/types/driver';
import { toast } from 'sonner';

const initialMockDrivers: Driver[] = [
  {
    id: 'drv-1',
    name: 'Marcus Miller',
    employeeId: 'EMP-291-A',
    gender: 'male',
    dob: '1988-06-15',
    phone: '+15550192831',
    email: 'marcus.miller@transitops.com',
    address: '4221 Oak Avenue, Houston, TX 77002',
    emergencyContact: 'Sarah Miller',
    emergencyPhone: '+15550192832',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'TX-DL-9482910',
    licenseCategory: 'Class A CDL',
    licenseIssueDate: '2020-02-10',
    licenseExpiry: '2027-02-10', // Valid
    issuingAuthority: 'Texas DMV',
    joiningDate: '2021-03-01',
    department: 'Heavy Logistics',
    experienceYears: 12,
    status: 'available',
    assignedVehicleId: 'veh-1',
    assignedVehicleName: 'Volvo FH16 Globetrotter',
    bloodGroup: 'O+',
    healthStatus: 'fit',
    safetyScore: 98,
    notes: 'Exceptional safety track record on long-haul routes.',
    createdDate: '2021-03-01',
    createdAt: '2021-03-01T08:00:00Z',
    updatedAt: '2021-03-01T08:00:00Z',
  },
  {
    id: 'drv-2',
    name: 'David Richardson',
    employeeId: 'EMP-102-X',
    gender: 'male',
    dob: '1992-11-04',
    phone: '+15550228391',
    email: 'david.richardson@transitops.com',
    address: '892 Pine St, Chicago, IL 60611',
    emergencyContact: 'Linda Richardson',
    emergencyPhone: '+15550228392',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'IL-CDL-8291048',
    licenseCategory: 'Class B CDL',
    licenseIssueDate: '2018-09-12',
    licenseExpiry: '2026-09-12', // Valid
    issuingAuthority: 'Illinois DMV',
    joiningDate: '2023-05-15',
    department: 'Last Mile Delivery',
    experienceYears: 6,
    status: 'on_trip',
    assignedVehicleId: 'veh-2',
    assignedVehicleName: 'Ford Transit Cargo Van',
    bloodGroup: 'A+',
    healthStatus: 'fit',
    safetyScore: 94,
    notes: 'Courteous and reliable with urban deliveries.',
    createdDate: '2023-05-15',
    createdAt: '2023-05-15T09:00:00Z',
    updatedAt: '2023-05-15T09:00:00Z',
  },
  {
    id: 'drv-3',
    name: 'Amanda Sterling',
    employeeId: 'EMP-804-C',
    gender: 'female',
    dob: '1995-04-22',
    phone: '+15550482910',
    email: 'amanda.sterling@transitops.com',
    address: '154 Spruce Way, Dallas, TX 75201',
    emergencyContact: 'John Sterling',
    emergencyPhone: '+15550482911',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'TX-CDL-7391048',
    licenseCategory: 'Class A CDL',
    licenseIssueDate: '2021-05-20',
    licenseExpiry: '2026-07-30', // Expiring Soon (July 2026)
    issuingAuthority: 'Texas DMV',
    joiningDate: '2022-09-20',
    department: 'Refrigerated Transport',
    experienceYears: 4,
    status: 'off_duty',
    bloodGroup: 'B-',
    healthStatus: 'fit',
    safetyScore: 91,
    notes: 'Handles refrigerated payloads and checks temp logs diligently.',
    createdDate: '2022-09-20',
    createdAt: '2022-09-20T10:00:00Z',
    updatedAt: '2022-09-20T10:00:00Z',
  },
  {
    id: 'drv-4',
    name: 'Robert Vance',
    employeeId: 'EMP-552-Y',
    gender: 'male',
    dob: '1976-08-30',
    phone: '+15550992831',
    email: 'robert.vance@transitops.com',
    address: '772 Maple Rd, Dallas, TX 75207',
    emergencyContact: 'Karen Vance',
    emergencyPhone: '+15550992832',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'TX-DL-3810294',
    licenseCategory: 'Class C CDL',
    licenseIssueDate: '2015-06-18',
    licenseExpiry: '2026-06-10', // Expired (June 2026)
    issuingAuthority: 'Texas DMV',
    joiningDate: '2019-11-05',
    department: 'Hazardous Materials',
    experienceYears: 18,
    status: 'suspended',
    bloodGroup: 'AB+',
    healthStatus: 'monitoring',
    safetyScore: 84,
    notes: 'Currently suspended pending renewal of expired license scan.',
    createdDate: '2019-11-05',
    createdAt: '2019-11-05T14:00:00Z',
    updatedAt: '2019-11-05T14:00:00Z',
  },
  {
    id: 'drv-5',
    name: 'Sarah Connor',
    employeeId: 'EMP-119-L',
    gender: 'female',
    dob: '1985-03-12',
    phone: '+15550381029',
    email: 'sarah.connor@transitops.com',
    address: '900 Vista Heights, Houston, TX 77018',
    emergencyContact: 'John Connor',
    emergencyPhone: '+15550381030',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'TX-DL-8091823',
    licenseCategory: 'Class D',
    licenseIssueDate: '2018-03-12',
    licenseExpiry: '2028-03-12', // Valid
    issuingAuthority: 'Texas DMV',
    joiningDate: '2023-03-12',
    department: 'Support & Shuttle',
    experienceYears: 8,
    status: 'leave',
    bloodGroup: 'O-',
    healthStatus: 'fit',
    safetyScore: 96,
    notes: 'On medical leave till next week. Standard return to drive.',
    createdDate: '2023-03-12',
    createdAt: '2023-03-12T11:00:00Z',
    updatedAt: '2023-03-12T11:00:00Z',
  },
  {
    id: 'drv-6',
    name: 'James Carter',
    employeeId: 'EMP-789-M',
    gender: 'male',
    dob: '1990-09-20',
    phone: '+15550781928',
    email: 'james.carter@transitops.com',
    address: '128 Willow Creek, Fort Worth, TX 76102',
    emergencyContact: 'Mary Carter',
    emergencyPhone: '+15550781929',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'TX-CDL-1829104',
    licenseCategory: 'Class A CDL',
    licenseIssueDate: '2016-06-18',
    licenseExpiry: '2025-06-18', // Expired
    issuingAuthority: 'Texas DMV',
    joiningDate: '2020-06-18',
    department: 'Heavy Logistics',
    experienceYears: 10,
    status: 'inactive',
    bloodGroup: 'A-',
    healthStatus: 'unfit',
    safetyScore: 78,
    notes: 'Inactive record due to physical therapy schedule.',
    createdDate: '2020-06-18',
    createdAt: '2020-06-18T16:00:00Z',
    updatedAt: '2020-06-18T16:00:00Z',
  },
];

// In-memory persist simulator for drivers
let activeDrivers = [...initialMockDrivers];

export function useDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filters, setFilters] = useState<DriverFilters>({
    search: '',
    status: '',
    licenseCategory: '',
    availability: '',
    minSafetyScore: '',
    department: '',
    licenseExpiryRange: '',
    sortBy: 'newest',
    sortOrder: 'desc',
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDrivers = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      let result = [...activeDrivers];

      // Apply Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(
          (d) =>
            d.name.toLowerCase().includes(query) ||
            d.employeeId.toLowerCase().includes(query) ||
            d.licenseNumber.toLowerCase().includes(query) ||
            d.phone.includes(query)
        );
      }

      // Apply Status Filter
      if (filters.status) {
        result = result.filter((d) => d.status === filters.status);
      }

      // Apply License Category Filter
      if (filters.licenseCategory) {
        result = result.filter((d) => d.licenseCategory === filters.licenseCategory);
      }

      // Apply Availability Filter (available, on_trip, off_duty, suspended)
      if (filters.availability) {
        result = result.filter((d) => d.status === filters.availability);
      }

      // Apply Safety Score filter (minimum)
      if (filters.minSafetyScore) {
        const minVal = parseInt(filters.minSafetyScore, 10);
        result = result.filter((d) => d.safetyScore >= minVal);
      }

      // Apply Department Filter
      if (filters.department) {
        result = result.filter((d) => d.department === filters.department);
      }

      // Apply License Expiry Range filter
      if (filters.licenseExpiryRange) {
        const today = new Date();
        result = result.filter((d) => {
          const expiry = new Date(d.licenseExpiry);
          const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          if (filters.licenseExpiryRange === 'expired') {
            return diffDays < 0;
          } else if (filters.licenseExpiryRange === 'expiring_soon') {
            return diffDays >= 0 && diffDays <= 60;
          } else if (filters.licenseExpiryRange === 'valid') {
            return diffDays > 60;
          }
          return true;
        });
      }

      // Apply Sort
      result.sort((a, b) => {
        let fieldA: any = a.createdDate;
        let fieldB: any = b.createdDate;

        if (filters.sortBy === 'name') {
          fieldA = a.name;
          fieldB = b.name;
        } else if (filters.sortBy === 'safetyScore') {
          return b.safetyScore - a.safetyScore;
        } else if (filters.sortBy === 'licenseExpiry') {
          return new Date(a.licenseExpiry).getTime() - new Date(b.licenseExpiry).getTime();
        } else if (filters.sortBy === 'oldest') {
          return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
        } else if (filters.sortBy === 'newest') {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
        }

        if (fieldA < fieldB) return filters.sortOrder === 'asc' ? -1 : 1;
        if (fieldA > fieldB) return filters.sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      setDrivers(result);
      setIsLoading(false);
    }, 450);
  };

  useEffect(() => {
    fetchDrivers();
  }, [filters]);

  const suspendDriver = async (id: string) => {
    activeDrivers = activeDrivers.map((d) =>
      d.id === id ? { ...d, status: 'suspended', updatedAt: new Date().toISOString() } : d
    );
    toast.warning('Driver suspended successfully');
    fetchDrivers();
  };

  const activateDriver = async (id: string) => {
    activeDrivers = activeDrivers.map((d) =>
      d.id === id ? { ...d, status: 'available', updatedAt: new Date().toISOString() } : d
    );
    toast.success('Driver activated and set to available');
    fetchDrivers();
  };

  const addLocalDriver = (driver: Driver) => {
    activeDrivers = [driver, ...activeDrivers];
    fetchDrivers();
  };

  const updateLocalDriver = (id: string, updated: Partial<Driver>) => {
    activeDrivers = activeDrivers.map((d) => (d.id === id ? { ...d, ...updated, updatedAt: new Date().toISOString() } : d));
    fetchDrivers();
  };

  const deleteLocalDriver = (id: string) => {
    activeDrivers = activeDrivers.filter((d) => d.id !== id);
    toast.success('Driver record removed successfully');
    fetchDrivers();
  };

  return {
    drivers,
    filters,
    setFilters,
    isLoading,
    error,
    totalCount: activeDrivers.length,
    suspendDriver,
    activateDriver,
    addLocalDriver,
    updateLocalDriver,
    deleteLocalDriver,
    refetch: fetchDrivers,
  };
}

export { activeDrivers };
export default useDrivers;
