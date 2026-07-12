'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fuelSchema, FuelSchemaInput } from '@/validation/fuel.schema';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { activeVehicles } from '@/hooks/useVehicles';
import { activeDrivers } from '@/hooks/useDrivers';
import { activeTrips } from '@/hooks/useTrips';
import { Save, ArrowLeft, Fuel, FileText } from 'lucide-react';
import Link from 'next/link';

interface FuelFormProps {
  onSubmit: (data: FuelSchemaInput) => void;
  isLoading?: boolean;
}

export function FuelForm({ onSubmit, isLoading = false }: FuelFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FuelSchemaInput>({
    resolver: zodResolver(fuelSchema) as any,
    defaultValues: {
      quantity: 0,
      pricePerLiter: 0,
      totalCost: 0,
      date: new Date().toISOString().split('T')[0],
    },
  });

  const quantity = watch('quantity') || 0;
  const pricePerLiter = watch('pricePerLiter') || 0;

  // Auto-calculate Total Cost placeholder
  React.useEffect(() => {
    const calculatedTotal = parseFloat((quantity * pricePerLiter).toFixed(2));
    setValue('totalCost', calculatedTotal);
  }, [quantity, pricePerLiter, setValue]);

  const onSubmitForm = (data: FuelSchemaInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 max-w-4xl mx-auto select-none text-left">
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6">
        
        {/* Step 1: Asset Assignment */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <Fuel className="h-4 w-4 text-primary" />
            Asset & Trip Allocations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Vehicle</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('vehicleId') || ''}
                onChange={(e) => setValue('vehicleId', e.target.value)}
                options={[
                  { value: '', label: 'Select vehicle...' },
                  ...activeVehicles.map((v) => ({
                    value: v.id,
                    label: `${v.registrationNumber} - ${v.name}`,
                  })),
                ]}
              />
              {errors.vehicleId && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.vehicleId.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned Driver</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('driverId') || ''}
                onChange={(e) => setValue('driverId', e.target.value)}
                options={[
                  { value: '', label: 'Select driver...' },
                  ...activeDrivers.map((d) => ({
                    value: d.id,
                    label: d.name,
                  })),
                ]}
              />
              {errors.driverId && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.driverId.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Manifest (Optional)</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('tripId') || ''}
                onChange={(e) => setValue('tripId', e.target.value)}
                options={[
                  { value: '', label: 'Select active trip...' },
                  ...activeTrips.map((t) => ({
                    value: t.id,
                    label: `${t.tripNumber} - ${t.tripName}`,
                  })),
                ]}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Fuel Transaction */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Refuel Receipts & Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Type</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. Premium Diesel, E10"
                {...register('fuelType')}
                error={!!errors.fuelType}
              />
              {errors.fuelType?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.fuelType.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Odometer reading (mi)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. 148900"
                {...register('odometer')}
                error={!!errors.odometer}
              />
              {errors.odometer?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.odometer.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Log Date</label>
              <Input
                type="date"
                className="h-9 text-xs rounded-lg border-border/60 text-left"
                {...register('date')}
                error={!!errors.date}
              />
              {errors.date?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.date.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Quantity (Liters)</label>
              <Input
                type="number"
                step="0.01"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0.00"
                {...register('quantity')}
                error={!!errors.quantity}
              />
              {errors.quantity?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.quantity.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price per Liter ($)</label>
              <Input
                type="number"
                step="0.001"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0.000"
                {...register('pricePerLiter')}
                error={!!errors.pricePerLiter}
              />
              {errors.pricePerLiter?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.pricePerLiter.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Transaction Cost ($)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60 bg-muted/20 text-muted-foreground font-bold"
                placeholder="Auto-calculated"
                disabled
                value={watch('totalCost')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Station Vendor</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. Shell Highway 10 North"
                {...register('fuelStation')}
                error={!!errors.fuelStation}
              />
              {errors.fuelStation?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.fuelStation.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Invoice / Receipt Number</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. INV-F-99881"
                {...register('invoiceNumber')}
                error={!!errors.invoiceNumber}
              />
              {errors.invoiceNumber?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.invoiceNumber.message}</p>
              )}
            </div>
          </div>

          {/* Receipt Upload Mock */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Refuel Receipt Attachment
            </label>
            <div className="border border-dashed border-border/60 rounded-xl p-4 bg-muted/5 flex flex-col items-center justify-center gap-1 hover:bg-muted/10 transition-colors cursor-pointer">
              <FileText className="h-6 w-6 text-muted-foreground/60" />
              <span className="text-[10px] font-bold text-foreground">Upload refuel receipt invoice image</span>
              <span className="text-[8px] text-muted-foreground">PDF, JPEG, PNG up to 5MB (Simulated)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <Link href="/fuel">
          <Button
            type="button"
            variant="outline"
            className="h-9 text-xs rounded-lg border-border/60 text-muted-foreground hover:text-foreground"
            leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
          >
            Cancel
          </Button>
        </Link>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading}
          className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5"
          leftIcon={<Save className="h-3.5 w-3.5" />}
        >
          Save Fuel Log
        </Button>
      </div>
    </form>
  );
}

export default FuelForm;
