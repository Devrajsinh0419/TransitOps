'use client';

import React from 'react';
import { SearchInput } from '../forms/SearchInput';
import { Filter, Trash2, Download, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

export interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCount?: number;
  onBulkDelete?: () => void;
  onBulkExport?: () => void;
  onFilterToggle?: () => void;
  onColumnToggle?: () => void;
  filterLabel?: string;
  children?: React.ReactNode; // Extra filter buttons / options
  className?: string;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  selectedCount = 0,
  onBulkDelete,
  onBulkExport,
  onFilterToggle,
  onColumnToggle,
  filterLabel = 'Filter',
  children,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-4 select-none w-full',
        className
      )}
    >
      {/* Left side: Search & Filters */}
      <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-0">
        <SearchInput
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          onClear={() => onSearchChange('')}
          placeholder="Search records..."
          className="max-w-xs"
        />

        {onFilterToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onFilterToggle}
            leftIcon={<Filter className="h-4 w-4" />}
            className="cursor-pointer font-semibold"
          >
            {filterLabel}
          </Button>
        )}

        {onColumnToggle && (
          <Button
            variant="outline"
            size="sm"
            onClick={onColumnToggle}
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
            className="cursor-pointer font-semibold"
          >
            Columns
          </Button>
        )}

        {children}
      </div>

      {/* Right side: Bulk Actions (Overlay/Appears when selection exists) */}
      {selectedCount > 0 && (
        <div className="flex items-center gap-3 bg-muted/40 border border-primary/20 rounded-xl px-4 py-1.5 animate-scale-in text-xs">
          <span className="font-semibold text-muted-foreground">
            <span className="text-primary font-bold">{selectedCount}</span> selected
          </span>
          <div className="h-4 w-px bg-border/60 mx-1"></div>
          <div className="flex items-center gap-1.5">
            {onBulkExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBulkExport}
                leftIcon={<Download className="h-3.5 w-3.5" />}
                className="h-8 text-xs font-semibold cursor-pointer border-none bg-transparent hover:bg-muted"
              >
                Export
              </Button>
            )}
            {onBulkDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBulkDelete}
                leftIcon={<Trash2 className="h-3.5 w-3.5 text-rose-500" />}
                className="h-8 text-xs font-semibold text-rose-600 dark:text-rose-400 cursor-pointer hover:bg-rose-500/10"
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TableToolbar;
