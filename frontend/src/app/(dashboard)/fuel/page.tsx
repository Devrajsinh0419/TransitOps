'use client';

import React from 'react';
import Link from 'next/link';
import { useFuelLogs } from '@/hooks/useFuelLogs';
import { FuelSummary, FuelChart, FuelToolbar, FuelTable, FuelSkeleton } from '@/components/fuel';
import { Button } from '@/components/ui/Button';
import { Plus, Fuel as FuelIcon } from 'lucide-react';

export default function FuelPage() {
  const {
    fuelLogs,
    filters,
    setFilters,
    summary,
    isLoading,
    refetch,
  } = useFuelLogs();

  if (isLoading && fuelLogs.length === 0) {
    return <FuelSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border/40 gap-3">
        <div className="space-y-1">
          <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
            <FuelIcon className="h-5 w-5 text-primary" />
            Fuel Log Audit
          </h1>
          <p className="text-xs text-muted-foreground">
            Monitor fleet refilling transactions, examine mileage efficiencies, and track fuel Station receipts.
          </p>
        </div>

        <Link href="/fuel/new">
          <Button
            size="sm"
            className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5 shadow"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Log Fuel Refill
          </Button>
        </Link>
      </div>

      {/* Fuel Summary Cards */}
      <FuelSummary summary={summary} />

      {/* Analytics Chart & Info Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FuelChart logs={fuelLogs} />
        </div>
        
        {/* Helper Panel */}
        <div className="p-6 border border-border/50 bg-card rounded-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[9px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              FLEET POLICY NOTICE
            </span>
            <h4 className="text-xs font-extrabold text-foreground">Receipt Compliance Audit</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              All fuel transaction logs must contain valid invoice reference numbers and receipt scans. Under-reporting odometer numbers or discrepancy in fuel Station location logs triggers compliance flags.
            </p>
          </div>
          <div className="border-t border-border/30 pt-3">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
              <span>Next Audit Cycle</span>
              <span className="text-foreground font-extrabold">Weekly (Fridays)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Query Filters */}
      <FuelToolbar filters={filters} onChange={setFilters} onRefresh={refetch} />

      {/* Roster Table List */}
      {fuelLogs.length === 0 ? (
        <div className="p-12 border border-dashed border-border/50 bg-card rounded-2xl flex flex-col items-center justify-center gap-2">
          <FuelIcon className="h-8 w-8 text-muted-foreground/60" />
          <h3 className="text-xs font-bold text-foreground">No fuel logs registered</h3>
          <p className="text-[10px] text-muted-foreground max-w-xs text-center">
            Try adjusting search queries or log a new fuel refilling receipt.
          </p>
        </div>
      ) : (
        <FuelTable logs={fuelLogs} />
      )}
    </div>
  );
}
