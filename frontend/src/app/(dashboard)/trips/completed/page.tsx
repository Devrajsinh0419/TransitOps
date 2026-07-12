'use client';

import React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  TripHeader,
  TripStats,
  TripTable,
  TableSkeleton,
} from '@/components/trips';
import { useTrips } from '@/hooks/useTrips';

export default function CompletedTripsPage() {
  const { trips, isLoading, deleteLocalTrip } = useTrips();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this trip manifest?')) {
      deleteLocalTrip(id);
    }
  };

  // Filter for completed trips only
  const completedShipments = trips.filter((t) => t.status === 'completed');

  return (
    <PageContainer className="space-y-6 select-none">
      <TripHeader
        title="Completed Trip Logs"
        subtitle="Historical archive of completed delivery journeys, fuel performance, and revenue audits."
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: 'Completed' },
        ]}
      />

      <TripStats trips={trips} />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-xs font-extrabold uppercase text-muted-foreground tracking-wider">
            Closed Delivery Records ({completedShipments.length})
          </span>
          <Link href="/trips" className="text-xs font-bold text-primary hover:underline">
            View All Manifests
          </Link>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : completedShipments.length > 0 ? (
          <TripTable
            trips={completedShipments}
            onDispatch={() => {}}
            onComplete={() => {}}
            onCancel={() => {}}
            onDuplicate={() => {}}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-12 border border-border/50 bg-card rounded-2xl">
            <p className="text-xs text-muted-foreground font-semibold">No completed trips found in the archives.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
