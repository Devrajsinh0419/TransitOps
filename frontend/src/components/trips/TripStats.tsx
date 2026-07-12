'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Truck, Navigation, CheckCircle, AlertOctagon, TrendingUp } from 'lucide-react';
import { Trip } from '@/types/trip';
import { formatCurrency } from '@/lib/helpers';

interface TripStatsProps {
  trips: Trip[];
}

export function TripStats({ trips }: TripStatsProps) {
  const total = trips.length;
  const inTransit = trips.filter((t) => t.status === 'in_progress' || t.status === 'dispatched').length;
  const completed = trips.filter((t) => t.status === 'completed').length;
  const delayed = trips.filter((t) => t.status === 'delayed').length;
  const totalRevenue = trips
    .filter((t) => t.status !== 'cancelled')
    .reduce((sum, t) => sum + (t.actualRevenue || t.expectedRevenue), 0);

  const stats = [
    {
      label: 'Total Trips',
      value: total,
      icon: Truck,
      color: 'text-primary bg-primary/10 border-primary/20',
      description: 'Total registered manifests',
    },
    {
      label: 'In Transit',
      value: inTransit,
      icon: Navigation,
      color: 'text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-400',
      description: 'Active on road wheels',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400',
      description: 'Delivered cargo safely',
    },
    {
      label: 'Revenue Fleet',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20 dark:text-indigo-400',
      description: 'Total revenue expected/billed',
    },
    {
      label: 'Delayed Trips',
      value: delayed,
      icon: AlertOctagon,
      color: 'text-rose-600 bg-rose-500/10 border-rose-500/20 dark:text-rose-400',
      description: 'Dispatched compliance holds',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 select-none">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="p-4 flex flex-col justify-between border-border/50 hover:shadow-sm transition-all text-left animate-fade-in">
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

export default TripStats;
