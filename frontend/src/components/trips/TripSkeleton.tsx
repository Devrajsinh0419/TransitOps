'use client';

import React from 'react';

export function TableSkeleton() {
  return (
    <div className="w-full space-y-3 select-none text-left">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="h-9 w-64 bg-muted animate-pulse rounded-lg" />
        <div className="flex gap-2">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-lg" />
          <div className="h-9 w-20 bg-muted animate-pulse rounded-lg" />
          <div className="h-9 w-9 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
      <div className="border border-border/40 bg-card rounded-xl overflow-hidden">
        <div className="h-10 bg-muted/40 border-b border-border/40" />
        <div className="p-3 space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/10 pb-3 last:border-0 last:pb-0">
              <div className="space-y-1.5 w-1/4">
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                <div className="h-3 bg-muted/80 animate-pulse rounded w-1/2" />
              </div>
              <div className="h-4 bg-muted animate-pulse rounded w-1/6" />
              <div className="h-4 bg-muted animate-pulse rounded w-1/6" />
              <div className="h-4 bg-muted animate-pulse rounded w-12" />
              <div className="h-7 bg-muted animate-pulse rounded-lg w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl select-none text-left">
      <div className="flex items-center gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-2 bg-muted animate-pulse rounded" />
        ))}
      </div>
      <div className="p-6 border border-border/40 bg-card rounded-xl space-y-4">
        <div className="h-5 bg-muted animate-pulse rounded w-1/3 mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-3 bg-muted animate-pulse rounded w-1/4" />
            <div className="h-9 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-muted animate-pulse rounded w-1/4" />
            <div className="h-9 bg-muted animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-muted animate-pulse rounded w-1/8" />
          <div className="h-20 bg-muted animate-pulse rounded-lg" />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <div className="h-9 w-20 bg-muted animate-pulse rounded-lg" />
          <div className="h-9 w-24 bg-primary/20 animate-pulse rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-4 select-none text-left">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          <div className="space-y-2 flex-1 pt-1">
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
            <div className="h-2.5 bg-muted/60 animate-pulse rounded w-1/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SummarySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none text-left">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border border-border/40 bg-card rounded-xl space-y-3">
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-3 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-6 select-none text-left">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-24" />
          <div className="h-8 bg-muted animate-pulse rounded w-48" />
        </div>
        <div className="h-9 w-32 bg-muted animate-pulse rounded-lg" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-24 border border-border/40 bg-card rounded-xl animate-pulse" />
        ))}
      </div>
      
      <TableSkeleton />
    </div>
  );
}

export default PageSkeleton;
