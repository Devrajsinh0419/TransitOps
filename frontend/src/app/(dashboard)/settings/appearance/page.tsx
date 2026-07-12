'use client';

import React from 'react';
import { SettingsHeader, SettingsSidebar, AppearanceSettings } from '@/components/settings';

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Visual Theme" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1">
          <AppearanceSettings />
        </div>
      </div>
    </div>
  );
}
