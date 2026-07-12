'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { VehicleStatusBadge } from './VehicleStatusBadge';
import { VehicleDetails } from '@/types/vehicle';
import { Button } from '../ui/Button';
import { Edit2, Archive, Trash2, Milestone, Wrench, Landmark, Droplet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface VehicleOverviewProps {
  vehicle: VehicleDetails;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
}

export function VehicleOverview({
  vehicle,
  onArchive,
  onRestore,
  onDelete,
}: VehicleOverviewProps) {
  const router = useRouter();
  const formattedType = vehicle.type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const quickStats = [
    { label: 'Completed Trips', value: vehicle.tripsCount, icon: Milestone, color: 'text-emerald-500' },
    { label: 'Shop Tickets', value: vehicle.maintenanceCount, icon: Wrench, color: 'text-amber-500' },
    { label: 'Total Expense', value: `$${vehicle.totalExpenses.toLocaleString()}`, icon: Landmark, color: 'text-blue-500' },
    { label: 'Fuel Index', value: `${vehicle.fuelEfficiency} MPG`, icon: Droplet, color: 'text-indigo-500' },
  ];

  return (
    <Card className="p-6 text-left select-none space-y-6 overflow-hidden relative">
      {/* Background soft blur decoration */}
      <div className="absolute top-0 right-0 h-44 w-44 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Name and Status */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-extrabold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              {vehicle.registrationNumber}
            </span>
            <VehicleStatusBadge status={vehicle.status} />
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">{vehicle.name}</h2>
          <p className="text-xs text-muted-foreground font-semibold">
            {formattedType} • {vehicle.manufacturer} {vehicle.model} ({vehicle.year}) • Odo: {vehicle.currentOdometer.toLocaleString()} mi
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/vehicles/${vehicle.id}/edit`)}
            leftIcon={<Edit2 className="h-3.5 w-3.5" />}
            className="cursor-pointer font-bold text-xs"
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={vehicle.archived ? onRestore : onArchive}
            leftIcon={<Archive className="h-3.5 w-3.5" />}
            className="cursor-pointer font-bold text-xs"
          >
            {vehicle.archived ? 'Restore' : 'Archive'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            className="cursor-pointer font-bold text-xs"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-3 border border-border bg-muted/15 rounded-xl space-y-1.5 hover:bg-muted/35 transition-colors">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-base font-extrabold text-foreground leading-none">{stat.value}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default VehicleOverview;
