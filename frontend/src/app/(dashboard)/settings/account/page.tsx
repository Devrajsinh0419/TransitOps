'use client';

import React from 'react';
import { SettingsHeader, SettingsSidebar, AccountCard } from '@/components/settings';

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Account Security" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1">
          <AccountCard />
        </div>
      </div>
    </div>
  );
}
