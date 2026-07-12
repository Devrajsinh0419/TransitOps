import React from 'react';
import { cn } from '@/lib/utils';

export interface CardLoaderProps {
  className?: string;
}

export function CardLoader({ className }: CardLoaderProps) {
  return (
    <div className={cn('bg-card border border-border/80 rounded-xl p-5 shadow-soft space-y-4 animate-pulse select-none', className)}>
      <div className="flex items-center justify-between">
        <div className="h-3.5 bg-muted rounded w-1/3"></div>
        <div className="h-7 w-7 rounded-lg bg-muted"></div>
      </div>
      <div className="space-y-2">
        <div className="h-6 bg-muted rounded w-1/2"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default CardLoader;
