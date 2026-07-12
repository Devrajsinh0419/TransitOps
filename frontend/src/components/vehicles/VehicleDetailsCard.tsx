'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Landmark, Settings2, ShieldCheck, Truck } from 'lucide-react';
import { VehicleDetails } from '@/types/vehicle';

import { formatCurrency } from '@/lib/helpers';

export interface VehicleDetailsCardProps {
  vehicle: VehicleDetails;
}

export function VehicleDetailsCard({ vehicle }: VehicleDetailsCardProps) {
  const basicInfo: { label: string; value: string | number; className?: string }[] = [
    { label: 'Vehicle Name', value: vehicle.name },
    { label: 'Registration Number', value: vehicle.registrationNumber },
    { label: 'Manufacturer', value: vehicle.manufacturer },
    { label: 'Model', value: vehicle.model },
    { label: 'Year', value: vehicle.year },
    { label: 'VIN Number', value: vehicle.vinNumber, className: 'font-mono' },
  ];

  const specs: { label: string; value: string | number; className?: string }[] = [
    { label: 'Capacity (kg)', value: `${vehicle.capacity.toLocaleString('en-IN')} kg` },
    { label: 'Fuel Type', value: vehicle.fuelType, className: 'capitalize' },
    { label: 'Transmission', value: vehicle.transmission, className: 'capitalize' },
    { label: 'Color', value: vehicle.color },
  ];

  const financial: { label: string; value: string | number; className?: string }[] = [
    { label: 'Purchase Date', value: vehicle.purchaseDate },
    { label: 'Purchase Cost', value: formatCurrency(vehicle.purchaseCost) },
    { label: 'Insurance Expiration', value: vehicle.insuranceExpiry },
    { label: 'Registration Expiration', value: vehicle.registrationExpiry },
  ];

  return (
    <div className="space-y-6 text-left select-none">
      {/* 1. Basic Info Card */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Truck className="h-4.5 w-4.5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Basic Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {basicInfo.map((info, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">{info.label}</p>
              <p className={`text-xs font-semibold text-foreground ${info.className || ''}`}>{info.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. Specs Card */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Settings2 className="h-4.5 w-4.5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Specifications</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {specs.map((info, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">{info.label}</p>
              <p className={`text-xs font-semibold text-foreground ${info.className || ''}`}>{info.value}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Financial Card */}
      <Card className="p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Landmark className="h-4.5 w-4.5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Financial & Terms</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {financial.map((info, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">{info.label}</p>
              <p className={`text-xs font-semibold text-foreground ${info.className || ''}`}>{info.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default VehicleDetailsCard;
