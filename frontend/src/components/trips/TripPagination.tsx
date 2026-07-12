'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select } from '../forms/Select';

export interface TripPaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  onChange: (updates: { page: number; limit: number }) => void;
}

export function TripPagination({ page, limit, totalCount, onChange }: TripPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange({ page: newPage, limit });
    }
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ page: 1, limit: parseInt(e.target.value, 10) });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50 text-xs select-none">
      <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
        <span>Show</span>
        <Select
          className="h-7 w-[65px] text-[11px] font-bold border-border/60 rounded py-0"
          value={limit.toString()}
          onChange={handleLimitChange}
          options={[
            { value: '5', label: '5' },
            { value: '10', label: '10' },
            { value: '25', label: '25' },
            { value: '50', label: '50' },
          ]}
        />
        <span>trips per page</span>
        <span className="hidden sm:inline border-l border-border/80 h-3.5 mx-2" />
        <span className="text-[11px] font-medium text-foreground bg-muted/40 px-2 py-0.5 rounded border border-border/20">
          Total: {totalCount} records
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="h-7 w-7 rounded border-border/60 p-0 flex items-center justify-center"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="h-7 w-7 rounded border-border/60 p-0 flex items-center justify-center"
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TripPagination;
