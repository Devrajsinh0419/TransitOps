'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Download, Columns, Printer, FileSpreadsheet, FileText } from 'lucide-react';
import { VehicleSearch } from './VehicleSearch';
import { Select } from '../forms/Select';
import { VehicleFilters as FiltersType } from '@/types/vehicle';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface VehicleToolbarProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onFilterToggle: () => void;
  isFilterOpen: boolean;
  onRefresh: () => void;
}

export function VehicleToolbar({
  filters,
  onFiltersChange,
  onFilterToggle,
  isFilterOpen,
  onRefresh,
}: VehicleToolbarProps) {
  const [showExportOptions, setShowExportOptions] = useState(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = e.target.value as FiltersType['sortBy'];
    onFiltersChange({
      ...filters,
      sortBy,
      page: 1,
    });
  };

  const handleExport = (type: 'csv' | 'excel' | 'print') => {
    setShowExportOptions(false);
    toast.success(`Export Started`, {
      description: `Generating ${type.toUpperCase()} spreadsheet containing fleet details...`,
    });
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2 select-none">
      {/* Search & Filter trigger */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <VehicleSearch
          value={filters.search}
          onChange={(val) => onFiltersChange({ ...filters, search: val, page: 1 })}
        />
        <button
          onClick={onFilterToggle}
          className={cn(
            'flex h-9 items-center gap-2 px-3 text-xs font-semibold border rounded-lg transition-colors cursor-pointer select-none shrink-0 shadow-soft',
            isFilterOpen
              ? 'bg-primary text-white border-primary'
              : 'border-border bg-card text-foreground hover:bg-muted'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Filters</span>
        </button>
      </div>

      {/* Sort, Column visibility, Refresh & Export controls */}
      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
        {/* Sort option */}
        <div className="w-40 md:w-44">
          <Select
            value={filters.sortBy}
            onChange={handleSortChange}
            options={[
              { value: 'newest', label: 'Sort: Newest' },
              { value: 'oldest', label: 'Sort: Oldest' },
              { value: 'name', label: 'Sort: Vehicle Name' },
              { value: 'registrationNumber', label: 'Sort: Reg Number' },
            ]}
          />
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-soft"
          title="Refresh vehicle list"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Column Visibility */}
        <button
          onClick={() => toast.info('Column Visibility Panel', { description: 'All columns currently set to visible.' })}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-soft"
          title="Toggle column visibility"
        >
          <Columns className="h-4 w-4" />
        </button>

        {/* Export options uploader */}
        <div className="relative">
          <button
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="flex h-9 items-center gap-1.5 px-3 text-xs font-semibold border border-border bg-card hover:bg-muted text-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer shadow-soft"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>

          {showExportOptions && (
            <>
              {/* Overlay Backdrop to close drop */}
              <div className="fixed inset-0 z-10" onClick={() => setShowExportOptions(false)} />
              <div className="absolute right-0 mt-2 z-20 w-36 bg-card border border-border rounded-lg shadow-premium py-1 text-left">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <FileText className="h-3.5 w-3.5 text-blue-500" />
                  <span>Export to CSV</span>
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Export to Excel</span>
                </button>
                <button
                  onClick={() => handleExport('print')}
                  className="w-full px-3 py-1.5 text-xs text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer font-semibold"
                >
                  <Printer className="h-3.5 w-3.5 text-amber-500" />
                  <span>Print Registry</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleToolbar;
