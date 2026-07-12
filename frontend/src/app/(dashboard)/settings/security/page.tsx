'use client';

import React from 'react';
import { SettingsHeader, SettingsSidebar, SecurityCard } from '@/components/settings';

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Sign-in & Password" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1">
          <SecurityCard />
        </div>
      </div>
    </div>
  );
}
