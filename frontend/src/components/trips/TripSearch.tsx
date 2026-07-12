'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../forms/Input';

interface TripSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TripSearch({ value, onChange }: TripSearchProps) {
  return (
    <div className="relative w-full max-w-md select-none text-left">
      <Input
        type="text"
        placeholder="Search trip number, name, driver, source or destination..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-9 text-xs border-border/60 placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 rounded-lg w-full bg-background"
        leftIcon={<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/75" />}
      />
    </div>
  );
}

export default TripSearch;
