'use client';

import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageSkeleton } from '@/components/trips/TripSkeleton';

export default function TripsLoading() {
  return (
    <PageContainer>
      <PageSkeleton />
    </PageContainer>
  );
}
