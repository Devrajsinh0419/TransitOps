'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '../dialogs/Modal';
import { Button } from '../ui/Button';
import { Select } from '../forms/Select';
import { Trip } from '@/types/trip';
import { tripCancellationSchema, TripCancellationSchemaInput } from '@/validation/trip.schema';
import { AlertCircle } from 'lucide-react';

interface CancelTripDialogProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onConfirm: (data: TripCancellationSchemaInput) => void;
  isLoading?: boolean;
}

export function CancelTripDialog({
  isOpen,
  onClose,
  trip,
  onConfirm,
  isLoading = false,
}: CancelTripDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TripCancellationSchemaInput>({
    resolver: zodResolver(tripCancellationSchema),
  });

  const onSubmitForm = (data: TripCancellationSchemaInput) => {
    onConfirm(data);
    reset();
  };

  const handleSelectChange = (val: string) => {
    setValue('cancellationReason', val);
  };

  if (!trip) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Trip Manifest"
      description={`State justification for cancelling ${trip.tripNumber}`}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 select-none text-left">
        <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-2.5">
          <AlertCircle className="h-4.5 w-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Cancelling this trip will immediately free up the assigned vehicle (<span className="font-semibold text-foreground">{trip.vehicleRegistration}</span>) and driver (<span className="font-semibold text-foreground">{trip.driverName}</span>) back to the available pool.
          </p>
        </div>

        <div className="space-y-3">
          {/* Cancellation Reason Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Reason for Cancellation
            </label>
            <Select
              className="h-9 text-xs rounded-lg border-border/60"
              value=""
              onChange={(e) => handleSelectChange(e.target.value)}
              options={[
                { value: '', label: 'Select a reason...' },
                { value: 'Driver Unavailable', label: 'Driver Call-out / Illness' },
                { value: 'Vehicle Breakdown', label: 'Vehicle Mechanical Issue' },
                { value: 'Route Closed', label: 'Route Closure / Weather Block' },
                { value: 'Order Cancelled', label: 'Customer Order Cancelled' },
                { value: 'Compliance Issue', label: 'Compliance Audit Failure' },
                { value: 'Other', label: 'Other Reason (Specify Below)' },
              ]}
            />
            {errors.cancellationReason && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.cancellationReason.message}</p>
            )}
          </div>

          {/* Cancellation Notes */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Justification Notes
            </label>
            <textarea
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
              placeholder="Provide exact cancellation remarks..."
              {...register('cancellationNotes')}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-border/40">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading} className="h-9 text-xs rounded-lg border-border/60">
            Keep Trip
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            className="h-9 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg gap-1.5"
            leftIcon={<AlertCircle className="h-4 w-4" />}
          >
            Cancel Trip
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default CancelTripDialog;
