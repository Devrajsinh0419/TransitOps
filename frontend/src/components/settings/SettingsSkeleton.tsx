'use client';

import React from 'react';

export function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none text-left w-full">
      {/* Header skeleton */}
      <div className="space-y-2 pb-4 border-b border-border/40">
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="h-4 w-96 bg-muted rounded" />
      </div>

      {/* Main layout grid */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar skeleton */}
        <div className="w-full lg:w-60 border border-border/50 bg-card rounded-2xl p-4 h-80 space-y-3">
          <div className="h-3 w-16 bg-muted rounded mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-full bg-muted/50 rounded-xl" />
          ))}
        </div>

        {/* Content body skeleton */}
        <div className="flex-1 p-6 border border-border/50 bg-card rounded-2xl space-y-6">
          <div className="h-4 w-40 bg-muted rounded pb-2 border-b border-border/20" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-3.5 w-20 bg-muted rounded" />
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-20 bg-muted rounded" />
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-20 bg-muted rounded" />
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
            </div>
            <div className="space-y-2">
              <div className="h-3.5 w-20 bg-muted rounded" />
              <div className="h-9 w-full bg-muted/50 rounded-lg" />
            </div>
          </div>

          <div className="h-9 w-28 bg-muted rounded-lg ml-auto" />
        </div>
      </div>
    </div>
  );
}

export default SettingsSkeleton;
