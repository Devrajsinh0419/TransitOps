'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Badge } from '../badges/Badge';
import { Award, UserCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LicenseAlert {
  id: string;
  driver: string;
  licenseNumber: string;
  expiryDate: string;
  daysLeft: number;
}

export interface LicenseAlertCardProps {
  alerts?: LicenseAlert[];
  isLoading?: boolean;
}

const mockAlerts: LicenseAlert[] = [
  {
    id: 'l-1',
    driver: 'Marcus Miller',
    licenseNumber: 'CDL-TX89201',
    expiryDate: 'Jul 24, 2026',
    daysLeft: 12,
  },
  {
    id: 'l-2',
    driver: 'David Richardson',
    licenseNumber: 'CDL-AZ44912',
    expiryDate: 'Aug 02, 2026',
    daysLeft: 21,
  },
  {
    id: 'l-3',
    driver: 'Robert Jenkins',
    licenseNumber: 'CDL-CA00293',
    expiryDate: 'Sep 15, 2026',
    daysLeft: 65,
  },
];

export function LicenseAlertCard({
  alerts = mockAlerts,
  isLoading = false,
}: LicenseAlertCardProps) {
  if (isLoading) {
    return (
      <Card className="p-5 select-none space-y-4 animate-pulse">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="space-y-2.5">
          <div className="h-12 bg-muted rounded-lg"></div>
          <div className="h-12 bg-muted rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 select-none space-y-4">
      <div className="border-b border-border/60 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Driver Credentials</h3>
          <p className="text-[10px] text-muted-foreground">Driver licenses and safety audits nearing expiration</p>
        </div>
        <Award className="h-4.5 w-4.5 text-blue-500" />
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const isCritical = alert.daysLeft <= 15;
          return (
            <div
              key={alert.id}
              className="p-3 border border-border/80 bg-muted/15 rounded-xl flex items-start gap-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className={cn(
                'flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border',
                isCritical
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
              )}>
                {isCritical ? <ShieldAlert className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-foreground truncate">{alert.driver}</h4>
                  <Badge
                    variant={isCritical ? 'danger' : 'warning'}
                    className="text-[9px] px-1.5 py-0"
                  >
                    {isCritical ? 'critical' : 'warning'}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed truncate">
                  {alert.licenseNumber}
                </p>
                <div className="flex justify-between items-center pt-0.5 text-[9px] font-bold">
                  <span className={isCritical ? 'text-rose-500' : 'text-amber-600 dark:text-amber-400'}>
                    {alert.daysLeft} days remaining
                  </span>
                  <span className="text-muted-foreground/60">Expires {alert.expiryDate}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default LicenseAlertCard;
