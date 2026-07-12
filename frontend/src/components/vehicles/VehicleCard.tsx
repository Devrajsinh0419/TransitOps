'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { VehicleStatusBadge } from './VehicleStatusBadge';
import { VehicleActions } from './VehicleActions';
import { Vehicle } from '@/types/vehicle';
import { Milestone, Compass, Landmark, CalendarRange, Trash2, Archive } from 'lucide-react';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}

export function VehicleCard({
  vehicle,
  onArchive,
  onRestore,
  onDelete,
  onDuplicate,
}: VehicleCardProps) {
  const formattedType = vehicle.type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Card className="p-4 space-y-4 hover:shadow-md hover:border-primary/20 transition-all select-none text-left">
      {/* Title block */}
      <div className="flex justify-between items-start gap-2">
        <div className="space-y-1 min-w-0">
          <span className="text-[10px] font-bold text-primary font-mono bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded">
            {vehicle.registrationNumber}
          </span>
          <h4 className="text-sm font-extrabold text-foreground truncate mt-1">{vehicle.name}</h4>
          <p className="text-[10px] text-muted-foreground font-semibold">{formattedType} • {vehicle.manufacturer}</p>
        </div>

        <VehicleActions
          vehicleId={vehicle.id}
          vehicleName={vehicle.name}
          registrationNumber={vehicle.registrationNumber}
          isArchived={vehicle.archived}
          onArchive={onArchive}
          onRestore={onRestore}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3.5 pt-1 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Milestone className="h-3.5 w-3.5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[8px] font-bold text-muted-foreground uppercase leading-none">Odometer</p>
            <p className="text-[11px] font-bold text-foreground truncate">{vehicle.currentOdometer.toLocaleString()} mi</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Landmark className="h-3.5 w-3.5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[8px] font-bold text-muted-foreground uppercase leading-none">Cost</p>
            <p className="text-[11px] font-bold text-foreground truncate">${vehicle.purchaseCost.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Compass className="h-3.5 w-3.5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[8px] font-bold text-muted-foreground uppercase leading-none">Transmission</p>
            <p className="text-[11px] font-bold text-foreground capitalize truncate">{vehicle.transmission}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <CalendarRange className="h-3.5 w-3.5" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <p className="text-[8px] font-bold text-muted-foreground uppercase leading-none">Year</p>
            <p className="text-[11px] font-bold text-foreground truncate">{vehicle.year}</p>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-between items-center pt-2 border-t border-border/50">
        <VehicleStatusBadge status={vehicle.status} />
        <span className="text-[9px] font-semibold text-muted-foreground">
          Loc: <span className="text-foreground/80 font-bold">{vehicle.garageLocation.split(' ')[0]}</span>
        </span>
      </div>
    </Card>
  );
}

export default VehicleCard;
