'use client';

import { useState } from 'react';
import { Driver } from '@/types/driver';
import { useDrivers } from './useDrivers';
import { toast } from 'sonner';

export function useCreateDriver() {
  const { addLocalDriver } = useDrivers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const createDriver = async (data: any): Promise<Driver | null> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    return new Promise((resolve) => {
      setTimeout(() => {
        const newDriver: Driver = {
          id: `drv-${Date.now()}`,
          name: data.name,
          employeeId: data.employeeId,
          gender: data.gender,
          dob: data.dob,
          phone: data.phone,
          email: data.email,
          address: data.address,
          emergencyContact: data.emergencyContact,
          emergencyPhone: data.emergencyPhone,
          avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          
          licenseNumber: data.licenseNumber,
          licenseCategory: data.licenseCategory,
          licenseIssueDate: data.licenseIssueDate,
          licenseExpiry: data.licenseExpiry,
          issuingAuthority: data.issuingAuthority || 'Texas DMV',
          licenseScanUrl: data.licenseScanUrl,

          joiningDate: data.joiningDate,
          department: data.department,
          experienceYears: Number(data.experienceYears),
          status: data.status || 'available',
          salaryPlaceholder: data.salaryPlaceholder ? Number(data.salaryPlaceholder) : undefined,

          bloodGroup: data.bloodGroup,
          healthStatus: data.healthStatus,
          
          safetyScore: data.safetyScore ? Number(data.safetyScore) : 100,
          notes: data.notes,

          createdDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        addLocalDriver(newDriver);
        setIsSuccess(true);
        setIsLoading(false);
        toast.success('Driver registered successfully!');
        resolve(newDriver);
      }, 800);
    });
  };

  return {
    createDriver,
    isLoading,
    error,
    isSuccess,
  };
}

export default useCreateDriver;
