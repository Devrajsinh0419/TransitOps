'use client';

import React from 'react';
import Link from 'next/link';
import { useMaintenance } from '@/hooks/useMaintenance';
import { MaintenanceStats, MaintenanceToolbar, MaintenanceTable, MaintenanceSkeleton } from '@/components/maintenance';
import { Button } from '@/components/ui/Button';
import { Plus, Wrench } from 'lucide-react';

export default function MaintenancePage() {
  const {
    maintenance,
    filters,
    setFilters,
    isLoading,
    deleteLocalMaintenance,
    refetch,
  } = useMaintenance();

  if (isLoading && maintenance.length === 0) {
    return <MaintenanceSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border/40 gap-3">
        <div className="space-y-1">
          <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
            <Wrench className="h-5 w-5 text-primary" />
            Maintenance hold
          </h1>
          <p className="text-xs text-muted-foreground">
            Schedule routine services, track emergency shop repairs, and log safety checks.
          </p>
        </div>
        
        <Link href="/maintenance/new">
          <Button
            size="sm"
            className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5 shadow"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create Ticket
          </Button>
        </Link>
      </div>

      {/* Roster Stats Grid */}
      <MaintenanceStats records={maintenance} />

      {/* Query Filters */}
      <MaintenanceToolbar filters={filters} onChange={setFilters} onRefresh={refetch} />

      {/* Data Roster Table */}
      {maintenance.length === 0 ? (
        <div className="p-12 border border-dashed border-border/50 bg-card rounded-2xl flex flex-col items-center justify-center gap-2">
          <Wrench className="h-8 w-8 text-muted-foreground/60" />
          <h3 className="text-xs font-bold text-foreground">No maintenance tickets found</h3>
          <p className="text-[10px] text-muted-foreground max-w-xs text-center">
            Try adjusting search queries or register a new workshop service ticket.
          </p>
        </div>
      ) : (
        <MaintenanceTable records={maintenance} onDelete={deleteLocalMaintenance} />
      )}
    </div>
  );
}
