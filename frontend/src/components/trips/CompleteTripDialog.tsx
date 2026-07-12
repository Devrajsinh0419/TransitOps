'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../dialogs/Modal';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Trip } from '@/types/trip';
import { tripCompletionSchema, TripCompletionSchemaInput } from '@/validation/trip.schema';
import { CheckSquare } from 'lucide-react';

interface CompleteTripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onConfirm: (data: TripCompletionSchemaInput) => void;
  isLoading?: boolean;
}

export function CompleteTripDialog({
  isOpen,
  onClose,
  trip,
  onConfirm,
  isLoading = false,
}: CompleteTripDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TripCompletionSchemaInput>({
    resolver: zodResolver(tripCompletionSchema) as any,
  });

  // Pre-fill initial defaults based on estimations
  React.useEffect(() => {
    if (trip) {
      setValue('finalOdometer', (trip.vehicleOdometer || 0) + (trip.route.plannedDistance || 0));
      setValue('actualDistance', trip.route.plannedDistance || 0);
      setValue('fuelConsumed', Math.ceil((trip.route.plannedDistance || 0) / 7)); // average 7mpg
      setValue('actualRevenue', trip.expectedRevenue || 0);
    }
  }, [trip, setValue]);

  const onSubmitForm = (data: TripCompletionSchemaInput) => {
    onConfirm(data);
    reset();
  };

  if (!trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Cargo Trip"
      description={`Record real metrics for ${trip.tripNumber}`}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 select-none text-left">
        <div className="space-y-3">
          {/* Final Odometer */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Final Odometer Reading (mi)
            </label>
            <Input
              type="number"
              className="h-9 text-xs rounded-lg border-border/60"
              placeholder="e.g. 149140"
              {...register('finalOdometer')}
              error={!!errors.finalOdometer}
            />
            {errors.finalOdometer?.message && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.finalOdometer.message}</p>
            )}
            <p className="text-[9px] text-muted-foreground leading-none">
              Start Odometer: <span className="font-semibold text-foreground">{trip.vehicleOdometer} mi</span>
            </p>
          </div>

          {/* Actual Distance */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Actual Distance Traveled (mi)
            </label>
            <Input
              type="number"
              className="h-9 text-xs rounded-lg border-border/60"
              placeholder="e.g. 242"
              {...register('actualDistance')}
              error={!!errors.actualDistance}
            />
            {errors.actualDistance?.message && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.actualDistance.message}</p>
            )}
          </div>

          {/* Fuel Consumed */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Fuel Consumed (gallons)
            </label>
            <Input
              type="number"
              className="h-9 text-xs rounded-lg border-border/60"
              placeholder="e.g. 35"
              {...register('fuelConsumed')}
              error={!!errors.fuelConsumed}
            />
            {errors.fuelConsumed?.message && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.fuelConsumed.message}</p>
            )}
          </div>

          {/* Actual Revenue */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Actual Revenue Recorded ($)
            </label>
            <Input
              type="number"
              className="h-9 text-xs rounded-lg border-border/60"
              placeholder="e.g. 2850"
              {...register('actualRevenue')}
              error={!!errors.actualRevenue}
            />
            {errors.actualRevenue?.message && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.actualRevenue.message}</p>
            )}
          </div>

          {/* Completion Notes */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Post-Trip Log Notes
            </label>
            <textarea
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
              placeholder="Add cargo reception notes, delays reasons, driver reports, etc..."
              {...register('notes')}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-border/40">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="h-9 text-xs rounded-lg border-border/60">
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="h-9 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-1.5"
            leftIcon={<CheckSquare className="h-4 w-4" />}
          >
            Record Completion
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CompleteTripDialog;
