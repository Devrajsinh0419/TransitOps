'use client';

import { useState, useEffect } from 'react';
import { Profile } from '@/types/settings';
import { settingsService } from '@/services/settings.service';
import { authStore } from '@/store/auth.store';
import { toast } from 'sonner';

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await settingsService.getProfile();
      setProfile(data);
    } catch (e: any) {
      toast.error('Failed to load profile details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (data: Partial<Profile>): Promise<boolean> => {
    setIsLoading(true);
    try {
      const updated = await settingsService.updateProfile(data);
      setProfile(updated);
      
      const currentUser = authStore.getState().user;
      if (currentUser) {
        const newName = `${updated.firstName || ''} ${updated.lastName || ''}`.trim();
        authStore.setUser({
          ...currentUser,
          email: updated.email,
          name: newName || currentUser.name
        });
      }
      toast.success('Your profile has been updated successfully!');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to update profile details';
      toast.error('Update Failed', { description: msg });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data: Record<string, string>): Promise<boolean> => {
    setIsLoading(true);
    try {
      await settingsService.changePassword(data);
      toast.success('Your password has been changed successfully!');
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to update password';
      toast.error('Password Update Failed', { description: msg });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    updateProfile,
    changePassword,
  };
}

export default useProfile;
