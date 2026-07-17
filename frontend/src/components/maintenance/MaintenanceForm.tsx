'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { maintenanceSchema, MaintenanceSchemaInput } from '@/validation/maintenance.schema';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { activeVehicles as DEFAULT_VEHICLES } from '@/hooks/useVehicles';
import { AlertCircle, Save, ArrowLeft, Wrench, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { vehicleService } from '@/services/vehicle.service';

interface MaintenanceFormProps {
  initialValues?: Partial<MaintenanceSchemaInput>;
  onSubmit: (data: MaintenanceSchemaInput) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}

// Mapper to convert backend vehicle models to dropdown options
const mapBackendVehicle = (v: any) => ({
  id: String(v.id),
  name: v.vehicle_name || `${v.make} ${v.model}`,
  registrationNumber: v.registration_number,
  currentOdometer: parseInt(v.odometer) || 0,
  status: v.status?.toLowerCase() === 'on_trip' ? 'on_trip' : v.status?.toLowerCase() === 'available' ? 'available' : 'maintenance',
});

export function MaintenanceForm({ initialValues, onSubmit, isLoading = false, isEdit = false }: MaintenanceFormProps) {
  const [vehicles, setVehicles] = React.useState<any[]>([]);

  React.useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const vehiclesRes = await vehicleService.getVehicles().catch(() => []);
        if (!active) return;
        
        const rawVehicles = Array.isArray(vehiclesRes) ? vehiclesRes : (vehiclesRes as any).results || [];
        const backendVehicles = rawVehicles.map(mapBackendVehicle);
        
        // Merge backend data with default mock data, ensuring no duplicates
        const mergedVehicles = [
          ...backendVehicles,
          ...DEFAULT_VEHICLES.map(v => ({
            id: String(v.id),
            name: v.name,
            registrationNumber: v.registrationNumber,
            currentOdometer: v.currentOdometer,
            status: v.status
          })).filter(
            (mv) => !backendVehicles.some((bv: any) => bv.registrationNumber.toLowerCase() === mv.registrationNumber.toLowerCase())
          ),
        ];
        
        setVehicles(mergedVehicles);
      } catch (error) {
        console.error('Failed to load vehicles', error);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MaintenanceSchemaInput>({
    resolver: zodResolver(maintenanceSchema) as any,
    defaultValues: {
      type: 'routine',
      priority: 'medium',
      estimatedCost: 0,
      labourCost: 0,
      partsCost: 0,
      tax: 0,
      ...initialValues,
    },
  });

  const selectedVehicleId = watch('vehicleId');
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  // Sync vehicle parameters upon selection
  React.useEffect(() => {
    if (selectedVehicle) {
      setValue('vehicleRegistration', selectedVehicle.registrationNumber);
      setValue('vehicleOdometer', selectedVehicle.currentOdometer);
      setValue('vehicleStatus', selectedVehicle.status);
    }
  }, [selectedVehicleId, selectedVehicle, setValue]);

  const onSubmitForm = (data: MaintenanceSchemaInput) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 max-w-4xl mx-auto select-none text-left">
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6">
        
        {/* Section 1: Vehicle Information */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary text-[10px]">1</span>
            Vehicle Assignment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Select Vehicle</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg"
                value={selectedVehicleId || ''}
                onChange={(e) => setValue('vehicleId', e.target.value)}
                options={[
                  { value: '', label: 'Select vehicle...' },
                  ...vehicles.map((v) => ({
                    value: v.id,
                    label: `${v.registrationNumber} - ${v.name} (${v.status.toUpperCase()})`,
                  })),
                ]}
              />
              {errors.vehicleId && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.vehicleId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Registration</label>
                <Input
                  className="h-9 text-xs rounded-lg border-border/60 bg-muted/20 text-muted-foreground font-semibold"
                  {...register('vehicleRegistration')}
                  disabled
                  placeholder="TRK-000-X"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Odometer (mi)</label>
                <Input
                  type="number"
                  className="h-9 text-xs rounded-lg border-border/60 bg-muted/20 text-muted-foreground font-semibold"
                  {...register('vehicleOdometer')}
                  disabled
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {selectedVehicle && selectedVehicle.status === 'on_trip' && (
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2 text-amber-600 font-semibold">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] leading-normal">
                Notice: Selected vehicle is currently active on trip. Scheduling approved work orders will delay dispatch until maintenance completes.
              </p>
            </div>
          )}
        </div>

        {/* Section 2: Maintenance Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary text-[10px]">2</span>
            Maintenance Specifics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Issue Title</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. 50k Mile Routine Service"
                {...register('issueTitle')}
                error={!!errors.issueTitle}
              />
              {errors.issueTitle?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.issueTitle.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Service Type</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={watch('type') || 'routine'}
                  onChange={(e) => setValue('type', e.target.value as any)}
                  options={[
                    { value: 'routine', label: 'Routine Service' },
                    { value: 'repair', label: 'Mechanical Repair' },
                    { value: 'inspection', label: 'Safety Inspection' },
                    { value: 'breakdown', label: 'Roadside Breakdown' },
                  ]}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Priority</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={watch('priority') || 'medium'}
                  onChange={(e) => setValue('priority', e.target.value as any)}
                  options={[
                    { value: 'low', label: 'Low rating' },
                    { value: 'medium', label: 'Medium standard' },
                    { value: 'high', label: 'High priority' },
                    { value: 'critical', label: 'Critical priority' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Problem Description</label>
              <textarea
                rows={3}
                className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                placeholder="Details of defects, warning codes, or custom service checklists..."
                {...register('description')}
              />
              {errors.description && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Duration</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. 4 Hours, 2 Days"
                {...register('estimatedDuration')}
                error={!!errors.estimatedDuration}
              />
              {errors.estimatedDuration?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedDuration.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Assignment Details */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary text-[10px]">3</span>
            Technician & Workshop Assignment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Technician Name</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. Mark Sterling"
                {...register('technicianName')}
                error={!!errors.technicianName}
              />
              {errors.technicianName?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.technicianName.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Workshop / Garage</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="e.g. North Dallas Fleet Hub"
                {...register('workshop')}
                error={!!errors.workshop}
              />
              {errors.workshop?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.workshop.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Scheduled Start Date</label>
              <Input
                type="date"
                className="h-9 text-xs rounded-lg border-border/60 text-left"
                {...register('scheduledDate')}
                error={!!errors.scheduledDate}
              />
              {errors.scheduledDate?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.scheduledDate.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expected Completion Date</label>
              <Input
                type="date"
                className="h-9 text-xs rounded-lg border-border/60 text-left"
                {...register('completionDate')}
                error={!!errors.completionDate}
              />
              {errors.completionDate?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.completionDate.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Section 4: Financial Auditing */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-foreground border-b border-border/40 pb-2 uppercase tracking-wider flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-primary text-[10px]">4</span>
            Maintenance Financials
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Est. Cost (₹)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0"
                {...register('estimatedCost')}
                error={!!errors.estimatedCost}
              />
              {errors.estimatedCost?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.estimatedCost.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Labour Cost (₹)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0"
                {...register('labourCost')}
                error={!!errors.labourCost}
              />
              {errors.labourCost?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.labourCost.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Parts Cost (₹)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0"
                {...register('partsCost')}
                error={!!errors.partsCost}
              />
              {errors.partsCost?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.partsCost.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tax (₹)</label>
              <Input
                type="number"
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="0"
                {...register('tax')}
                error={!!errors.tax}
              />
              {errors.tax?.message && (
                <p className="text-[10px] text-rose-500 font-medium mt-0.5">{errors.tax.message}</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center pt-2">
        <Link href="/maintenance">
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
          {isEdit ? 'Update Work Order' : 'Save Work Order'}
        </Button>
      </div>
    </form>
  );
}

export default MaintenanceForm;
