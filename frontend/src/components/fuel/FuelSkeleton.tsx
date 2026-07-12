'use client';

import React from 'react';

export function FuelSkeleton() {
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

      {/* Summary Skeleton */}
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

      {/* Content layout skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-9 w-full bg-muted rounded-lg" />
          <div className="border border-border/50 rounded-xl bg-card h-80" />
        </div>
        <div className="border border-border/50 rounded-xl bg-card h-80" />
      </div>
    </div>
  );
}

export default FuelSkeleton;
