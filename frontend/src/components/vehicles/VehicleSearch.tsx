'use client';

import React from 'react';
import { Search } from 'lucide-react';

export interface VehicleSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function VehicleSearch({ value, onChange }: VehicleSearchProps) {
  return (
    <div className="relative w-full sm:w-64 select-none">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
      <input
        type="text"
        placeholder="Search vehicle registry..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-9 pl-9.5 pr-3 text-xs bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-soft"
      />
    </div>
  );
}

export default VehicleSearch;
