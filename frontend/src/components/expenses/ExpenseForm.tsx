'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { expenseSchema, ExpenseSchemaInput } from '@/validation/expense.schema';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { activeVehicles as DEFAULT_VEHICLES } from '@/hooks/useVehicles';
import { activeTrips as DEFAULT_TRIPS } from '@/hooks/useTrips';
import { Save, ArrowLeft, Receipt, Paperclip, X } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/services/axios';
import { toast } from 'sonner';
import { vehicleService } from '@/services/vehicle.service';
import { tripService } from '@/services/trip.service';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseSchemaInput) => void;
  isLoading?: boolean;
}

// Mappers to convert backend models to dropdown options
const mapBackendVehicle = (v: any) => ({
  id: String(v.id),
  name: v.vehicle_name || `${v.make} ${v.model}`,
  registrationNumber: v.registration_number,
});

const mapBackendTrip = (t: any) => ({
  id: String(t.id),
  tripNumber: t.trip_number || t.tripNumber || `TRP-${t.id}`,
  tripName: t.tripName || t.trip_name || `Trip ${t.id}`,
});

export function ExpenseForm({ onSubmit, isLoading = false }: ExpenseFormProps) {
  const [vehicles, setVehicles] = React.useState<any[]>([]);
  const [trips, setTrips] = React.useState<any[]>([]);

  React.useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [vehiclesRes, tripsRes] = await Promise.all([
          vehicleService.getVehicles().catch(() => []),
          tripService.getTrips().catch(() => []),
        ]);
        
        if (!active) return;
        
        const rawVehicles = Array.isArray(vehiclesRes) ? vehiclesRes : (vehiclesRes as any).results || [];
        const rawTrips = Array.isArray(tripsRes) ? tripsRes : (tripsRes as any).results || [];
        
        const backendVehicles = rawVehicles.map(mapBackendVehicle);
        const backendTrips = rawTrips.map(mapBackendTrip);
        
        // Merge backend data with default mock data, ensuring no duplicates
        const mergedVehicles = [
          ...backendVehicles,
          ...DEFAULT_VEHICLES.map(v => ({ id: String(v.id), name: v.name, registrationNumber: v.registrationNumber })).filter(
            (mv) => !backendVehicles.some((bv: any) => bv.registrationNumber.toLowerCase() === mv.registrationNumber.toLowerCase())
          ),
        ];
        
        const mergedTrips = [
          ...backendTrips,
          ...DEFAULT_TRIPS.map(t => ({ id: String(t.id), tripNumber: t.tripNumber, tripName: t.tripName })).filter(
            (mt) => !backendTrips.some((bt: any) => bt.tripNumber.toLowerCase() === mt.tripNumber.toLowerCase())
          ),
        ];
        
        setVehicles(mergedVehicles);
        setTrips(mergedTrips);
      } catch (error) {
        console.error('Failed to load assets', error);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ExpenseSchemaInput>({
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: {
      amount: 0,
      gstAmount: 0,
      paymentMethod: 'Fleet Card',
      date: new Date().toISOString().split('T')[0],
      expenseType: 'miscellaneous',
    },
  });

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

  const onSubmitForm = async (data: ExpenseSchemaInput) => {
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
        
        {/* Step 1: Expense Type and Association */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            Audit Parameters & Asset Mapping
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expense Type</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg capitalize"
                value={watch('expenseType') || 'miscellaneous'}
                onChange={(e) => setValue('expenseType', e.target.value as any)}
                options={[
                  { value: 'fuel', label: 'Fuel Refill' },
                  { value: 'maintenance', label: 'Vehicle Maintenance' },
                  { value: 'insurance', label: 'Insurance Premium' },
                  { value: 'toll', label: 'Road Toll fees' },
                  { value: 'parking', label: 'Vehicle Parking' },
                  { value: 'repairs', label: 'Emergency Repairs' },
                  { value: 'registration', label: 'State Registration' },
                  { value: 'miscellaneous', label: 'Miscellaneous Cost' },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Related Vehicle (Optional)</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('vehicleId') || ''}
                onChange={(e) => setValue('vehicleId', e.target.value)}
                options={[
                  { value: '', label: 'No vehicle' },
                  ...vehicles.map((v) => ({
                    value: v.id,
                    label: `${v.registrationNumber} - ${v.name}`,
                  })),
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Manifest (Optional)</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('tripId') || ''}
                onChange={(e) => setValue('tripId', e.target.value)}
                options={[
                  { value: '', label: 'No trip' },
                  ...trips.map((t) => ({
                    value: t.id,
                    label: `${t.tripNumber} - ${t.tripName}`,
                  })),
                ]}
              />
            </div>
          </div>
        </div>

        {/* Step 2: Financial Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary text-[10px]">₹</span>
            Financial Auditing Specifics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Cost Amount (₹)</label>
              <Input
                type="number"
                step="0.01"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0.00"
                {...register('amount')}
                error={!!errors.amount}
              />
              {errors.amount?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">GST component (₹)</label>
              <Input
                type="number"
                step="0.01"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0.00"
                {...register('gstAmount')}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Payment Method</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={watch('paymentMethod') || 'Fleet Card'}
                onChange={(e) => setValue('paymentMethod', e.target.value)}
                options={[
                  { value: 'Fleet Card', label: 'Fleet Card' },
                  { value: 'Corporate Visa Card', label: 'Corporate Visa Card' },
                  { value: 'EZ-Pass Transponder', label: 'EZ-Pass Transponder' },
                  { value: 'Bank Transfer', label: 'Direct Bank Transfer' },
                  { value: 'Cash', label: 'Cash reimbursement' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vendor Name</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. Shell, Progressive, DOT Shop"
                {...register('vendor')}
                error={!!errors.vendor}
              />
              {errors.vendor?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.vendor.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Invoice / Reference ID</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. INV-EXP-8820"
                {...register('invoiceNumber')}
                error={!!errors.invoiceNumber}
              />
              {errors.invoiceNumber?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.invoiceNumber.message}</p>
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

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expense Audit Description</label>
            <textarea
              rows={3}
              className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
              placeholder="Provide cost reasons, audit notes, or trip context..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.description.message}</p>
            )}
          </div>

          {/* Attachment Invoice / Receipt */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Attachment Invoice / Receipt
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
                <Paperclip className="h-6 w-6 text-muted-foreground/60" />
                <span className="text-[10px] font-bold text-foreground">Attach expense invoice or receipt image</span>
                <span className="text-[8px] text-muted-foreground">PDF, JPEG, PNG up to 5MB</span>
              </div>
            ) : (
              <div className="border border-border/60 rounded-xl p-3 bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Paperclip className="h-5 w-5 text-primary shrink-0" />
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
        <Link href="/expenses">
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
          Submit Expense
        </Button>
      </div>
    </form>
  );
}

export default ExpenseForm;
