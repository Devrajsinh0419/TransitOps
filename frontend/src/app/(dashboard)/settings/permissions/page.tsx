'use client';

import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { SettingsHeader, SettingsSidebar, PermissionMatrix, SettingsSkeleton } from '@/components/settings';

export default function PermissionsSettingsPage() {
  const { permissions, isLoading, updatePermission, saveAllPermissions } = usePermissions();

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Access Permissions" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1">
          <PermissionMatrix
            permissions={permissions}
            onToggle={updatePermission}
            onSave={saveAllPermissions}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
