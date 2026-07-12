'use client';

import React from 'react';
import { Truck, CheckCircle2, Wrench, Ban } from 'lucide-react';
import { Card } from '../cards/Card';
import { Vehicle } from '@/types/vehicle';

export interface VehicleStatsProps {
  vehicles: Vehicle[];
}

export function VehicleStats({ vehicles }: VehicleStatsProps) {
  const total = vehicles.length;
  const available = vehicles.filter((v) => v.status === 'available').length;
  const maintenance = vehicles.filter((v) => v.status === 'maintenance').length;
  const inactive = vehicles.filter((v) => v.status === 'inactive' || v.status === 'retired').length;

  const stats = [
    {
      label: 'Total Fleet',
      value: total,
      icon: Truck,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Registered logistics transport assets',
    },
    {
      label: 'Available',
      value: available,
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Active and ready to dispatch',
    },
    {
      label: 'In Maintenance',
      value: maintenance,
      icon: Wrench,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Shop work or inspections scheduled',
    },
    {
      label: 'Inactive / Retired',
      value: inactive,
      icon: Ban,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      description: 'Out of service or decommissioned',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="p-4 flex items-center gap-4 text-left hover:shadow-soft transition-shadow">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.color}`}>
              <Icon className="h-5.5 w-5.5" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <h3 className="text-xl font-extrabold text-foreground tracking-tight leading-none">
                {stat.value}
              </h3>
              <p className="text-[9px] text-muted-foreground/80 truncate font-medium">
                {stat.description}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default VehicleStats;
