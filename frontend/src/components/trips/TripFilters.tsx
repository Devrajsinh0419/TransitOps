'use client';

import React from 'react';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { TripFilters as FilterType } from '@/types/trip';

export interface TripFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export function TripFilters({ filters, onChange }: TripFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectChange = (key: keyof FilterType, value: string) => {
    onChange({
      ...filters,
      [key]: value === 'all' ? '' : value,
      page: 1,
    });
  };

  const handleReset = () => {
    onChange({
      search: '',
      status: '',
      driverId: '',
      vehicleId: '',
      priority: '',
      dateRange: '',
      sortBy: 'newest',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
    });
  };

  const hasActiveFilters =
    filters.status ||
    filters.priority ||
    filters.driverId ||
    filters.vehicleId ||
    filters.dateRange ||
    filters.search;

  return (
    <div className="space-y-3 select-none">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-9 gap-2 border-border/60 rounded-lg text-xs font-semibold ${
            isOpen ? 'bg-muted text-foreground' : 'text-muted-foreground'
          }`}
          leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
        >
          Filters
          {hasActiveFilters ? (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground animate-pulse">
              {Object.values(filters).filter(v => v !== '' && v !== 'newest' && v !== 'desc' && typeof v === 'string').length}
            </span>
          ) : null}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 gap-1 text-xs text-muted-foreground hover:text-foreground font-semibold"
            leftIcon={<RotateCcw className="h-3 w-3" />}
          >
            Reset
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="p-4 border border-border/50 bg-card rounded-xl shadow-inner grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 animate-in fade-in slide-in-from-top-1 duration-200 text-left">
          {/* Status filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Status</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.status || 'all'}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'draft', label: 'Draft' },
                { value: 'dispatched', label: 'Dispatched' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'delayed', label: 'Delayed' },
              ]}
            />
          </div>

          {/* Priority filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.priority || 'all'}
              onChange={(e) => handleSelectChange('priority', e.target.value)}
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'critical', label: 'Critical' },
              ]}
            />
          </div>

          {/* Date Range filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Date Horizon</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.dateRange || 'all'}
              onChange={(e) => handleSelectChange('dateRange', e.target.value)}
              options={[
                { value: 'all', label: 'Any Time' },
                { value: 'today', label: 'Today Only' },
                { value: 'yesterday', label: 'Yesterday' },
                { value: '7days', label: 'Last 7 Days' },
                { value: '30days', label: 'Last 30 Days' },
              ]}
            />
          </div>

          {/* Sort By Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ordering</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.sortBy || 'newest'}
              onChange={(e) => handleSelectChange('sortBy', e.target.value)}
              options={[
                { value: 'newest', label: 'Newest Created' },
                { value: 'oldest', label: 'Oldest Created' },
                { value: 'revenue', label: 'Revenue Expected' },
                { value: 'distance', label: 'Planned Distance' },
                { value: 'tripNumber', label: 'Trip Number ID' },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TripFilters;
