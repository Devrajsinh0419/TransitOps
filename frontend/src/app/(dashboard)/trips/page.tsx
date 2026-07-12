'use client';

import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  TripHeader,
  TripStats,
  TripToolbar,
  TripTable,
  TripPagination,
  DispatchDialog,
  CompleteTripDialog,
  CancelTripDialog,
  TableSkeleton,
} from '@/components/trips';
import { useTrips } from '@/hooks/useTrips';
import { useDispatchTrip } from '@/hooks/useDispatchTrip';
import { useCompleteTrip } from '@/hooks/useCompleteTrip';
import { useCancelTrip } from '@/hooks/useCancelTrip';
import { Trip } from '@/types/trip';
import { toast } from 'sonner';

export default function TripsPage() {
  const {
    trips,
    filters,
    setFilters,
    isLoading,
    totalCount,
    refetch,
    addLocalTrip,
    deleteLocalTrip,
  } = useTrips();

  const { dispatchTrip, isLoading: isDispatching } = useDispatchTrip();
  const { completeTrip, isLoading: isCompleting } = useCompleteTrip();
  const { cancelTrip, isLoading: isCancelling } = useCancelTrip();

  // Dialog State
  const [selectedTrip, setSelectedTrip] = React.useState<Trip | null>(null);
  const [activeDialog, setActiveDialog] = React.useState<'dispatch' | 'complete' | 'cancel' | null>(null);

  const openDialog = (trip: Trip, type: 'dispatch' | 'complete' | 'cancel') => {
    setSelectedTrip(trip);
    setActiveDialog(type);
  };

  const closeDialogs = () => {
    setSelectedTrip(null);
    setActiveDialog(null);
  };

  const handleConfirmDispatch = async () => {
    if (!selectedTrip) return;
    const success = await dispatchTrip(selectedTrip.id);
    if (success) {
      refetch();
      closeDialogs();
    }
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

  const handleDuplicate = (trip: Trip) => {
    const nextNum = Math.floor(Math.random() * 9000) + 1000;
    const duplicate: Trip = {
      ...trip,
      id: `trp-${Date.now()}`,
      tripNumber: `TRP-2026-${nextNum}`,
      tripName: `${trip.tripName} (Copy)`,
      status: 'draft',
      timeline: [
        {
          id: `tl-${Date.now()}`,
          type: 'created',
          description: `Trip duplicated from ${trip.tripNumber}. Saved in Draft.`,
          user: 'System Admin',
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dispatchTime: undefined,
      completionTime: undefined,
    };
    addLocalTrip(duplicate);
    toast.success(`Duplicated trip to new manifest: ${duplicate.tripNumber}`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this trip manifest?')) {
      deleteLocalTrip(id);
    }
  };

  const handlePaginationChange = (updates: { page: number; limit: number }) => {
    setFilters({
      ...filters,
      page: updates.page,
      limit: updates.limit,
    });
  };

  const handleRefresh = () => {
    refetch();
    toast.success('Shipping manifests reloaded');
  };

  return (
    <PageContainer className="space-y-6 select-none">
      <TripHeader
        title="Trip Manifest Directory"
        subtitle="Manage route dispatching, driver assignments, and commercial cargo tracking."
        breadcrumbs={[{ label: 'Trips' }]}
        action={{
          label: 'Create Trip',
          href: '/trips/new',
        }}
      />

      <TripStats trips={trips} />

      <div className="space-y-4">
        <TripToolbar
          filters={filters}
          onChange={setFilters}
          onRefresh={handleRefresh}
        />

        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <TripTable
              trips={trips}
              onDispatch={(t) => openDialog(t, 'dispatch')}
              onComplete={(t) => openDialog(t, 'complete')}
              onCancel={(t) => openDialog(t, 'cancel')}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />

            <TripPagination
              page={filters.page}
              limit={filters.limit}
              totalCount={totalCount}
              onChange={handlePaginationChange}
            />
          </>
        )}
      </div>

      {/* Confirmation Modals */}
      <DispatchDialog
        isOpen={activeDialog === 'dispatch'}
        onClose={closeDialogs}
        trip={selectedTrip}
        onConfirm={handleConfirmDispatch}
        isLoading={isDispatching}
      />

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
