'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vehicleSchema, VehicleSchemaInput } from '@/validation/vehicle.schema';
import { FormField } from '../forms/FormField';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { FormCard } from '../forms/FormCard';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export interface VehicleFormProps {
  initialData?: Partial<VehicleSchemaInput>;
  onSubmit: (data: VehicleSchemaInput) => Promise<void>;
  isLoading?: boolean;
}

export function VehicleForm({ initialData, onSubmit, isLoading = false }: VehicleFormProps) {
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [insuranceUploaded, setInsuranceUploaded] = useState(false);
  const [regUploaded, setRegUploaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm<VehicleSchemaInput>({
    resolver: zodResolver(vehicleSchema) as any,
    defaultValues: initialData || {
      status: 'available',
      transmission: 'automatic',
      fuelType: 'diesel',
      currentOdometer: 0,
    },
  });

  // Warning before unload if form is dirty
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to discard them?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleFormSubmit = async (data: VehicleSchemaInput) => {
    try {
      await onSubmit(data);
      reset(data); // Clear dirty state
    } catch (err) {
      toast.error('An error occurred while saving the vehicle.');
    }
  };

  const triggerCancel = () => {
    if (isDirty) {
      if (window.confirm('Discard all unsaved changes?')) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 text-left select-none pb-12">
      {/* Dirty state indicator banner */}
      {isDirty && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center gap-2.5 text-xs text-amber-600 dark:text-amber-400 font-semibold animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <span>You have unsaved changes. Make sure to submit to save your edits.</span>
        </div>
      )}

      {/* Section 1: Basic Information */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Basic Information</h3>
          <p className="text-[10px] text-muted-foreground">Primary vehicle identification details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Vehicle Name" error={errors.name?.message}>
            <Input {...register('name')} placeholder="e.g. Volvo FH16 Globetrotter" />
          </FormField>

          <FormField label="Registration Number" error={errors.registrationNumber?.message}>
            <Input {...register('registrationNumber')} placeholder="e.g. TRK-491-A" />
          </FormField>

          <FormField label="Vehicle Type" error={errors.type?.message}>
            <Select
              {...register('type')}
              options={[
                { value: 'heavy_truck', label: 'Heavy Truck' },
                { value: 'delivery_van', label: 'Delivery Van' },
                { value: 'trailer', label: 'Trailer' },
                { value: 'refrigerated', label: 'Refrigerated Cargo' },
                { value: 'sedan', label: 'Sedan Passenger' },
                { value: 'suv', label: 'SUV Utility' },
              ]}
              placeholder="Select Type"
            />
          </FormField>

          <FormField label="Manufacturer" error={errors.manufacturer?.message}>
            <Input {...register('manufacturer')} placeholder="e.g. Volvo Trucks" />
          </FormField>

          <FormField label="Model" error={errors.model?.message}>
            <Input {...register('model')} placeholder="e.g. FH16 V8" />
          </FormField>

          <FormField label="Year" error={errors.year?.message}>
            <Input {...register('year')} type="number" placeholder="e.g. 2024" />
          </FormField>

          <FormField label="VIN Number" error={errors.vinNumber?.message} className="md:col-span-3">
            <Input {...register('vinNumber')} placeholder="Enter 17-character VIN number" maxLength={17} />
          </FormField>
        </div>
      </FormCard>

      {/* Section 2: Specifications */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Specifications</h3>
          <p className="text-[10px] text-muted-foreground">Engine, drivetrain and payload capabilities</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField label="Capacity (lbs)" error={errors.capacity?.message}>
            <Input {...register('capacity')} type="number" placeholder="e.g. 22000" />
          </FormField>

          <FormField label="Fuel Type" error={errors.fuelType?.message}>
            <Select
              {...register('fuelType')}
              options={[
                { value: 'diesel', label: 'Diesel' },
                { value: 'petrol', label: 'Petrol' },
                { value: 'electric', label: 'Electric' },
                { value: 'hybrid', label: 'Hybrid' },
                { value: 'cng', label: 'CNG' },
              ]}
            />
          </FormField>

          <FormField label="Transmission" error={errors.transmission?.message}>
            <Select
              {...register('transmission')}
              options={[
                { value: 'automatic', label: 'Automatic' },
                { value: 'manual', label: 'Manual' },
              ]}
            />
          </FormField>

          <FormField label="Color" error={errors.color?.message}>
            <Input {...register('color')} placeholder="e.g. White, Black, Red" />
          </FormField>
        </div>
      </FormCard>

      {/* Section 3: Financial */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Financial & Assurances</h3>
          <p className="text-[10px] text-muted-foreground">Capital acquisition costs and expiration terms</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField label="Purchase Date" error={errors.purchaseDate?.message}>
            <Input {...register('purchaseDate')} type="date" />
          </FormField>

          <FormField label="Purchase Cost ($)" error={errors.purchaseCost?.message}>
            <Input {...register('purchaseCost')} type="number" placeholder="e.g. 145000" />
          </FormField>

          <FormField label="Insurance Expiration" error={errors.insuranceExpiry?.message}>
            <Input {...register('insuranceExpiry')} type="date" />
          </FormField>

          <FormField label="Registration Expiration" error={errors.registrationExpiry?.message}>
            <Input {...register('registrationExpiry')} type="date" />
          </FormField>
        </div>
      </FormCard>

      {/* Section 4: Current details */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Operations Status</h3>
          <p className="text-[10px] text-muted-foreground">Fleet tracker values and current location</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Current Odometer (mi)" error={errors.currentOdometer?.message}>
            <Input {...register('currentOdometer')} type="number" placeholder="e.g. 14200" />
          </FormField>

          <FormField label="Current Status" error={errors.status?.message}>
            <Select
              {...register('status')}
              options={[
                { value: 'available', label: 'Available' },
                { value: 'on_trip', label: 'On Trip' },
                { value: 'maintenance', label: 'In Maintenance' },
                { value: 'retired', label: 'Retired' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'disposed', label: 'Disposed' },
              ]}
            />
          </FormField>

          <FormField label="Garage Depot Location" error={errors.garageLocation?.message}>
            <Input {...register('garageLocation')} placeholder="e.g. Houston Hub North" />
          </FormField>
        </div>
      </FormCard>

      {/* Section 5: Documents */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Document Registry</h3>
          <p className="text-[10px] text-muted-foreground">Attach regulatory, insurance and photo files</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Uploader 1: Photo */}
          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-36">
            {photoUploaded ? (
              <div className="space-y-1 text-emerald-500">
                <CheckCircle className="h-8 w-8 mx-auto" />
                <p className="text-xs font-bold">Vehicle Photo Loaded</p>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(false)}
                  className="text-[10px] text-muted-foreground hover:text-rose-500 underline cursor-pointer"
                >
                  Replace file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadCloud className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-foreground">Upload Photo</p>
                  <p className="text-[9px] text-muted-foreground">PNG, JPG, max 5MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoUploaded(true)}
                  className="px-3 py-1 text-[10px] bg-primary text-white font-bold rounded-lg cursor-pointer hover:opacity-90"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>

          {/* Uploader 2: Insurance policy */}
          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-36">
            {insuranceUploaded ? (
              <div className="space-y-1 text-emerald-500">
                <CheckCircle className="h-8 w-8 mx-auto" />
                <p className="text-xs font-bold">Insurance PDF Loaded</p>
                <button
                  type="button"
                  onClick={() => setInsuranceUploaded(false)}
                  className="text-[10px] text-muted-foreground hover:text-rose-500 underline cursor-pointer"
                >
                  Replace file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadCloud className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-foreground">Insurance Document</p>
                  <p className="text-[9px] text-muted-foreground">PDF only, max 10MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setInsuranceUploaded(true)}
                  className="px-3 py-1 text-[10px] bg-primary text-white font-bold rounded-lg cursor-pointer hover:opacity-90"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>

          {/* Uploader 3: Registration */}
          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-36">
            {regUploaded ? (
              <div className="space-y-1 text-emerald-500">
                <CheckCircle className="h-8 w-8 mx-auto" />
                <p className="text-xs font-bold">Registration Doc Loaded</p>
                <button
                  type="button"
                  onClick={() => setRegUploaded(false)}
                  className="text-[10px] text-muted-foreground hover:text-rose-500 underline cursor-pointer"
                >
                  Replace file
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <UploadCloud className="h-8 w-8 text-muted-foreground/60 mx-auto" />
                <div>
                  <p className="text-xs font-bold text-foreground">Registration Permit</p>
                  <p className="text-[9px] text-muted-foreground">PDF or Image, max 10MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRegUploaded(true)}
                  className="px-3 py-1 text-[10px] bg-primary text-white font-bold rounded-lg cursor-pointer hover:opacity-90"
                >
                  Choose File
                </button>
              </div>
            )}
          </div>
        </div>
      </FormCard>

      {/* Form Action Triggers */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={triggerCancel}
          className="cursor-pointer font-bold text-xs"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading || isSubmitting}
          className="cursor-pointer font-bold text-xs"
        >
          Save Vehicle Record
        </Button>
      </div>
    </form>
  );
}

export default VehicleForm;
