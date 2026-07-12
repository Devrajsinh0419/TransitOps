'use client';

import React, { useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  VehicleHeader,
  VehicleStats,
  VehicleToolbar,
  VehicleFilters,
  VehicleTable,
  VehicleCard,
  VehiclePagination,
  VehicleTableSkeleton,
} from '@/components/vehicles';
import { useVehicles } from '@/hooks/useVehicles';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Trash2, Archive, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VehiclesPage() {
  const {
    vehicles,
    filters,
    setFilters,
    isLoading,
    error,
    totalCount,
    archiveVehicle,
    restoreVehicle,
    deleteLocalVehicle,
    refetch,
  } = useVehicles();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Dialog States
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [restoreId, setRestoreId] = useState<string | null>(null);

  // Find targeted item details for dialog messaging
  const activeDeleteVehicle = vehicles.find((v) => v.id === deleteId);
  const activeArchiveVehicle = vehicles.find((v) => v.id === archiveId);
  const activeRestoreVehicle = vehicles.find((v) => v.id === restoreId);

  const confirmDelete = async () => {
    if (deleteId) {
      deleteLocalVehicle(deleteId);
      setDeleteId(null);
    }
  };

  const confirmArchive = async () => {
    if (archiveId) {
      archiveVehicle(archiveId);
      setArchiveId(null);
    }
  };

  const confirmRestore = async () => {
    if (restoreId) {
      restoreVehicle(restoreId);
      setRestoreId(null);
    }
  };

  return (
    <PageContainer className="py-6 space-y-6">
      {/* 1. Page Header */}
      <VehicleHeader
        title="Fleet Vehicles Registry"
        subtitle="Manage logistics assets, registration terms, and odometer telematics logs"
      />

      {/* 2. Top Stats Overview */}
      <VehicleStats vehicles={vehicles} />

      {/* 3. Toolbar (Search, Filter toggler, Sort, Print) */}
      <VehicleToolbar
        filters={filters}
        onFiltersChange={setFilters}
        onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
        isFilterOpen={isFilterOpen}
        onRefresh={refetch}
      />

      {/* 4. Collapsible Filters Section */}
      <VehicleFilters
        filters={filters}
        onChange={setFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* 5. Main Registry List */}
      {isLoading ? (
        <VehicleTableSkeleton />
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <VehicleTable
              vehicles={vehicles}
              onArchive={(id) => setArchiveId(id)}
              onRestore={(id) => setRestoreId(id)}
              onDelete={(id) => setDeleteId(id)}
              onDuplicate={(id) => console.log('Duplicate clicked', id)}
            />
          </div>

          {/* Mobile/Tablet Card Grid View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {vehicles.length === 0 ? (
              <div className="col-span-full border border-dashed border-border p-8 rounded-xl text-center text-xs text-muted-foreground/60 font-semibold select-none">
                No vehicles found matching current criteria.
              </div>
            ) : (
              vehicles.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  onArchive={() => setArchiveId(v.id)}
                  onRestore={() => setRestoreId(v.id)}
                  onDelete={() => setDeleteId(v.id)}
                  onDuplicate={() => console.log('Duplicate clicked', v.id)}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* 6. Pagination Footer */}
      <VehiclePagination
        filters={filters}
        onChange={setFilters}
        totalRecords={totalCount}
      />

      {/* Confirmation Dialogs Overlay Panel */}
      <AnimatePresence>
        {/* DELETE CONFIRMATION DIALOG */}
        {deleteId && activeDeleteVehicle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-xl shadow-premium p-5 text-left select-none space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                  <AlertTriangle className="h-4.5 w-4.5" />
                  <span>Confirm Vehicle Deletion</span>
                </div>
                <button onClick={() => setDeleteId(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Are you absolutely sure you want to delete this vehicle? This action is permanent and cannot be reversed.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{activeDeleteVehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{activeDeleteVehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setDeleteId(null)} className="cursor-pointer font-bold text-xs">
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={confirmDelete} leftIcon={<Trash2 className="h-3.5 w-3.5" />} className="cursor-pointer font-bold text-xs">
                  Confirm Delete
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {/* ARCHIVE CONFIRMATION DIALOG */}
        {archiveId && activeArchiveVehicle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setArchiveId(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-xl shadow-premium p-5 text-left select-none space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                  <Archive className="h-4.5 w-4.5" />
                  <span>Archive Vehicle</span>
                </div>
                <button onClick={() => setArchiveId(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Moving this vehicle to archives will set its operational status to <span className="text-foreground font-bold">Inactive</span>. You can restore it to service anytime.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{activeArchiveVehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{activeArchiveVehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setArchiveId(null)} className="cursor-pointer font-bold text-xs">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={confirmArchive} className="cursor-pointer font-bold text-xs">
                  Confirm Archive
                </Button>
              </div>
            </motion.div>
          </>
        )}

        {/* RESTORE CONFIRMATION DIALOG */}
        {restoreId && activeRestoreVehicle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setRestoreId(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-card border border-border rounded-xl shadow-premium p-5 text-left select-none space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>Restore Vehicle to Service</span>
                </div>
                <button onClick={() => setRestoreId(null)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Are you ready to restore this archived vehicle? Its status will be set back to <span className="text-foreground font-bold">Available</span>.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{activeRestoreVehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{activeRestoreVehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setRestoreId(null)} className="cursor-pointer font-bold text-xs">
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={confirmRestore} className="cursor-pointer font-bold text-xs">
                  Confirm Restore
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
