'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Users, UserCheck, UserMinus, AlertTriangle } from 'lucide-react';
import { Driver } from '@/types/driver';

export interface DriverStatsProps {
  drivers: Driver[];
}

export function DriverStats({ drivers }: DriverStatsProps) {
  const total = drivers.length;
  
  const available = drivers.filter((d) => d.status === 'available').length;
  const onTrip = drivers.filter((d) => d.status === 'on_trip').length;
  const suspended = drivers.filter((d) => d.status === 'suspended').length;
  
  const complianceAlerts = drivers.filter((d) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(d.licenseExpiry);
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 60;
  }).length;

  const stats = [
    {
      label: 'Total Drivers',
      value: total,
      icon: Users,
      color: 'text-primary bg-primary/10 border-primary/20',
      description: 'Active personnel directory',
    },
    {
      label: 'Available Drivers',
      value: available,
      icon: UserCheck,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400',
      description: 'Ready for route assignment',
    },
    {
      label: 'Drivers On Trip',
      value: onTrip,
      icon: UserCheck,
      color: 'text-sky-600 bg-sky-500/10 border-sky-500/20 dark:text-sky-400',
      description: 'Currently dispatching cargo',
    },
    {
      label: 'Expiring Licenses',
      value: complianceAlerts,
      icon: AlertTriangle,
      color: complianceAlerts > 0
        ? 'text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-400'
        : 'text-zinc-500 bg-muted border-border/50',
      description: 'Compliance renewals required',
    },
    {
      label: 'Suspended Drivers',
      value: suspended,
      icon: UserMinus,
      color: 'text-orange-600 bg-orange-500/10 border-orange-500/20 dark:text-orange-400',
      description: 'Compliance holds active',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 select-none">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="p-4 flex flex-col justify-between border-border/50 hover:shadow-sm transition-all text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${stat.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">{stat.value}</h3>
              <p className="text-[9px] text-muted-foreground font-semibold mt-0.5 leading-none">{stat.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default DriverStats;
