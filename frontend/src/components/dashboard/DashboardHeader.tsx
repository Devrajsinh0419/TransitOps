'use client';

import React from 'react';
import { Search, Calendar, SlidersHorizontal } from 'lucide-react';
import { Breadcrumb } from '../navigation/Breadcrumb';

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onFilterToggle?: () => void;
  onSearchChange?: (val: string) => void;
}

export function DashboardHeader({
  title,
  subtitle,
  onFilterToggle,
  onSearchChange,
}: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/60 select-none">
      {/* Page Title & Breadcrumb path */}
      <div className="space-y-1">
        <Breadcrumb />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Date, Search & Filter Trigger block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
        {/* Date Display */}
        <div className="hidden xl:flex items-center gap-2 text-xs font-semibold text-muted-foreground border border-border bg-card px-3 py-1.5 rounded-lg shadow-soft shrink-0">
          <Calendar className="h-3.5 w-3.5" />
          <span>{currentDate}</span>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80 pointer-events-none" />
          <input
            type="text"
            placeholder="Search operational logs..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full h-9 pl-9.5 pr-3 text-xs bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground/80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-soft"
          />
        </div>

        {/* Filter Trigger */}
        {onFilterToggle && (
          <button
            onClick={onFilterToggle}
            className="flex items-center gap-2 h-9 px-3.5 text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer select-none shrink-0 shadow-soft"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default DashboardHeader;
