'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { useDrivers } from '@/hooks/useDrivers';
import { useDeleteDriver } from '@/hooks/useDeleteDriver';
import {
  DriverHeader,
  DriverStats,
  DriverToolbar,
  DriverTable,
  DriverCard,
  DriverPagination,
  DriverSkeleton,
} from '@/components/drivers';
import { EmptyState } from '@/components/empty-state/EmptyState';
import { AlertCircle } from 'lucide-react';
import { ConfirmationDialog, DeleteDialog } from '@/components/dialogs';

export default function DriversPage() {
  const {
    drivers,
    filters,
    setFilters,
    isLoading,
    refetch,
    totalCount,
    suspendDriver,
    activateDriver,
  } = useDrivers();

  const { deleteDriver, isLoading: isDeleteLoading } = useDeleteDriver();

  // Dialog actions states
  const [suspendTargetId, setSuspendTargetId] = useState<string | null>(null);
  const [activateTargetId, setActivateTargetId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  
  const [isActionPending, setIsActionPending] = useState(false);

  const activeSuspendTargetName = drivers.find((d) => d.id === suspendTargetId)?.name || '';
  const activeActivateTargetName = drivers.find((d) => d.id === activateTargetId)?.name || '';
  const activeDeleteTargetName = drivers.find((d) => d.id === deleteTargetId)?.name || '';

  const handleConfirmSuspend = async () => {
    if (!suspendTargetId) return;
    setIsActionPending(true);
    await suspendDriver(suspendTargetId);
    setIsActionPending(false);
    setSuspendTargetId(null);
  };

  const handleConfirmActivate = async () => {
    if (!activateTargetId) return;
    setIsActionPending(true);
    await activateDriver(activateTargetId);
    setIsActionPending(false);
    setActivateTargetId(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    setIsActionPending(true);
    await deleteDriver(deleteTargetId);
    setIsActionPending(false);
    setDeleteTargetId(null);
  };

  const handlePaginationChange = (updates: { page: number; limit: number }) => {
    setFilters({
      ...filters,
      ...updates,
    });
  };

  // Paginated list slice (simulated)
  const paginatedDrivers = drivers.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);

  return (
    <PageContainer className="space-y-6">
      {/* Header */}
      <DriverHeader
        title="Drivers Directory"
        subtitle="Manage fleet operators, monitor licensing compliance and track driver performance safety"
        showCreateButton
      />

      {/* Stats bar */}
      <DriverStats drivers={drivers} />

      {/* Toolbar & Filters */}
      <DriverToolbar
        filters={filters}
        onChange={setFilters}
        onRefresh={refetch}
      />

      {/* Data display grid */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="hidden md:block">
            <DriverSkeleton.Table />
          </div>
          <div className="block md:hidden">
            <DriverSkeleton.Card />
          </div>
        </div>
      ) : paginatedDrivers.length === 0 ? (
        <EmptyState
          title="No drivers found"
          description={
            filters.search
              ? `No drivers match the keyword "${filters.search}". Try refining your search queries.`
              : 'Get started by onboarding and registering your first driver on TransitOps.'
          }
          icon={AlertCircle}
        />
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <DriverTable
              drivers={paginatedDrivers}
              onSuspend={(id) => setSuspendTargetId(id)}
              onActivate={(id) => setActivateTargetId(id)}
              onDelete={(id) => setDeleteTargetId(id)}
            />
          </div>

          {/* Mobile Card Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {paginatedDrivers.map((driver) => (
              <DriverCard
                key={driver.id}
                driver={driver}
                onSuspend={() => setSuspendTargetId(driver.id)}
                onActivate={() => setActivateTargetId(driver.id)}
                onDelete={() => setDeleteTargetId(driver.id)}
              />
            ))}
          </div>

          {/* Pagination */}
          <DriverPagination
            page={filters.page}
            limit={filters.limit}
            totalCount={drivers.length}
            onChange={handlePaginationChange}
          />
        </div>
      )}

      {/* Suspend Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!suspendTargetId}
        onClose={() => setSuspendTargetId(null)}
        onConfirm={handleConfirmSuspend}
        title="Suspend Driver Profile?"
        message={`Are you sure you want to suspend ${activeSuspendTargetName}? This will block this operator from receiving active dispatch assignments.`}
        confirmText="Suspend"
        isLoading={isActionPending}
      />

      {/* Activate Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={!!activateTargetId}
        onClose={() => setActivateTargetId(null)}
        onConfirm={handleConfirmActivate}
        title="Activate Driver Profile?"
        message={`Activate driver ${activeActivateTargetName} and set availability state to active?`}
        confirmText="Activate"
        isLoading={isActionPending}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={!!deleteTargetId}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Remove Driver Profile"
        message={`Are you sure you want to remove ${activeDeleteTargetName} from TransitOps? This will permanently delete all records.`}
        confirmText="Delete"
        isLoading={isActionPending}
      />
    </PageContainer>
  );
}
