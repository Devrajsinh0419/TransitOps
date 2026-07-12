'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select } from '../forms/Select';
import { VehicleFilters as FiltersType } from '@/types/vehicle';

export interface VehiclePaginationProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  totalRecords: number;
}

export function VehiclePagination({ filters, onChange, totalRecords }: VehiclePaginationProps) {
  const totalPages = Math.ceil(totalRecords / filters.limit) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onChange({
      ...filters,
      page: newPage,
    });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = parseInt(e.target.value, 10);
    onChange({
      ...filters,
      limit,
      page: 1, // Reset page
    });
  };

  const startRecord = (filters.page - 1) * filters.limit + 1;
  const endRecord = Math.min(filters.page * filters.limit, totalRecords);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50 text-[11px] font-bold text-muted-foreground select-none">
      {/* Records count indicators */}
      <span>
        Showing <span className="text-foreground">{totalRecords > 0 ? startRecord : 0}</span> to{' '}
        <span className="text-foreground">{endRecord}</span> of{' '}
        <span className="text-foreground">{totalRecords}</span> vehicles
      </span>

      {/* Pagination controls & Limit Selector */}
      <div className="flex items-center gap-4">
        {/* Limit drop size */}
        <div className="flex items-center gap-1.5">
          <span>Rows:</span>
          <div className="w-16">
            <Select
              value={filters.limit.toString()}
              onChange={handleLimitChange}
              options={[
                { value: '10', label: '10' },
                { value: '25', label: '25' },
                { value: '50', label: '50' },
                { value: '100', label: '100' },
              ]}
            />
          </div>
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground disabled:text-muted-foreground/30 disabled:bg-card/45 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-foreground font-semibold px-1">
            Page {filters.page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={filters.page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground disabled:text-muted-foreground/30 disabled:bg-card/45 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VehiclePagination;
