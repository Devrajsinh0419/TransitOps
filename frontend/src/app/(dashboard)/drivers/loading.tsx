'use client';

import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { DriverSkeleton } from '@/components/drivers';

export default function DriversLoading() {
  return (
    <PageContainer className="space-y-6">
      {/* Skeleton view of lists */}
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-muted rounded-md" />
        <div className="h-4 w-72 bg-muted rounded-md" />
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
        <div className="pt-6">
          <DriverSkeleton.Table />
        </div>
      </div>
    </PageContainer>
  );
}
