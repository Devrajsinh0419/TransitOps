'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  VehicleHeader,
  VehicleOverview,
  VehicleDetailsCard,
  VehicleTimeline,
  VehicleDocuments,
  VehicleGallery,
  VehicleDetailsSkeleton,
} from '@/components/vehicles';
import { useVehicle } from '@/hooks/useVehicle';
import { useVehicles } from '@/hooks/useVehicles';
import { useDeleteVehicle } from '@/hooks/useDeleteVehicle';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, Trash2, Archive, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { vehicle, isLoading, error } = useVehicle(id);
  const { archiveVehicle, restoreVehicle } = useVehicles();
  const { deleteVehicle } = useDeleteVehicle();

  // Dialog States
  const [showDelete, setShowDelete] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showRestore, setShowRestore] = useState(false);

  const confirmDelete = async () => {
    const success = await deleteVehicle(id);
    if (success) {
      router.push('/vehicles');
    }
  };

  const confirmArchive = async () => {
    await archiveVehicle(id);
    setShowArchive(false);
  };

  const confirmRestore = async () => {
    await restoreVehicle(id);
    setShowRestore(false);
  };

  if (isLoading) {
    return (
      <PageContainer className="py-6 space-y-6">
        <div className="flex flex-col gap-1 pb-4 border-b border-border/60">
          <div className="h-3 w-32 bg-muted rounded"></div>
          <div className="h-6 w-52 bg-muted rounded mt-2"></div>
        </div>
        <VehicleDetailsSkeleton />
      </PageContainer>
    );
  }

  if (error || !vehicle) {
    return (
      <PageContainer className="flex-1 flex flex-col items-center justify-center py-16 text-center select-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 mb-4">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-base font-bold text-foreground">Vehicle Not Found</h2>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6">
          The requested vehicle identifier could not be retrieved from the active registry.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/vehicles')}
          className="cursor-pointer font-bold"
        >
          Return to Registry
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-6 space-y-6">
      {/* 1. Header */}
      <VehicleHeader
        title={`${vehicle.manufacturer} ${vehicle.model} details`}
        subtitle="GPS positioning, maintenance indexes, specifications and regulatory permits"
        actionText="" // Hide primary button
      />

      {/* 2. Hero Overview Header Card */}
      <VehicleOverview
        vehicle={vehicle}
        onArchive={() => setShowArchive(true)}
        onRestore={() => setShowRestore(true)}
        onDelete={() => setShowDelete(true)}
      />

      {/* 3. Detail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main info */}
        <div className="lg:col-span-2 space-y-6">
          <VehicleDetailsCard vehicle={vehicle} />
          <VehicleTimeline vehicleId={id} />
        </div>

        {/* Right side attachments */}
        <div className="space-y-6">
          <VehicleGallery vehicleId={id} />
          <VehicleDocuments vehicleId={id} />
        </div>
      </div>

      {/* Confirmation Dialogs Overlay Panel */}
      <AnimatePresence>
        {/* DELETE CONFIRMATION DIALOG */}
        {showDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDelete(false)}
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
                <button onClick={() => setShowDelete(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Are you absolutely sure you want to delete this vehicle? This action is permanent and cannot be reversed.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{vehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{vehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setShowDelete(false)} className="cursor-pointer font-bold text-xs">
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
        {showArchive && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowArchive(false)}
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
                <button onClick={() => setShowArchive(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Moving this vehicle to archives will set its operational status to <span className="text-foreground font-bold">Inactive</span>. You can restore it to service anytime.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{vehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{vehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setShowArchive(false)} className="cursor-pointer font-bold text-xs">
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
        {showRestore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRestore(false)}
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
                <button onClick={() => setShowRestore(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-foreground/80 font-semibold leading-relaxed">
                  Are you ready to restore this archived vehicle? Its status will be set back to <span className="text-foreground font-bold">Available</span>.
                </p>
                <div className="p-3 bg-muted/30 border border-border rounded-lg text-xs space-y-1 font-semibold text-muted-foreground">
                  <p>Name: <span className="text-foreground font-bold">{vehicle.name}</span></p>
                  <p>Registration: <span className="text-foreground font-mono font-bold">{vehicle.registrationNumber}</span></p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" onClick={() => setShowRestore(false)} className="cursor-pointer font-bold text-xs">
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
