'use client';

import React, { useState } from 'react';
import { TripSummary } from '@/types/dashboard';
import { Card } from '../cards/Card';
import { Badge } from '../badges/Badge';
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { toast } from 'sonner';

export interface TripsTableProps {
  trips: TripSummary[];
  isLoading?: boolean;
}

export function TripsTable({ trips, isLoading = false }: TripsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Card className="p-5 select-none space-y-4 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-4 w-28 bg-muted rounded"></div>
          <div className="h-8 w-44 bg-muted rounded-lg"></div>
        </div>
        <div className="h-48 bg-muted/30 rounded-lg w-full"></div>
      </Card>
    );
  }

  // Filter trips based on search
  const filteredTrips = trips.filter(
    (trip) =>
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (tripId: string) => {
    toast.info(`Inspecting Trip ${tripId}`, {
      description: 'Loading detailed GPS telematics and driver safety logs...',
    });
  };

  return (
    <Card className="p-5 select-none space-y-4">
      {/* Title & Search bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-3">
        <div className="text-left">
          <h3 className="text-sm font-bold text-foreground">Active Trips Dispatch</h3>
          <p className="text-[10px] text-muted-foreground">Real-time status of cargo routes</p>
        </div>

        {/* Local Table Search */}
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/80 pointer-events-none" />
          <input
            type="text"
            placeholder="Search active trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-8 pl-8.5 pr-3 text-xs bg-muted/20 border border-border rounded-lg text-foreground placeholder-muted-foreground/85 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto min-w-full">
        <table className="min-w-full divide-y divide-border/60 text-left">
          <thead>
            <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <th className="py-2.5 px-3">Trip ID</th>
              <th className="py-2.5 px-3">Vehicle</th>
              <th className="py-2.5 px-3">Driver</th>
              <th className="py-2.5 px-3">Route (From / To)</th>
              <th className="py-2.5 px-3">Cargo</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">ETA</th>
              <th className="py-2.5 px-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {filteredTrips.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-xs text-muted-foreground/60 font-semibold">
                  No active trips match your criteria.
                </td>
              </tr>
            ) : (
              filteredTrips.map((trip) => (
                <tr
                  key={trip.id}
                  onClick={() => handleRowClick(trip.id)}
                  className="hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-bold text-foreground font-mono">{trip.id}</td>
                  <td className="py-3 px-3 text-muted-foreground font-medium truncate max-w-[130px]">{trip.vehicle}</td>
                  <td className="py-3 px-3 text-foreground font-semibold">{trip.driver}</td>
                  <td className="py-3 px-3 text-muted-foreground font-medium max-w-[180px] truncate">
                    <span className="text-foreground/85 font-semibold">{trip.source}</span>
                    <span className="mx-1">→</span>
                    <span className="text-foreground/85 font-semibold">{trip.destination}</span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground font-medium truncate max-w-[110px]">{trip.cargo}</td>
                  <td className="py-3 px-3">
                    <Badge variant={trip.status === 'on_trip' ? 'on_trip' : trip.status === 'completed' ? 'success' : 'warning'}>
                      {trip.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-foreground">{trip.eta}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1 rounded bg-muted/60 border border-border text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-[10px] font-bold text-muted-foreground select-none">
        <span>
          Showing <span className="text-foreground">{filteredTrips.length}</span> of{' '}
          <span className="text-foreground">{filteredTrips.length}</span> records
        </span>

        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground/40 cursor-not-allowed"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="px-2 text-foreground font-semibold">Page 1</span>
          <button
            disabled
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground/40 cursor-not-allowed"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default TripsTable;
