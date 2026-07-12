'use client';

import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { SettingsHeader, SettingsSidebar, ProfileCard, ProfileForm, SettingsSkeleton } from '@/components/settings';

export default function ProfileSettingsPage() {
  const { profile, isLoading, updateProfile } = useProfile();

  if (isLoading || !profile) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="My Profile" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1 space-y-6">
          <ProfileCard profile={profile} />
          
          <ProfileForm
            initialData={profile}
            onSave={updateProfile}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
