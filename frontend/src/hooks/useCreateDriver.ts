'use client';

import { useState } from 'react';
import { Driver } from '@/types/driver';
import { useDrivers } from './useDrivers';
import { driverService } from '@/services/driver.service';
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

    try {
      // Map frontend schema fields to backend model field names
      const payload: Record<string, any> = {
        name: data.name,
        license_number: data.licenseNumber,
        license_category: data.licenseCategory,
        license_type: data.licenseCategory,
        license_expiry: data.licenseExpiry,
        contact_number: data.phone,
        safety_score: data.safetyScore ?? 100,
        status: mapStatus(data.status),
      };

      // Optional fields
      if (data.avatarUrl) payload.photo_url = data.avatarUrl;

      const created = await driverService.createDriver(payload);

      // Merge local fields not stored on the backend (used for in-memory display)
      const localDriver: Driver = {
        ...created,
        id: String(created.id),
        employeeId: data.employeeId,
        gender: data.gender,
        dob: data.dob,
        phone: data.phone,
        email: data.email,
        address: data.address,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        avatarUrl: data.avatarUrl || (created as any).photo_url || '',
        licenseNumber: data.licenseNumber,
        licenseCategory: data.licenseCategory,
        licenseIssueDate: data.licenseIssueDate,
        licenseExpiry: data.licenseExpiry,
        issuingAuthority: data.issuingAuthority || 'Texas DMV',
        licenseScanUrl: data.licenseScanUrl,
        medicalCertificateUrl: data.medicalCertificateUrl,
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

      addLocalDriver(localDriver);
      setIsSuccess(true);
      toast.success('Driver registered successfully!');
      return localDriver;
    } catch (err: any) {
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat().join(' ') ||
        'Failed to register driver.';
      setError(msg);
      toast.error('Registration Failed', { description: msg });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createDriver,
    isLoading,
    error,
    isSuccess,
  };
}

// Maps frontend status values to the backend TextChoices values
function mapStatus(status: string): string {
  const map: Record<string, string> = {
    available: 'Available',
    on_trip: 'On Trip',
    off_duty: 'Off Duty',
    suspended: 'Suspended',
    leave: 'Available',     // backend has no "Leave" — default to Available
    inactive: 'Off Duty',   // backend has no "Inactive" — default to Off Duty
  };
  return map[status] || 'Available';
}

export default useCreateDriver;
