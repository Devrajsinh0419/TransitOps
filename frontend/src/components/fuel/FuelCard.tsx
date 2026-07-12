'use client';

import React from 'react';
import { FuelLog } from '@/types/fuel';
import { Button } from '../ui/Button';
import { Calendar, Fuel, MapPin, DollarSign, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/helpers';

interface FuelCardProps {
  log: FuelLog;
}

export function FuelCard({ log }: FuelCardProps) {
  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 hover:shadow-md hover:border-border transition-all select-none text-left">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-muted-foreground/80 tracking-wider">
          {log.fuelLogId}
        </span>
        <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
          <Calendar className="h-3.5 w-3.5" /> {log.date}
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-extrabold text-foreground flex items-center gap-1">
          <Fuel className="h-4 w-4 text-primary" /> {log.fuelType}
        </h4>
        <p className="text-[10px] text-muted-foreground leading-normal">
          Refueled <span className="font-semibold text-foreground">{log.quantity.toLocaleString('en-IN')} Liters</span> at{' '}
          <span className="font-semibold text-foreground">{formatCurrency(log.pricePerLiter)}/L</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Vehicle</span>
          <span className="font-semibold text-foreground truncate block">{log.vehicleRegistration}</span>
          <span className="text-[9px] block truncate">{log.vehicleName}</span>
        </div>
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Driver</span>
          <span className="font-semibold text-foreground flex items-center gap-1">
            <User className="h-3 w-3" /> {log.driverName}
          </span>
          <span className="text-[9px] block truncate flex items-center gap-1 mt-0.5">
            Odo: {log.odometer.toLocaleString('en-IN')} km
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/20">
        <div className="text-[9px] text-muted-foreground flex items-center gap-1 truncate max-w-[150px]">
          <MapPin className="h-3.5 w-3.5" /> {log.fuelStation}
        </div>
        <Link href={`/fuel/${log.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-[10px] px-3 font-bold hover:bg-muted text-primary rounded-lg"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Log Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FuelCard;
