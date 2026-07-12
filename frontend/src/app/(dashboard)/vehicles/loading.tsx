'use client';

import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { VehicleTableSkeleton } from '@/components/vehicles';

export default function VehiclesLoading() {
  return (
    <PageContainer className="py-6 space-y-6">
      <div className="flex flex-col gap-1 pb-4 border-b border-border/60 animate-pulse">
        <div className="h-3.5 w-32 bg-muted rounded"></div>
        <div className="h-6 w-52 bg-muted rounded mt-2"></div>
      </div>
      <VehicleTableSkeleton />
    </PageContainer>
  );
}
