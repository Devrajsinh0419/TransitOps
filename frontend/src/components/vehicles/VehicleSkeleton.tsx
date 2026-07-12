'use client';

import React from 'react';

// 1. Table skeleton loader
export function VehicleTableSkeleton() {
  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden select-none animate-pulse">
      <div className="h-12 bg-muted/40 border-b border-border flex items-center px-4 justify-between">
        <div className="h-4 w-32 bg-muted-foreground/15 rounded"></div>
        <div className="h-4 w-40 bg-muted-foreground/15 rounded"></div>
      </div>
      <div className="p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-8 bg-muted-foreground/10 rounded w-24"></div>
            <div className="h-8 bg-muted-foreground/10 rounded flex-1"></div>
            <div className="h-8 bg-muted-foreground/10 rounded w-20"></div>
            <div className="h-8 bg-muted-foreground/10 rounded w-24"></div>
            <div className="h-8 bg-muted-foreground/10 rounded w-12"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. Card skeleton loader (for mobile/responsive list grids)
export function VehicleCardSkeleton() {
  return (
    <div className="border border-border rounded-xl bg-card p-4 space-y-4 select-none animate-pulse">
      <div className="flex gap-4">
        <div className="h-12 w-12 bg-muted-foreground/15 rounded-lg"></div>
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-36 bg-muted-foreground/15 rounded"></div>
          <div className="h-3.5 w-24 bg-muted-foreground/10 rounded"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="h-6 bg-muted-foreground/10 rounded"></div>
        <div className="h-6 bg-muted-foreground/10 rounded"></div>
      </div>
    </div>
  );
}

// 3. Form skeleton loader
export function VehicleFormSkeleton() {
  return (
    <div className="space-y-6 select-none animate-pulse">
      {[...Array(4)].map((_, sectionIdx) => (
        <div key={sectionIdx} className="border border-border rounded-xl bg-card p-5 space-y-4">
          <div className="h-4 w-40 bg-muted-foreground/15 rounded"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, inputIdx) => (
              <div key={inputIdx} className="space-y-1.5">
                <div className="h-3 w-20 bg-muted-foreground/10 rounded"></div>
                <div className="h-9 bg-muted-foreground/10 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 4. Details/Page skeleton loader
export function VehicleDetailsSkeleton() {
  return (
    <div className="space-y-6 select-none animate-pulse">
      <div className="h-40 bg-muted rounded-2xl"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-60 bg-muted rounded-xl"></div>
          <div className="h-60 bg-muted rounded-xl"></div>
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-muted rounded-xl"></div>
          <div className="h-48 bg-muted rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function VehicleSkeleton() {
  return <VehicleTableSkeleton />;
}
