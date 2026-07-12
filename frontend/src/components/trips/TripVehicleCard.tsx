'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Truck, Scale, Shield, AlertTriangle } from 'lucide-react';

interface TripVehicleCardProps {
  vehicle: {
    name: string;
    registration: string;
    capacity: number;
    odometer: number;
    status: string;
  } | null;
  cargoWeight?: number;
}

export function TripVehicleCard({ vehicle, cargoWeight }: TripVehicleCardProps) {
  if (!vehicle) {
    return (
      <Card className="p-5 border border-dashed border-border/70 flex flex-col items-center justify-center min-h-[140px] text-center select-none bg-muted/5">
        <Truck className="h-6 w-6 text-muted-foreground/50 mb-1.5" />
        <p className="text-xs font-semibold text-muted-foreground">No vehicle selected yet</p>
        <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-0.5">Please choose an active available fleet asset.</p>
      </Card>
    );
  }

  const isOverweight = cargoWeight ? cargoWeight > vehicle.capacity : false;

  return (
    <Card className="p-4 border border-border/50 bg-card select-none text-left space-y-3 shadow-inner hover:shadow-sm transition-all">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Truck className="h-4.5 w-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-foreground">{vehicle.registration}</h4>
            <p className="text-[10px] text-muted-foreground">{vehicle.name}</p>
          </div>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
            vehicle.status === 'available'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
          }`}
        >
          {vehicle.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Max Cargo Capacity</span>
          <p className="text-xs font-bold text-foreground flex items-center gap-1">
            <Scale className="h-3.5 w-3.5 text-muted-foreground/80" />
            {vehicle.capacity.toLocaleString()} lbs
          </p>
        </div>
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Current Odometer</span>
          <p className="text-xs font-bold text-foreground">
            {vehicle.odometer.toLocaleString()} mi
          </p>
        </div>
      </div>

      {isOverweight && (
        <div className="p-2 bg-rose-500/5 border border-rose-500/10 rounded-lg flex items-start gap-1.5 mt-2">
          <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-[9px] text-rose-600 font-semibold leading-relaxed">
            CRITICAL: Selected cargo weight ({cargoWeight?.toLocaleString()} lbs) exceeds vehicle capacity limits! Please assign a larger asset.
          </p>
        </div>
      )}
    </Card>
  );
}

export default TripVehicleCard;
