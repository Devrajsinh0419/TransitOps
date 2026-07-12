'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Fuel, Landmark, Milestone, PiggyBank } from 'lucide-react';
import { FleetSummary } from '@/types/dashboard';
import { formatCurrency, formatDistance } from '@/lib/helpers';

export interface FleetSummaryCardProps {
  summary: FleetSummary | null;
  isLoading?: boolean;
}

export function FleetSummaryCard({ summary, isLoading = false }: FleetSummaryCardProps) {
  if (isLoading) {
    return (
      <Card className="p-5 select-none space-y-4 animate-pulse">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-14 bg-muted rounded-lg"></div>
          <div className="h-14 bg-muted rounded-lg"></div>
        </div>
      </Card>
    );
  }

  const data = summary || {
    averageFuelCost: 0,
    averageTripDistance: 0,
    maintenanceCost: 0,
    vehicleRoi: 0,
  };

  const metrics = [
    {
      label: 'Avg Fuel Cost',
      value: formatCurrency(data.averageFuelCost),
      description: 'Per active vehicle / month',
      icon: Fuel,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      label: 'Avg Trip Distance',
      value: formatDistance(data.averageTripDistance),
      description: 'Per route dispatch',
      icon: Milestone,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      label: 'Maintenance Cost',
      value: formatCurrency(data.maintenanceCost),
      description: 'Total active month spend',
      icon: Landmark,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      label: 'Vehicle ROI Index',
      value: `${data.vehicleRoi}%`,
      description: 'Capital utilization yield',
      icon: PiggyBank,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <Card className="p-5 select-none space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">Fleet Summary</h3>
        <p className="text-[10px] text-muted-foreground">General financial and operational averages</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              className="p-3 border border-border/80 bg-muted/20 hover:bg-muted/40 rounded-xl transition-colors space-y-2 text-left"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </span>
                <div className={`flex h-6.5 w-6.5 items-center justify-center rounded-lg border ${metric.color}`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-extrabold text-foreground tracking-tight">
                  {metric.value}
                </span>
                <p className="text-[9px] text-muted-foreground/80 font-medium leading-none">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default FleetSummaryCard;
