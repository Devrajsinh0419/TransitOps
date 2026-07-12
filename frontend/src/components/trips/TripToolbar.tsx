'use client';

import React from 'react';
import { TripSearch } from './TripSearch';
import { TripFilters } from './TripFilters';
import { Button } from '../ui/Button';
import { Select } from '../forms/Select';
import { Download, RefreshCw, ArrowUpDown } from 'lucide-react';
import { TripFilters as FilterType } from '@/types/trip';

interface TripToolbarProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  onRefresh: () => void;
}

export function TripToolbar({ filters, onChange, onRefresh }: TripToolbarProps) {
  const [isExporting, setIsExporting] = React.useState(false);

  const handleSearchChange = (val: string) => {
    onChange({ ...filters, search: val, page: 1 });
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortOrder: e.target.value as 'asc' | 'desc' });
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvContent = "data:text/csv;charset=utf-8,Trip Number,Name,Type,Priority,Source,Destination,Distance,Revenue,Status\n"
        + "TRP-2026-0001,Houston-Dallas Heavy Haul,one_way,high,Houston TX,Dallas TX,240,2850,in_progress\n"
        + "TRP-2026-0002,Last-Mile Medical Shuttle,round_trip,critical,Chicago IL,Naperville IL,35,450,draft";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `transitops_trips_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <TripSearch value={filters.search} onChange={handleSearchChange} />
        
        <div className="flex items-center gap-2 self-end md:self-auto">
          {/* Sort order toggle */}
          <div className="flex items-center border border-border/60 bg-background rounded-lg px-2 h-9">
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground mr-1.5" />
            <Select
              className="border-0 bg-transparent h-full text-xs py-0 pl-0 pr-6 font-semibold focus:ring-0"
              value={filters.sortOrder}
              onChange={handleSortOrderChange}
              options={[
                { value: 'desc', label: 'Descending' },
                { value: 'asc', label: 'Ascending' },
              ]}
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 border-border/60 text-xs font-semibold text-muted-foreground hover:text-foreground"
            isLoading={isExporting}
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-9 w-9 border-border/60 text-muted-foreground hover:text-foreground p-0 flex items-center justify-center"
            aria-label="Refresh Roster"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <TripFilters filters={filters} onChange={onChange} />
    </div>
  );
}

export default TripToolbar;
