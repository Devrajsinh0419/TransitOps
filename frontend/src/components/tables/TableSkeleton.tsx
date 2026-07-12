import React from 'react';
import { cn } from '@/lib/utils';

export interface TableSkeletonProps {
  rows?: number;
  cols?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, cols = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn('w-full space-y-4 animate-pulse select-none', className)}>
      <div className="flex items-center justify-between gap-4 py-2">
        <div className="h-9 w-48 bg-muted rounded-lg"></div>
        <div className="h-9 w-24 bg-muted rounded-lg"></div>
      </div>
      <div className="border border-border/80 rounded-xl bg-card overflow-hidden">
        <div className="h-11 bg-muted/40 border-b border-border/70"></div>
        <div className="divide-y divide-border/60">
          {Array(rows)
            .fill(null)
            .map((_, rIdx) => (
              <div key={rIdx} className="h-14 px-5 flex items-center gap-4">
                {Array(cols)
                  .fill(null)
                  .map((_, cIdx) => (
                    <div
                      key={cIdx}
                      className={cn(
                        'h-3.5 bg-muted rounded-md',
                        cIdx === 0 ? 'w-1/4' : cIdx === 1 ? 'w-1/3' : 'w-1/6'
                      )}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TableSkeleton;
