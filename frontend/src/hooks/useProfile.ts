'use client';

import { useState, useEffect } from 'react';
import { Profile } from '@/types/settings';
import { toast } from 'sonner';

const DEFAULT_PROFILE: Profile = {
  firstName: 'Sarah',
  lastName: 'Jenkins',
  email: 'sjenkins@transitops.com',
  phone: '+1 (555) 912-3847',
  role: 'Fleet Manager',
  department: 'Operations',
  employeeId: 'EMP-9921',
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  bio: 'Lead Operations Supervisor managing dispatching schedules, fleet routing compliance, and fuel logs.',
  timezone: 'America/Chicago',
  language: 'en',
  address: '402 Oak Ridge Dr, Houston, TX 77002',
  emergencyContact: 'John Jenkins (+1 555-882-9912)',
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In-memory simulation
    const saved = localStorage.getItem('transitops_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      setProfile(DEFAULT_PROFILE);
      localStorage.setItem('transitops_profile', JSON.stringify(DEFAULT_PROFILE));
    }
    setIsLoading(false);
  }, []);

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (profile) {
      const updated = { ...profile, ...data };
      setProfile(updated);
      localStorage.setItem('transitops_profile', JSON.stringify(updated));
      toast.success('Your profile has been updated successfully!');
    }
    
    setIsLoading(false);
    return true;
  };

  return {
    profile,
    isLoading,
    updateProfile,
  };
}

export default useProfile;
