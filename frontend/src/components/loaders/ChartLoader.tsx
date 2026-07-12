import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartLoaderProps {
  className?: string;
  type?: 'bar' | 'pie';
}

export function ChartLoader({ className, type = 'bar' }: ChartLoaderProps) {
  return (
    <div className={cn('bg-card border border-border/80 rounded-xl p-5 shadow-soft space-y-4 flex flex-col justify-between select-none min-h-52 w-full', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5 w-1/3">
          <div className="h-3.5 bg-muted rounded w-3/4 animate-pulse"></div>
          <div className="h-2.5 bg-muted rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="h-7 w-20 rounded bg-muted animate-pulse"></div>
      </div>
      
      {type === 'bar' ? (
        <div className="flex items-end gap-3.5 h-28 px-2 justify-center">
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-16"></div>
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-24"></div>
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-10"></div>
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-20"></div>
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-14"></div>
          <div className="w-6 bg-muted/60 rounded-t-md animate-pulse h-28"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-28">
          <div className="h-24 w-24 rounded-full border-[10px] border-muted/30 border-t-muted animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default ChartLoader;
