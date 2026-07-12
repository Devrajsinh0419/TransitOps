'use client';

import React from 'react';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 select-none animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="h-32 bg-muted rounded-2xl w-full"></div>

      {/* KPI Stats Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-muted rounded-xl p-5 space-y-3">
            <div className="h-3 w-16 bg-muted-foreground/20 rounded"></div>
            <div className="h-6 w-24 bg-muted-foreground/20 rounded"></div>
            <div className="h-3 w-32 bg-muted-foreground/20 rounded"></div>
          </div>
        ))}
      </div>

      {/* Grid of Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts block */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>

        {/* Alerts and Activity block */}
        <div className="space-y-6">
          <div className="h-64 bg-muted rounded-xl"></div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="h-64 bg-muted rounded-xl w-full"></div>
    </div>
  );
}

export default DashboardSkeleton;
