'use client';

import { useState, useEffect } from 'react';
import { AppearanceSettings, FleetSettings, SecuritySettings } from '@/types/settings';
import { toast } from 'sonner';
import { useTheme } from './useTheme';
import { DEFAULT_APPEARANCE, loadAppearance, persistAppearance } from '@/lib/appearance';

const DEFAULT_FLEET: FleetSettings = {
  vehicleTypes: ['Heavy Truck', 'Delivery Van', 'Trailer', 'Refrigerated Truck'],
  fuelTypes: ['Diesel Premium', 'Regular Unleaded', 'Ethanol E85', 'Electric Charger'],
  maintenanceCategories: ['Preventative Maintenance', 'Emergency Repair', 'Odometer Calibration', 'Inspection Checklist'],
  expenseCategories: ['Fuel refills', 'Vehicle repairs', 'Tolls & Highway', 'Insurance', 'Storage & Parking'],
  tripPriorities: ['Low', 'Medium', 'High', 'Critical'],
  defaultDistanceUnit: 'km',
  defaultFuelUnit: 'L',
  defaultCurrency: 'INR',
  defaultTimezone: 'Asia/Kolkata',
};

const DEFAULT_SECURITY: SecuritySettings = {
  twoFactorEnabled: false,
  sessionTimeoutMinutes: 30,
};

export function useSettings() {
  const [appearance, setAppearance] = useState<AppearanceSettings>(DEFAULT_APPEARANCE);
  const [fleet, setFleet] = useState<FleetSettings>(DEFAULT_FLEET);
  const [security, setSecurity] = useState<SecuritySettings>(DEFAULT_SECURITY);
  const [isLoading, setIsLoading] = useState(true);
  const { setTheme } = useTheme();

  useEffect(() => {
    const loadSettings = () => {
      setAppearance(loadAppearance());
    };

    loadSettings();

    const savedFleet = localStorage.getItem('transitops_fleet_settings');
    const savedSec = localStorage.getItem('transitops_security_settings');
    if (savedFleet) setFleet(JSON.parse(savedFleet));
    if (savedSec) setSecurity(JSON.parse(savedSec));

    setIsLoading(false);

    window.addEventListener('transitops_appearance_changed', loadSettings);
    return () => window.removeEventListener('transitops_appearance_changed', loadSettings);
  }, []);

  const updateAppearance = async (data: Partial<AppearanceSettings>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const updated = persistAppearance(data, setTheme);
    setAppearance(updated);
    toast.success('Visual configurations updated');
    setIsLoading(false);
    return true;
  };

  const updateFleetSettings = async (data: Partial<FleetSettings>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const updated = { ...fleet, ...data };
    setFleet(updated);
    localStorage.setItem('transitops_fleet_settings', JSON.stringify(updated));
    toast.success('Fleet roster constants updated successfully!');
    setIsLoading(false);
    return true;
  };

  const updateSecuritySettings = async (data: Partial<SecuritySettings>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const updated = { ...security, ...data };
    setSecurity(updated);
    localStorage.setItem('transitops_security_settings', JSON.stringify(updated));
    toast.success('Security enforcement criteria saved.');
    setIsLoading(false);
    return true;
  };

  return {
    appearance,
    fleet,
    security,
    isLoading,
    updateAppearance,
    updateFleetSettings,
    updateSecuritySettings,
  };
}

export default useSettings;
