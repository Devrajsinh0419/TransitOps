import React from 'react';
import { cn } from '@/lib/utils';

export interface ListSkeletonProps {
  items?: number;
  className?: string;
}

export function ListSkeleton({ items = 4, className }: ListSkeletonProps) {
  return (
    <div className={cn('space-y-3.5 w-full select-none', className)}>
      {Array(items)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 border border-border/70 rounded-lg bg-card animate-pulse">
            <div className="h-8.5 w-8.5 rounded-full bg-muted shrink-0"></div>
            <div className="flex-1 space-y-1.5 min-w-0 pr-4">
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="h-2.5 bg-muted rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-muted rounded w-12 shrink-0"></div>
          </div>
        ))}
    </div>
  );
}

export default ListSkeleton;
