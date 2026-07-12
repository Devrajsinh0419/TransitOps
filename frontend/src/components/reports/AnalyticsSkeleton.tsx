'use client';

import React from 'react';

export function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none text-left">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-border/40">
        <div className="space-y-2">
          <div className="h-6 w-56 bg-muted rounded" />
          <div className="h-4 w-80 bg-muted rounded" />
        </div>
        <div className="h-9 w-40 bg-muted rounded-lg" />
      </div>

      {/* Navigation tabs skeleton */}
      <div className="h-8 w-full bg-muted/20 border-b border-border/40" />

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border border-border/50 bg-card rounded-2xl flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-6 w-24 bg-muted rounded" />
              <div className="h-3.5 w-32 bg-muted rounded" />
            </div>
            <div className="h-8 w-12 bg-muted rounded" />
          </div>
        ))}
      </div>

      {/* Charts grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 border border-border/50 bg-card rounded-2xl h-80 space-y-4">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-60 w-full bg-muted/20 rounded-xl" />
        </div>
        <div className="p-5 border border-border/50 bg-card rounded-2xl h-80 space-y-4">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-60 w-full bg-muted/20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSkeleton;
