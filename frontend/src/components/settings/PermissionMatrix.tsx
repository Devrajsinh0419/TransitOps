'use client';

import React from 'react';
import { Permission } from '@/types/settings';
import { Button } from '../ui/Button';
import { Shield, Save, Check, X, RotateCcw } from 'lucide-react';

interface PermissionMatrixProps {
  permissions: Permission[];
  onToggle: (moduleName: string, action: keyof Omit<Permission, 'module'>, val: boolean) => void;
  onSave: () => Promise<boolean>;
  isLoading: boolean;
}

export function PermissionMatrix({
  permissions,
  onToggle,
  onSave,
  isLoading,
}: PermissionMatrixProps) {
  const actions: { key: keyof Omit<Permission, 'module'>; label: string }[] = [
    { key: 'view', label: 'View' },
    { key: 'create', label: 'Create' },
    { key: 'edit', label: 'Edit' },
    { key: 'delete', label: 'Delete' },
    { key: 'export', label: 'Export' },
    { key: 'approve', label: 'Approve' },
  ];

  return (
    <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6 select-none text-left w-full">
      <div className="flex justify-between items-center pb-2 border-b border-border/30">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-primary" />
          Access Control Matrix
        </h3>
      </div>

      {/* Permissions grid / table */}
      <div className="overflow-x-auto border border-border/40 rounded-xl">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-muted/40 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
              <th className="p-3">Module Name</th>
              {actions.map((act) => (
                <th key={act.key} className="p-3 text-center">
                  {act.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm) => (
              <tr key={perm.module} className="border-b border-border/30 last:border-0 hover:bg-muted/10">
                <td className="p-3 font-extrabold text-foreground uppercase text-[10px] tracking-wide">
                  {perm.module}
                </td>
                {actions.map((act) => {
                  const val = !!perm[act.key];
                  return (
                    <td key={act.key} className="p-3 text-center align-middle">
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={(e) => onToggle(perm.module, act.key, e.target.checked)}
                        className="rounded border-border/60 text-primary focus:ring-0 cursor-pointer h-4 w-4"
                        aria-label={`Toggle ${act.label} permission for ${perm.module}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sync Matrix Actions */}
      <div className="flex justify-end pt-4 border-t border-border/20">
        <Button
          onClick={onSave}
          isLoading={isLoading}
          className="h-10 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-6 gap-1.5 shadow-sm"
          leftIcon={<Save className="h-4 w-4" />}
        >
          Synchronize Permissions
        </Button>
      </div>
    </div>
  );
}

export default PermissionMatrix;
