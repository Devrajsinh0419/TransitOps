'use client';

import React from 'react';
import Link from 'next/link';
import { Trip, TripStatus } from '@/types/trip';
import { TripStatusBadge } from './TripStatusBadge';
import { formatCurrency } from '@/lib/helpers';
import { TripProgress } from './TripProgress';
import { Button } from '../ui/Button';
import {
  Eye,
  Edit2,
  Trash2,
  Play,
  CheckSquare,
  XCircle,
  Copy,
  MoreVertical,
  Truck,
  User,
  ArrowRight,
  Shield,
  Calendar,
} from 'lucide-react';

interface TripTableProps {
  trips: Trip[];
  onDispatch: (trip: Trip) => void;
  onComplete: (trip: Trip) => void;
  onCancel: (trip: Trip) => void;
  onDuplicate: (trip: Trip) => void;
  onDelete: (id: string) => void;
}

export function TripTable({
  trips,
  onDispatch,
  onComplete,
  onCancel,
  onDuplicate,
  onDelete,
}: TripTableProps) {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const toggleDropdown = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  React.useEffect(() => {
    const handleClose = () => setActiveDropdown(null);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, []);

  return (
    <div className="select-none text-left">
      {/* Mobile/Tablet Card Layout */}
      <div className="grid grid-cols-1 md:hidden gap-3">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="p-4 bg-card border border-border/60 rounded-xl hover:shadow-sm transition-all space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-foreground">{trip.tripNumber}</span>
              <TripStatusBadge status={trip.status} />
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-foreground line-clamp-1">{trip.tripName}</h4>
              <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Registered by {trip.createdBy}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-b border-border/40 py-2 my-1 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-muted-foreground/80" />
                <span className="font-semibold text-foreground truncate max-w-[80px]">{trip.vehicleRegistration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-3 w-3 text-muted-foreground/80" />
                <span className="font-semibold text-foreground truncate max-w-[80px]">{trip.driverName}</span>
              </div>
              <div>
                <span className="font-bold text-foreground">${trip.expectedRevenue}</span>
              </div>
            </div>

            {/* Progress line */}
            <TripProgress status={trip.status} source={trip.route.source} destination={trip.route.destination} />

            <div className="flex items-center justify-between pt-2">
              <Link href={`/trips/${trip.id}`}>
                <Button variant="outline" size="sm" className="h-8 text-[10px] px-2.5 rounded-lg">
                  View Profile
                </Button>
              </Link>

              <div className="flex items-center gap-1.5">
                {trip.status === 'draft' && (
                  <Button
                    onClick={() => onDispatch(trip)}
                    variant="primary"
                    size="sm"
                    className="h-8 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-2.5"
                  >
                    Dispatch
                  </Button>
                )}
                {(trip.status === 'dispatched' || trip.status === 'in_progress') && (
                  <Button
                    onClick={() => onComplete(trip)}
                    variant="outline"
                    size="sm"
                    className="h-8 text-[10px] font-bold text-emerald-600 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg px-2.5"
                  >
                    Complete
                  </Button>
                )}
                {['draft', 'dispatched', 'in_progress'].includes(trip.status) && (
                  <Button
                    onClick={() => onCancel(trip)}
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                    aria-label="Cancel Trip"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border/50 rounded-xl bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                <th className="p-3">Trip Info</th>
                <th className="p-3">Route Journey</th>
                <th className="p-3">Cargo Load</th>
                <th className="p-3">Assigned Assets</th>
                <th className="p-3 text-right">Revenue Target</th>
                <th className="p-3">Workflow State</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors"
                >
                  {/* Trip Info */}
                  <td className="p-3 align-middle max-w-[200px]">
                    <div className="font-extrabold text-foreground">{trip.tripNumber}</div>
                    <div className="font-medium text-muted-foreground truncate max-w-[170px]" title={trip.tripName}>
                      {trip.tripName}
                    </div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">
                      Created by {trip.createdBy}
                    </div>
                  </td>

                  {/* Route Journey */}
                  <td className="p-3 align-middle min-w-[220px]">
                    <div className="flex items-center gap-1.5 font-bold text-foreground">
                      <span className="truncate max-w-[90px]">{trip.route.source.split(',')[0]}</span>
                      <ArrowRight className="h-3 w-3 text-muted-foreground/80 flex-shrink-0" />
                      <span className="truncate max-w-[90px]">{trip.route.destination.split(',')[0]}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {trip.route.plannedDistance} mi • {trip.route.estimatedTime}
                    </div>
                  </td>

                  {/* Cargo Load */}
                  <td className="p-3 align-middle">
                    <div className="font-bold text-foreground">{trip.cargo.type}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {trip.cargo.weight.toLocaleString('en-IN')} kg
                    </div>
                  </td>

                  {/* Assigned Assets */}
                  <td className="p-3 align-middle">
                    <div className="flex items-center gap-1 text-foreground font-semibold">
                      <Truck className="h-3 w-3 text-muted-foreground/80" />
                      <span>{trip.vehicleRegistration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                      <User className="h-3 w-3 text-muted-foreground/80" />
                      <span>{trip.driverName}</span>
                    </div>
                  </td>

                  {/* Revenue Target */}
                  <td className="p-3 align-middle text-right font-extrabold text-foreground">
                    {formatCurrency(trip.actualRevenue || trip.expectedRevenue)}
                  </td>

                  {/* Workflow State */}
                  <td className="p-3 align-middle">
                    <TripStatusBadge status={trip.status} />
                  </td>

                  {/* Row Actions */}
                  <td className="p-3 align-middle text-center relative">
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/trips/${trip.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                          aria-label="View Manifest"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>

                      <Link href={`/trips/${trip.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                          aria-label="Edit Manifest"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                      </Link>

                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => toggleDropdown(trip.id, e)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>

                        {activeDropdown === trip.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-card border border-border/70 rounded-xl shadow-lg z-20 py-1 text-left animate-in fade-in duration-100">
                            {trip.status === 'draft' && (
                              <button
                                onClick={() => onDispatch(trip)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted text-xs font-semibold text-indigo-600"
                              >
                                <Play className="h-3.5 w-3.5" /> Dispatch Trip
                              </button>
                            )}
                            {['dispatched', 'in_progress'].includes(trip.status) && (
                              <button
                                onClick={() => onComplete(trip)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted text-xs font-semibold text-emerald-600"
                              >
                                <CheckSquare className="h-3.5 w-3.5" /> Complete Trip
                              </button>
                            )}
                            {['draft', 'dispatched', 'in_progress'].includes(trip.status) && (
                              <button
                                onClick={() => onCancel(trip)}
                                className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted text-xs font-semibold text-rose-600 border-b border-border/50"
                              >
                                <XCircle className="h-3.5 w-3.5" /> Cancel Trip
                              </button>
                            )}
                            <button
                              onClick={() => onDuplicate(trip)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground"
                            >
                              <Copy className="h-3.5 w-3.5" /> Duplicate Manifest
                            </button>
                            <button
                              onClick={() => onDelete(trip.id)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-muted text-xs font-semibold text-rose-500 hover:text-rose-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete Manifest
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TripTable;
