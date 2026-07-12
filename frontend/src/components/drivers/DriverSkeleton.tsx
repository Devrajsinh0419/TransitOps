'use client';

import React from 'react';
import { Card } from '../cards/Card';

export function DriverSkeletonTable() {
  return (
    <div className="border border-border/60 rounded-xl overflow-hidden bg-background animate-pulse">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <div className="h-5 w-40 bg-muted-foreground/15 rounded" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between gap-4">
          <div className="h-9 flex-1 bg-muted-foreground/10 rounded" />
          <div className="h-9 w-28 bg-muted-foreground/10 rounded" />
        </div>
        <div className="space-y-3 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2 border-b border-border/30 last:border-0">
              <div className="h-9 w-9 rounded-full bg-muted-foreground/15" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-muted-foreground/10 rounded" />
                <div className="h-3 w-1/4 bg-muted-foreground/10 rounded" />
              </div>
              <div className="h-6 w-20 bg-muted-foreground/10 rounded" />
              <div className="h-6 w-24 bg-muted-foreground/10 rounded" />
              <div className="h-8 w-8 bg-muted-foreground/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DriverSkeletonCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted-foreground/15" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted-foreground/10 rounded" />
              <div className="h-3 w-24 bg-muted-foreground/10 rounded" />
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-border/50">
            <div className="h-3 w-full bg-muted-foreground/10 rounded" />
            <div className="h-3 w-5/6 bg-muted-foreground/10 rounded" />
            <div className="h-3 w-2/3 bg-muted-foreground/10 rounded" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-6 w-16 bg-muted-foreground/10 rounded" />
            <div className="h-8 w-8 bg-muted-foreground/10 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function DriverSkeletonProfile() {
  return (
    <div className="space-y-6 animate-pulse">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-muted-foreground/15" />
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="h-6 w-48 bg-muted-foreground/10 rounded mx-auto md:mx-0" />
            <div className="h-4 w-32 bg-muted-foreground/10 rounded mx-auto md:mx-0" />
            <div className="flex gap-2 justify-center md:justify-start">
              <div className="h-6 w-20 bg-muted-foreground/10 rounded" />
              <div className="h-6 w-24 bg-muted-foreground/10 rounded" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-24 bg-muted-foreground/10 rounded" />
            <div className="h-9 w-24 bg-muted-foreground/10 rounded" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 space-y-4">
          <div className="h-5 w-32 bg-muted-foreground/15 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 bg-muted-foreground/10 rounded" />
                <div className="h-4 w-full bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="h-5 w-32 bg-muted-foreground/15 rounded" />
          <div className="space-y-3 pt-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-3 w-24 bg-muted-foreground/10 rounded" />
                <div className="h-4 w-16 bg-muted-foreground/10 rounded" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default {
  Table: DriverSkeletonTable,
  Card: DriverSkeletonCard,
  Profile: DriverSkeletonProfile,
};
