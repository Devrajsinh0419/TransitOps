'use client';

import React from 'react';

export function MaintenanceSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none text-left">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center pb-4 border-b border-border/40">
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted rounded-md" />
          <div className="h-4 w-72 bg-muted rounded-md" />
        </div>
        <div className="h-9 w-28 bg-muted rounded-md" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border border-border/50 bg-card rounded-2xl flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-20 bg-muted rounded" />
              <div className="h-6 w-24 bg-muted rounded" />
              <div className="h-3.5 w-32 bg-muted rounded" />
            </div>
            <div className="h-10 w-10 bg-muted rounded-xl" />
          </div>
        ))}
      </div>

      {/* Toolbar Skeleton */}
      <div className="flex justify-between items-center gap-3">
        <div className="h-9 w-full max-w-md bg-muted rounded-lg" />
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-muted rounded-lg" />
          <div className="h-9 w-20 bg-muted rounded-lg" />
          <div className="h-9 w-9 bg-muted rounded-lg" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-border/50 rounded-xl bg-card overflow-hidden">
        <div className="p-4 border-b border-border/40 bg-muted/20 flex justify-between">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex justify-between items-center border-b border-border/20 pb-4 last:border-0 last:pb-0">
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/4 bg-muted rounded" />
                <div className="h-3 w-1/3 bg-muted rounded" />
              </div>
              <div className="h-4 w-16 bg-muted rounded mr-8" />
              <div className="h-4 w-16 bg-muted rounded mr-8" />
              <div className="h-8 w-16 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaintenanceSkeleton;
