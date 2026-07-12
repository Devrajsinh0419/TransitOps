'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Package, Scale, DollarSign, ListOrdered } from 'lucide-react';

interface TripCargoCardProps {
  cargo: {
    type: string;
    weight: number;
    value: number;
    specialInstructions?: string;
  } | null;
}

export function TripCargoCard({ cargo }: TripCargoCardProps) {
  if (!cargo) {
    return (
      <Card className="p-5 border border-dashed border-border/70 flex flex-col items-center justify-center min-h-[140px] text-center select-none bg-muted/5">
        <Package className="h-6 w-6 text-muted-foreground/50 mb-1.5" />
        <p className="text-xs font-semibold text-muted-foreground">No cargo details specified</p>
        <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-0.5 font-semibold">Enter cargo type and payload weight.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 border border-border/50 bg-card select-none text-left space-y-3 shadow-inner hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
          <Package className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-foreground">Cargo Specifications</h4>
          <p className="text-[10px] text-muted-foreground">Payload values & security directives</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[10px]">
        {/* Cargo Type */}
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Freight Type</span>
          <p className="text-xs font-bold text-foreground truncate">{cargo.type}</p>
        </div>

        {/* Cargo Weight */}
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Gross Weight</span>
          <p className="text-xs font-bold text-foreground">
            {cargo.weight.toLocaleString()} lbs
          </p>
        </div>

        {/* Cargo Value */}
        <div className="space-y-0.5">
          <span className="text-muted-foreground uppercase font-semibold">Declared Value</span>
          <p className="text-xs font-bold text-foreground">
            ${cargo.value.toLocaleString()}
          </p>
        </div>
      </div>

      {cargo.specialInstructions && (
        <div className="pt-2 border-t border-border/30 text-[9px] text-muted-foreground">
          <span className="font-semibold block uppercase">Special Directives</span>
          <p className="text-[10px] text-amber-600 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 italic mt-0.5 leading-relaxed">
            "{cargo.specialInstructions}"
          </p>
        </div>
      )}
    </Card>
  );
}

export default TripCargoCard;
