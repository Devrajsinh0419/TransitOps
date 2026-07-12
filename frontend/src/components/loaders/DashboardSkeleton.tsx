import React from 'react';
import { CardLoader } from './CardLoader';
import { TableLoader } from './TableLoader';
import { ChartLoader } from './ChartLoader';
import { cn } from '@/lib/utils';

export interface DashboardSkeletonProps {
  className?: string;
}

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn('space-y-6 w-full select-none', className)}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardLoader />
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <ChartLoader type="bar" />
        </div>
        <div>
          <ChartLoader type="pie" />
        </div>
      </div>

      <TableLoader rows={4} cols={5} />
    </div>
  );
}

export default DashboardSkeleton;
