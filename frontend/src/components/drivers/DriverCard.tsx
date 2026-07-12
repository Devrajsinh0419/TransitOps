'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../cards/Card';
import { DriverAvatar } from './DriverAvatar';
import { DriverStatusBadge } from './DriverStatusBadge';
import { LicenseStatusBadge } from './LicenseStatusBadge';
import { DriverActions } from './DriverActions';
import { Driver } from '@/types/driver';
import { Star, Truck } from 'lucide-react';

export interface DriverCardProps {
  driver: Driver;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
}

export function DriverCard({ driver, onSuspend, onActivate, onDelete }: DriverCardProps) {
  const router = useRouter();

  const getSafetyColor = (score: number) => {
    if (score < 80) return 'text-rose-500';
    if (score < 90) return 'text-amber-500';
    return 'text-emerald-500';
  };

  return (
    <Card
      onClick={() => router.push(`/drivers/${driver.id}`)}
      className="p-5 space-y-4 hover:shadow-md hover:border-primary/20 transition-all select-none text-left cursor-pointer group"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex gap-3 min-w-0">
          <div onClick={(e) => e.stopPropagation()}>
            <DriverAvatar name={driver.name} avatarUrl={driver.avatarUrl} status={driver.status} size="md" />
          </div>
          <div className="space-y-1 min-w-0">
            <h4 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors truncate">
              {driver.name}
            </h4>
            <p className="text-[10px] text-muted-foreground font-mono font-bold">
              {driver.employeeId} • {driver.licenseCategory}
            </p>
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <DriverActions
            driverId={driver.id}
            driverName={driver.name}
            isSuspended={driver.status === 'suspended'}
            onSuspend={onSuspend}
            onActivate={onActivate}
            onDelete={onDelete}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 pt-2.5 border-t border-border/50">
        {/* Vehicle Assignment */}
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none block">Vehicle</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <Truck className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className="text-xs font-semibold text-foreground truncate">
              {driver.assignedVehicleName || 'Unassigned'}
            </span>
          </div>
        </div>

        {/* Safety Score */}
        <div className="space-y-0.5">
          <span className="text-[9px] font-bold text-muted-foreground uppercase leading-none block">Safety</span>
          <div className="flex items-center gap-1.5 pt-0.5">
            <Star className={`h-3.5 w-3.5 fill-current shrink-0 ${getSafetyColor(driver.safetyScore)}`} />
            <span className="text-xs font-bold text-foreground">
              {driver.safetyScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Compliance / Status row */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/40 text-[10px]">
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <span className="text-muted-foreground font-semibold">License:</span>
          <LicenseStatusBadge expiryDate={driver.licenseExpiry} className="scale-90 origin-left" />
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <DriverStatusBadge status={driver.status} className="scale-90 origin-right" />
        </div>
      </div>
    </Card>
  );
}

export default DriverCard;
