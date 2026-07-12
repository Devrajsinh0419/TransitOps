'use client';

import React from 'react';
import Link from 'next/link';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  TripHeader,
  TripStats,
  TripTable,
  CompleteTripDialog,
  CancelTripDialog,
  TableSkeleton,
} from '@/components/trips';
import { useTrips } from '@/hooks/useTrips';
import { useCompleteTrip } from '@/hooks/useCompleteTrip';
import { useCancelTrip } from '@/hooks/useCancelTrip';
import { Trip } from '@/types/trip';
import { toast } from 'sonner';

export default function DispatchedTripsPage() {
  const { trips, isLoading, refetch, deleteLocalTrip } = useTrips();
  const { completeTrip, isLoading: isCompleting } = useCompleteTrip();
  const { cancelTrip, isLoading: isCancelling } = useCancelTrip();

  // Dialog State
  const [selectedTrip, setSelectedTrip] = React.useState<Trip | null>(null);
  const [activeDialog, setActiveDialog] = React.useState<'complete' | 'cancel' | null>(null);

  const openDialog = (trip: Trip, type: 'complete' | 'cancel') => {
    setSelectedTrip(trip);
    setActiveDialog(type);
  };

  const closeDialogs = () => {
    setSelectedTrip(null);
    setActiveDialog(null);
  };

  const handleConfirmComplete = async (data: any) => {
    if (!selectedTrip) return;
    const success = await completeTrip(selectedTrip.id, data);
    if (success) {
      refetch();
      closeDialogs();
    }
  };

  const handleConfirmCancel = async (data: any) => {
    if (!selectedTrip) return;
    const success = await cancelTrip(selectedTrip.id, data);
    if (success) {
      refetch();
      closeDialogs();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this trip manifest?')) {
      deleteLocalTrip(id);
    }
  };

  // Filter for dispatched and in-progress status only
  const activeShipments = trips.filter((t) => ['dispatched', 'in_progress'].includes(t.status));

  return (
    <PageContainer className="space-y-6 select-none">
      <TripHeader
        title="Active Dispatch Operations"
        subtitle="Real-time monitoring of active freight cargo shipments and in-transit driver logs."
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: 'Active Dispatch' },
        ]}
      />

      <TripStats trips={trips} />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-2">
          <span className="text-xs font-extrabold uppercase text-muted-foreground tracking-wider">
            In-Transit Fleet Records ({activeShipments.length})
          </span>
          <Link href="/trips" className="text-xs font-bold text-primary hover:underline">
            View All Manifests
          </Link>
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : activeShipments.length > 0 ? (
          <TripTable
            trips={activeShipments}
            onDispatch={() => {}}
            onComplete={(t) => openDialog(t, 'complete')}
            onCancel={(t) => openDialog(t, 'cancel')}
            onDuplicate={() => {}}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-12 border border-border/50 bg-card rounded-2xl">
            <p className="text-xs text-muted-foreground font-semibold">No active shipments currently on route.</p>
            <Link href="/trips" className="inline-block mt-4">
              <span className="text-xs font-bold text-primary hover:underline">Dispatch a new trip</span>
            </Link>
          </div>
        )}
      </div>

      <CompleteTripDialog
        isOpen={activeDialog === 'complete'}
        onClose={closeDialogs}
        trip={selectedTrip}
        onConfirm={handleConfirmComplete}
        isLoading={isCompleting}
      />

      <CancelTripDialog
        isOpen={activeDialog === 'cancel'}
        onClose={closeDialogs}
        trip={selectedTrip}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />
    </PageContainer>
  );
}
