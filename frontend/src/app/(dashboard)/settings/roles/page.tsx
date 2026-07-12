'use client';

import React from 'react';
import { useRoles } from '@/hooks/useRoles';
import { SettingsHeader, SettingsSidebar, RoleCard, SettingsSkeleton } from '@/components/settings';
import { toast } from 'sonner';

export default function RolesSettingsPage() {
  const { roles, isLoading } = useRoles();

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  const handleEditRole = (role: any) => {
    toast.info(`Configuring permission bindings for ${role.name}`);
  };

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="System Roles" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-muted/20 border border-border/30 rounded-xl text-xs font-semibold text-muted-foreground leading-normal">
            To customize individual module actions viewable by these security groups, navigate to the <span className="text-primary font-black uppercase">Access Permissions</span> matrix settings page.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <RoleCard key={role.id} role={role} onEditClick={handleEditRole} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
