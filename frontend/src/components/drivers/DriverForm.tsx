'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { driverSchema, DriverSchemaInput } from '@/validation/driver.schema';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { FormField } from '../forms/FormField';
import { FormCard } from '../forms/FormCard';
import { Modal } from '../dialogs/Modal';
import { toast } from 'sonner';
import { Upload, AlertTriangle } from 'lucide-react';

export interface DriverFormProps {
  initialData?: any;
  onSubmit: (data: DriverSchemaInput) => Promise<void>;
  isSubmitting?: boolean;
}

export function DriverForm({ initialData, onSubmit, isSubmitting = false }: DriverFormProps) {
  const router = useRouter();
  const [showExitDialog, setShowExitDialog] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = useForm<DriverSchemaInput>({
    resolver: zodResolver(driverSchema) as any,
    defaultValues: initialData || {
      gender: 'male',
      status: 'available',
      bloodGroup: 'O+',
      healthStatus: 'fit',
      safetyScore: 100,
      experienceYears: 0,
      licenseCategory: 'Class A CDL',
    },
  });

  const genderValue = watch('gender');
  const licenseCategoryValue = watch('licenseCategory');
  const statusValue = watch('status');
  const bloodGroupValue = watch('bloodGroup');
  const healthStatusValue = watch('healthStatus');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleCancel = () => {
    if (isDirty) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  };

  const handleConfirmExit = () => {
    reset();
    router.back();
  };

  const onFormSubmit = async (data: DriverSchemaInput) => {
    try {
      await onSubmit(data);
      reset(data);
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while saving.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 max-w-4xl mx-auto pb-16 select-none text-left">
      {isDirty && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          You have unsaved changes. Leaving or reloading will discard your progress.
        </div>
      )}

      {/* Section 1: Personal Information */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
          <p className="text-[10px] text-muted-foreground">Primary driver identification and contact details</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Full Name" error={errors.name?.message}>
            <Input {...register('name')} placeholder="e.g. Marcus Miller" />
          </FormField>
          
          <FormField label="Employee ID" error={errors.employeeId?.message}>
            <Input {...register('employeeId')} placeholder="e.g. EMP-291-A" />
          </FormField>

          <FormField label="Gender" error={errors.gender?.message}>
            <Select
              value={genderValue}
              onChange={(e) => setValue('gender', e.target.value as any, { shouldDirty: true })}
              placeholder="Select Gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </FormField>

          <FormField label="Date of Birth" error={errors.dob?.message}>
            <Input {...register('dob')} type="date" />
          </FormField>

          <FormField label="Phone Number" error={errors.phone?.message}>
            <Input {...register('phone')} placeholder="e.g. +15550192831" />
          </FormField>

          <FormField label="Email Address" error={errors.email?.message}>
            <Input {...register('email')} type="email" placeholder="e.g. marcus.miller@transitops.com" />
          </FormField>

          <div className="md:col-span-3">
            <FormField label="Physical Address" error={errors.address?.message}>
              <Input {...register('address')} placeholder="e.g. 4221 Oak Avenue, Houston, TX 77002" />
            </FormField>
          </div>

          <FormField label="Emergency Contact Name" error={errors.emergencyContact?.message}>
            <Input {...register('emergencyContact')} placeholder="e.g. Sarah Miller" />
          </FormField>

          <FormField label="Emergency Phone" error={errors.emergencyPhone?.message}>
            <Input {...register('emergencyPhone')} placeholder="e.g. +15550192832" />
          </FormField>

          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-24">
            <Upload className="h-5 w-5 text-muted-foreground mb-1" />
            <span className="text-[10px] font-bold text-foreground">Profile Photo</span>
            <span className="text-[8px] text-muted-foreground">PNG, JPG up to 5MB</span>
          </div>
        </div>
      </FormCard>

      {/* Section 2: License Information */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">License & Compliance</h3>
          <p className="text-[10px] text-muted-foreground">Driver commercial license credentials and expirations</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="License Number" error={errors.licenseNumber?.message}>
            <Input {...register('licenseNumber')} placeholder="e.g. TX-DL-9482910" />
          </FormField>

          <FormField label="License Category" error={errors.licenseCategory?.message}>
            <Select
              value={licenseCategoryValue}
              onChange={(e) => setValue('licenseCategory', e.target.value as any, { shouldDirty: true })}
              placeholder="Select Category"
              options={[
                { value: 'Class A CDL', label: 'Class A CDL' },
                { value: 'Class B CDL', label: 'Class B CDL' },
                { value: 'Class C CDL', label: 'Class C CDL' },
                { value: 'Class D', label: 'Class D (Standard)' },
                { value: 'Class M', label: 'Class M (Motorcycle)' },
              ]}
            />
          </FormField>

          <FormField label="Issuing Authority" error={errors.issuingAuthority?.message}>
            <Input {...register('issuingAuthority')} placeholder="e.g. Texas DMV" />
          </FormField>

          <FormField label="Issue Date" error={errors.licenseIssueDate?.message}>
            <Input {...register('licenseIssueDate')} type="date" />
          </FormField>

          <FormField label="Expiration Date" error={errors.licenseExpiry?.message}>
            <Input {...register('licenseExpiry')} type="date" />
          </FormField>

          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-24">
            <Upload className="h-5 w-5 text-muted-foreground mb-1" />
            <span className="text-[10px] font-bold text-foreground">License Scan</span>
            <span className="text-[8px] text-muted-foreground">PDF or JPG up to 10MB</span>
          </div>
        </div>
      </FormCard>

      {/* Section 3: Employment */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Employment</h3>
          <p className="text-[10px] text-muted-foreground">Staff joining details, experience and wage terms</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Joining Date" error={errors.joiningDate?.message}>
            <Input {...register('joiningDate')} type="date" />
          </FormField>

          <FormField label="Department" error={errors.department?.message}>
            <Input {...register('department')} placeholder="e.g. Heavy Logistics" />
          </FormField>

          <FormField label="Experience (Years)" error={errors.experienceYears?.message}>
            <Input {...register('experienceYears')} type="number" placeholder="e.g. 5" />
          </FormField>

          <FormField label="Current Status" error={errors.status?.message}>
            <Select
              value={statusValue}
              onChange={(e) => setValue('status', e.target.value as any, { shouldDirty: true })}
              placeholder="Select Status"
              options={[
                { value: 'available', label: 'Available' },
                { value: 'on_trip', label: 'On Trip' },
                { value: 'off_duty', label: 'Off Duty' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'leave', label: 'On Leave' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </FormField>

          <FormField label="Salary (Annual Base)" error={errors.salaryPlaceholder?.message}>
            <Input {...register('salaryPlaceholder')} type="number" placeholder="e.g. 68000" />
          </FormField>
        </div>
      </FormCard>

      {/* Section 4: Health */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Health & Clearances</h3>
          <p className="text-[10px] text-muted-foreground">Blood group, DOT medical status and test files</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Blood Group" error={errors.bloodGroup?.message}>
            <Select
              value={bloodGroupValue}
              onChange={(e) => setValue('bloodGroup', e.target.value as any, { shouldDirty: true })}
              placeholder="Select Blood Group"
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A-', label: 'A-' },
                { value: 'B+', label: 'B+' },
                { value: 'B-', label: 'B-' },
                { value: 'O+', label: 'O+' },
                { value: 'O-', label: 'O-' },
                { value: 'AB+', label: 'AB+' },
                { value: 'AB-', label: 'AB-' },
              ]}
            />
          </FormField>

          <FormField label="Health Status" error={errors.healthStatus?.message}>
            <Select
              value={healthStatusValue}
              onChange={(e) => setValue('healthStatus', e.target.value as any, { shouldDirty: true })}
              placeholder="Select Health Status"
              options={[
                { value: 'fit', label: 'Fit for Duty' },
                { value: 'monitoring', label: 'Under Monitoring' },
                { value: 'unfit', label: 'Unfit for Duty' },
              ]}
            />
          </FormField>

          <div className="border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-20">
            <Upload className="h-4.5 w-4.5 text-muted-foreground mb-1" />
            <span className="text-[10px] font-bold text-foreground">Medical Certificate</span>
            <span className="text-[8px] text-muted-foreground">PDF file scan</span>
          </div>
        </div>
      </FormCard>

      {/* Section 5: Performance */}
      <FormCard>
        <div className="border-b border-border/60 pb-3 mb-4">
          <h3 className="text-sm font-bold text-foreground">Performance & Initial Notes</h3>
          <p className="text-[10px] text-muted-foreground">Initial safety score weighting and profile remarks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Initial Safety Score (0-100)" error={errors.safetyScore?.message}>
            <Input {...register('safetyScore')} type="number" placeholder="e.g. 100" />
          </FormField>

          <div className="md:col-span-3">
            <FormField label="Compliance Notes / Remarks" error={errors.notes?.message}>
              <textarea
                {...register('notes')}
                rows={3}
                placeholder="Additional notes about driver profile, history or onboarding details..."
                className="w-full text-xs p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </FormField>
          </div>
        </div>
      </FormCard>

      {/* Actions panel */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/50 max-w-3xl mx-auto">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="font-semibold text-xs h-9 px-4 rounded-lg border-border/60"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="font-bold text-xs h-9 px-6 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm hover:shadow transition-all"
        >
          {isSubmitting ? 'Saving Driver...' : 'Save Driver'}
        </Button>
      </div>

      {/* Exit Dialog Modal */}
      <Modal
        isOpen={showExitDialog}
        onClose={() => setShowExitDialog(false)}
        title="Discard Unsaved Changes?"
        size="sm"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExitDialog(false)}
              className="text-xs font-semibold h-9 rounded-lg"
            >
              Keep Editing
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmExit}
              className="text-xs font-bold h-9 rounded-lg bg-rose-600 hover:bg-rose-500 text-white"
            >
              Discard Changes
            </Button>
          </>
        }
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          You have made modifications to this driver profile. Leaving now will permanently discard all unsaved edits.
        </p>
      </Modal>
    </form>
  );
}

export default DriverForm;
