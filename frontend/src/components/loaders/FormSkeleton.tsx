import React from 'react';
import { cn } from '@/lib/utils';

export interface FormSkeletonProps {
  fields?: number;
  className?: string;
}

export function FormSkeleton({ fields = 4, className }: FormSkeletonProps) {
  return (
    <div className={cn('space-y-5 max-w-2xl mx-auto w-full select-none animate-pulse', className)}>
      <div className="grid gap-5 md:grid-cols-2">
        {Array(fields)
          .fill(null)
          .map((_, idx) => (
            <div key={idx} className="space-y-1.5 w-full">
              <div className="h-3 bg-muted rounded w-1/4"></div>
              <div className="h-9 bg-muted rounded-lg w-full"></div>
            </div>
          ))}
      </div>
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/85">
        <div className="h-8.5 bg-muted rounded-lg w-20"></div>
        <div className="h-8.5 bg-muted rounded-lg w-24"></div>
      </div>
    </div>
  );
}

export default FormSkeleton;
