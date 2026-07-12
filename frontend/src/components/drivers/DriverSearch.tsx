'use client';

import React from 'react';
import { Input } from '../forms/Input';
import { Search } from 'lucide-react';

export interface DriverSearchProps {
  value: string;
  onChange: (val: string) => void;
}

export function DriverSearch({ value, onChange }: DriverSearchProps) {
  return (
    <div className="relative w-full max-w-sm select-none">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search name, EMP ID, license..."
        className="pl-9 h-9.5 border-border/60 focus-visible:ring-primary rounded-lg text-xs"
      />
    </div>
  );
}

export default DriverSearch;
