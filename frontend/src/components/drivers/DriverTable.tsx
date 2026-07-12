'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DriverStatusBadge } from './DriverStatusBadge';
import { LicenseStatusBadge } from './LicenseStatusBadge';
import { DriverAvatar } from './DriverAvatar';
import { DriverActions } from './DriverActions';
import { Driver } from '@/types/driver';
import { Star, ShieldAlert } from 'lucide-react';

export interface DriverTableProps {
  drivers: Driver[];
  onSuspend: (id: string) => void;
  onActivate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DriverTable({ drivers, onSuspend, onActivate, onDelete }: DriverTableProps) {
  const router = useRouter();

  const getSafetyScoreBadge = (score: number) => {
    let color = 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400';
    if (score < 80) {
      color = 'text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-400';
    } else if (score < 90) {
      color = 'text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400';
    }

    return (
      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
        <Star className="h-3 w-3 fill-current shrink-0" />
        {score}
      </span>
    );
  };

  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-background shadow-sm select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-border/50 bg-muted/20 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="py-3.5 px-4 w-[60px]">Avatar</th>
              <th className="py-3.5 px-4">Driver Name</th>
              <th className="py-3.5 px-4 w-[110px]">Employee ID</th>
              <th className="py-3.5 px-4 w-[130px]">License Number</th>
              <th className="py-3.5 px-4 w-[120px]">Category</th>
              <th className="py-3.5 px-4 w-[130px]">Phone Number</th>
              <th className="py-3.5 px-4">Assigned Vehicle</th>
              <th className="py-3.5 px-4 w-[120px]">Status</th>
              <th className="py-3.5 px-4 w-[90px]">Safety</th>
              <th className="py-3.5 px-4 w-[130px]">Compliance</th>
              <th className="py-3.5 px-4 w-[100px]">Joined</th>
              <th className="py-3.5 px-4 w-[60px] text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {drivers.map((driver) => (
              <tr
                key={driver.id}
                onClick={() => router.push(`/drivers/${driver.id}`)}
                className="hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                {/* Avatar */}
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <DriverAvatar name={driver.name} avatarUrl={driver.avatarUrl} status={driver.status} size="sm" />
                </td>

                {/* Name */}
                <td className="py-3 px-4 font-bold text-foreground group-hover:text-primary transition-colors">
                  {driver.name}
                </td>

                {/* Employee ID */}
                <td className="py-3 px-4 font-mono font-bold text-muted-foreground">
                  {driver.employeeId}
                </td>

                {/* License Number */}
                <td className="py-3 px-4 font-mono text-muted-foreground">
                  {driver.licenseNumber}
                </td>

                {/* Category */}
                <td className="py-3 px-4 font-medium text-foreground">
                  {driver.licenseCategory}
                </td>

                {/* Phone */}
                <td className="py-3 px-4 text-muted-foreground">
                  {driver.phone}
                </td>

                {/* Assigned Vehicle */}
                <td className="py-3 px-4">
                  {driver.assignedVehicleName ? (
                    <span className="font-semibold text-foreground bg-muted/60 border border-border/30 px-2 py-0.5 rounded">
                      {driver.assignedVehicleName}
                    </span>
                  ) : (
                    <span className="text-muted-foreground italic font-medium">Unassigned</span>
                  )}
                </td>

                {/* Current Status */}
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <DriverStatusBadge status={driver.status} />
                </td>

                {/* Safety Score */}
                <td className="py-3 px-4">
                  {getSafetyScoreBadge(driver.safetyScore)}
                </td>

                {/* License Expiry */}
                <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                  <LicenseStatusBadge expiryDate={driver.licenseExpiry} />
                </td>

                {/* Created Date */}
                <td className="py-3 px-4 text-muted-foreground font-medium">
                  {driver.createdDate}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <DriverActions
                    driverId={driver.id}
                    driverName={driver.name}
                    isSuspended={driver.status === 'suspended'}
                    onSuspend={() => onSuspend(driver.id)}
                    onActivate={() => onActivate(driver.id)}
                    onDelete={() => onDelete(driver.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DriverTable;
