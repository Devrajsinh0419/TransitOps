'use client';

import React from 'react';
import { Modal } from '../dialogs/Modal';
import { Button } from '../ui/Button';
import { Trip } from '@/types/trip';
import { Truck, User, Navigation, Package, ArrowRight, ShieldCheck } from 'lucide-react';

interface DispatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DispatchDialog({
  isOpen,
  onClose,
  trip,
  onConfirm,
  isLoading = false,
}: DispatchDialogProps) {
  if (!trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Verify & Dispatch Trip"
      description={`Review operational parameters for ${trip.tripNumber}`}
      size="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="h-9 text-xs rounded-lg border-border/60">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            isLoading={isLoading}
            className="h-9 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg gap-1.5"
            leftIcon={<ShieldCheck className="h-4 w-4" />}
          >
            Confirm & Dispatch
          </Button>
        </>
      }
    >
      <div className="space-y-4 select-none text-left">
        <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2.5">
          <div className="text-amber-500 font-extrabold text-xs">⚠️ Dispatch Checklist</div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            By dispatching, you confirm the driver is physically fit, the vehicle payload has been safely balanced, and all tollways are active.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Driver */}
          <div className="p-3 border border-border/50 bg-muted/20 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <User className="h-3.5 w-3.5 text-primary" />
              <span>Driver</span>
            </div>
            <div>
              <div className="text-xs font-bold text-foreground truncate">{trip.driverName}</div>
              <div className="text-[10px] text-muted-foreground truncate">{trip.driverPhone}</div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="p-3 border border-border/50 bg-muted/20 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <Truck className="h-3.5 w-3.5 text-primary" />
              <span>Vehicle</span>
            </div>
            <div>
              <div className="text-xs font-bold text-foreground truncate">{trip.vehicleRegistration}</div>
              <div className="text-[10px] text-muted-foreground truncate">{trip.vehicleName}</div>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="p-3 border border-border/50 bg-muted/20 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <Navigation className="h-3.5 w-3.5 text-primary" />
            <span>Planned Route</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <span className="truncate max-w-[140px]">{trip.route.source.split(',')[0]}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <span className="truncate max-w-[140px]">{trip.route.destination.split(',')[0]}</span>
          </div>
          <div className="text-[10px] text-muted-foreground">
            Planned Distance: {trip.route.plannedDistance} km ({trip.route.estimatedTime})
          </div>
        </div>

        {/* Cargo */}
        <div className="p-3 border border-border/50 bg-muted/20 rounded-xl space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            <Package className="h-3.5 w-3.5 text-primary" />
            <span>Cargo Spec</span>
          </div>
          <div>
            <span className="text-xs font-bold text-foreground">{trip.cargo.type}</span>
            <span className="text-[10px] text-muted-foreground ml-2">({trip.cargo.weight.toLocaleString('en-IN')} kg)</span>
          </div>
          {trip.cargo.specialInstructions && (
            <p className="text-[10px] bg-card border border-border/30 px-2 py-1 rounded text-amber-600 font-semibold italic truncate">
              "{trip.cargo.specialInstructions}"
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default DispatchDialog;
