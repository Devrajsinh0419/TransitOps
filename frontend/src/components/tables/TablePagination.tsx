'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalRecords: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange,
  onPageSizeChange,
  className,
}: TablePaginationProps) {
  const startIdx = (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 border-t border-border/60 bg-muted/5 select-none w-full text-xs',
        className
      )}
    >
      <div className="text-muted-foreground font-semibold">
        Showing <span className="text-foreground font-bold">{totalRecords === 0 ? 0 : startIdx}</span> to{' '}
        <span className="text-foreground font-bold">{endIdx}</span> of{' '}
        <span className="text-foreground font-bold">{totalRecords}</span> entries
      </div>

      <div className="flex items-center gap-5">
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground font-semibold">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="bg-card border border-border/80 rounded-md py-1 px-1.5 outline-none text-xs text-foreground cursor-pointer focus:border-primary shadow-soft"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            leftIcon={<ChevronLeft className="h-4 w-4" />}
            className="h-8 w-8 p-0 cursor-pointer"
            aria-label="Previous Page"
          />
          <span className="font-bold text-foreground min-w-12 text-center">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            leftIcon={<ChevronRight className="h-4 w-4" />}
            className="h-8 w-8 p-0 cursor-pointer"
            aria-label="Next Page"
          />
        </div>
      </div>
    </div>
  );
}

export default TablePagination;
