'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { User, Phone, ShieldCheck, AlertOctagon } from 'lucide-react';
import { DriverAvatar } from '../drivers/DriverAvatar';

interface TripDriverCardProps {
  driver: {
    name: string;
    avatarUrl?: string;
    phone: string;
    licenseExpiry: string;
    safetyScore: number;
    status: string;
  } | null;
}

export function TripDriverCard({ driver }: TripDriverCardProps) {
  if (!driver) {
    return (
      <Card className="p-5 border border-dashed border-border/70 flex flex-col items-center justify-center min-h-[140px] text-center select-none bg-muted/5">
        <User className="h-6 w-6 text-muted-foreground/50 mb-1.5" />
        <p className="text-xs font-semibold text-muted-foreground">No driver selected yet</p>
        <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-0.5">Please choose an active certified operator.</p>
      </Card>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(driver.licenseExpiry);
  const isLicenseExpired = expiry < today;

  return (
    <Card className="p-4 border border-border/50 bg-card select-none text-left space-y-3 shadow-inner hover:shadow-sm transition-all">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2.5">
          <DriverAvatar name={driver.name} avatarUrl={driver.avatarUrl} size="md" />
          <div>
            <h4 className="text-xs font-extrabold text-foreground">{driver.name}</h4>
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground font-semibold">
              <Phone className="h-2.5 w-2.5" />
              <span>{driver.phone}</span>
            </div>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
            driver.status === 'available'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          }`}
        >
          {driver.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold font-mono">License Expiry</span>
          <p className={`text-xs font-bold ${isLicenseExpired ? 'text-rose-600 font-extrabold' : 'text-foreground'}`}>
            {driver.licenseExpiry}
          </p>
        </div>
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold font-mono">Safety Score</span>
          <p className="text-xs font-bold text-foreground flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            {driver.safetyScore} pts
          </p>
        </div>
      </div>

      {isLicenseExpired && (
        <div className="p-2 bg-rose-500/5 border border-rose-500/10 rounded-lg flex items-start gap-1.5 mt-2">
          <AlertOctagon className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-[9px] text-rose-600 font-semibold leading-relaxed">
            CRITICAL: Driver CDL has expired! Compliance laws prohibit dispatching this trip.
          </p>
        </div>
      )}
    </Card>
  );
}

export default TripDriverCard;
