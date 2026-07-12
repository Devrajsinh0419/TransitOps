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
import { Save, ArrowLeft, Fuel, FileText, X } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/services/axios';
import { toast } from 'sonner';

interface FuelFormProps {
  onSubmit: (data: FuelSchemaInput) => void;
  isLoading?: boolean;
}

export function FuelForm({ onSubmit, isLoading = false }: FuelFormProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Validation Error', { description: 'File size exceeds 5MB limit.' });
        return;
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Validation Error', { description: 'Only PDF, JPEG, and PNG files are allowed.' });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadFile = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await apiClient.post<{ url: string }>('/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url;
    } catch (err: any) {
      toast.error('Upload Error', { description: 'Failed to upload attachment.' });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmitForm = async (data: FuelSchemaInput) => {
    let attachmentUrl = data.attachmentUrl;
    if (selectedFile) {
      const uploadedUrl = await handleUploadFile(selectedFile);
      if (!uploadedUrl) return;
      attachmentUrl = uploadedUrl;
    }
    onSubmit({ ...data, attachmentUrl });
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Price per Liter (₹)</label>
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
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Transaction Cost (₹)</label>
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

          {/* Refuel Receipt Attachment */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Refuel Receipt Attachment
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf,image/jpeg,image/png,image/jpg"
              className="hidden"
            />
            
            {!selectedFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-border/60 rounded-xl p-4 bg-muted/5 flex flex-col items-center justify-center gap-1 hover:bg-muted/10 transition-colors cursor-pointer"
              >
                <FileText className="h-6 w-6 text-muted-foreground/60" />
                <span className="text-[10px] font-bold text-foreground">Upload refuel receipt invoice image</span>
                <span className="text-[8px] text-muted-foreground">PDF, JPEG, PNG up to 5MB</span>
              </div>
            ) : (
              <div className="border border-border/60 rounded-xl p-3 bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-foreground truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                    <span className="text-[8px] text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {uploading && (
              <span className="text-[8px] font-bold text-primary animate-pulse">Uploading file...</span>
            )}
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
