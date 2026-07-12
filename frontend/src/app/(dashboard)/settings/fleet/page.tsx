'use client';

import React from 'react';
import { SettingsHeader, SettingsSidebar, FleetConfiguration } from '@/components/settings';

export default function FleetSettingsPage() {
  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Fleet Configurations" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1">
          <FleetConfiguration />
        </div>
      </div>
    </div>
  );
}
