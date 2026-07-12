'use client';

import React from 'react';
import { DriverSearch } from './DriverSearch';
import { DriverFilters } from './DriverFilters';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { Download, RefreshCw } from 'lucide-react';
import { DriverFilters as FilterType } from '@/types/driver';
import { toast } from 'sonner';

export interface DriverToolbarProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onRefresh: () => void;
}

export function DriverToolbar({ filters, onChange, onRefresh }: DriverToolbarProps) {
  const handleSearch = (searchVal: string) => {
    onChange({ ...filters, search: searchVal, page: 1 });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [sortBy, sortOrder] = value.split(':') as [any, any];
    onChange({ ...filters, sortBy, sortOrder, page: 1 });
  };

  const handleExport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Compiling driver roster...',
        success: 'Driver roster exported successfully as CSV!',
        error: 'Export failed.',
      }
    );
  };

  return (
    <div className="space-y-3 pb-2 select-none">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <DriverSearch value={filters.search} onChange={handleSearch} />

        {/* Toolbar controls */}
        <div className="flex items-center gap-2">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Sort By</span>
            <Select
              className="h-9 w-[160px] text-xs border-border/60 rounded-lg"
              value={`${filters.sortBy}:${filters.sortOrder}`}
              onChange={handleSortChange}
              options={[
                { value: 'newest:desc', label: 'Newest Added' },
                { value: 'oldest:asc', label: 'Oldest Added' },
                { value: 'name:asc', label: 'Name (A-Z)' },
                { value: 'name:desc', label: 'Name (Z-A)' },
                { value: 'safetyScore:desc', label: 'Safety Score (High)' },
                { value: 'safetyScore:asc', label: 'Safety Score (Low)' },
                { value: 'licenseExpiry:asc', label: 'License Expiration' },
              ]}
            />
          </div>

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 gap-1.5 text-xs text-muted-foreground border-border/60 hover:text-foreground font-semibold rounded-lg"
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export
          </Button>

          {/* Refresh */}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-9 w-9 text-muted-foreground border-border/60 hover:text-foreground rounded-lg p-0 flex items-center justify-center"
            title="Refresh driver directory"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Filter panel toggles */}
      <DriverFilters filters={filters} onChange={onChange} />
    </div>
  );
}

export default DriverToolbar;
