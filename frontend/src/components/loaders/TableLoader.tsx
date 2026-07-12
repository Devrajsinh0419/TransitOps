import React from 'react';
import { cn } from '@/lib/utils';

export interface TableLoaderProps {
  rows?: number;
  cols?: number;
  className?: string;
}

export function TableLoader({ rows = 5, cols = 4, className }: TableLoaderProps) {
  return (
    <div className={cn('w-full border border-border/80 rounded-xl overflow-hidden bg-card shadow-soft select-none', className)}>
      <div className="bg-muted/30 px-5 py-4 border-b border-border/60 flex items-center justify-between">
        <div className="h-4.5 bg-muted rounded-md w-1/4 animate-pulse"></div>
        <div className="flex gap-2">
          <div className="h-8.5 bg-muted rounded-lg w-20 animate-pulse"></div>
          <div className="h-8.5 bg-muted rounded-lg w-28 animate-pulse"></div>
        </div>
      </div>
      
      <div className="divide-y divide-border/60">
        {Array(rows)
          .fill(null)
          .map((_, rIdx) => (
            <div key={rIdx} className="px-5 py-4 flex gap-4 items-center">
              {Array(cols)
                .fill(null)
                .map((_, cIdx) => (
                  <div
                    key={cIdx}
                    className={cn(
                      'h-3.5 bg-muted rounded-md animate-pulse',
                      cIdx === 0 ? 'w-1/4' : cIdx === 1 ? 'w-1/3' : cIdx === 2 ? 'w-1/6' : 'w-1/5'
                    )}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default TableLoader;
