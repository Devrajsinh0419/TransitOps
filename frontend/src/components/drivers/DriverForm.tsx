'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { Upload, AlertTriangle, X, Check } from 'lucide-react';
import apiClient from '@/services/axios';

export interface DriverFormProps {
  initialData?: any;
  onSubmit: (data: DriverSchemaInput & {
    avatarUrl?: string;
    licenseScanUrl?: string;
    medicalCertificateUrl?: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

// ─── Reusable file upload zone ────────────────────────────────────────────────
interface FileUploadZoneProps {
  label: string;
  hint: string;
  accept: string;
  uploadType: 'photo' | 'license' | 'medical' | 'receipt';
  onUploaded: (url: string) => void;
}

function FileUploadZone({ label, hint, accept, uploadType, onUploaded }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', { description: 'Maximum allowed size is 10MB.' });
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', { description: 'Only PDF, JPG, PNG or WEBP are accepted.' });
      return;
    }

    setUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_type', uploadType);

      const response = await apiClient.post<{ url: string }>('/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setFileUrl(response.data.url);
      onUploaded(response.data.url);
      toast.success('File uploaded successfully');
    } catch (err: any) {
      const detail = err.response?.data?.detail || 'Upload failed. Please try again.';
      toast.error('Upload Error', { description: detail });
      setFileName(null);
    } finally {
      setUploading(false);
      // Reset native input so the same file can be re-selected
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleClear = () => {
    setFileName(null);
    setFileUrl(null);
    onUploaded('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
        disabled={uploading}
      />

      {!fileName ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full border border-dashed border-border rounded-xl p-4 flex flex-col items-center justify-center text-center bg-muted/10 min-h-24 hover:bg-muted/20 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Upload className="h-5 w-5 text-muted-foreground mb-1" />
          <span className="text-[10px] font-bold text-foreground">{label}</span>
          <span className="text-[8px] text-muted-foreground">{hint}</span>
        </button>
      ) : (
        <div className="border border-border/60 rounded-xl p-3 bg-muted/20 flex items-center justify-between min-h-24">
          <div className="flex items-center gap-2">
            {uploading ? (
              <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <Check className="h-5 w-5 text-emerald-500 shrink-0" />
            )}
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold text-foreground truncate max-w-[150px]">{fileName}</span>
              <span className="text-[8px] text-muted-foreground">
                {uploading ? 'Uploading...' : 'Uploaded successfully'}
              </span>
            </div>
          </div>
          {!uploading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main DriverForm ──────────────────────────────────────────────────────────
export function DriverForm({ initialData, onSubmit, isSubmitting = false }: DriverFormProps) {
  const router = useRouter();
  const [showExitDialog, setShowExitDialog] = useState(false);

  // URLs set after successful uploads to /api/upload/
  const [avatarUrl, setAvatarUrl] = useState<string>(initialData?.avatarUrl || '');
  const [licenseScanUrl, setLicenseScanUrl] = useState<string>(initialData?.licenseScanUrl || '');
  const [medicalCertificateUrl, setMedicalCertificateUrl] = useState<string>(
    initialData?.medicalCertificateUrl || ''
  );

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
      await onSubmit({
        ...data,
        avatarUrl: avatarUrl || undefined,
        licenseScanUrl: licenseScanUrl || undefined,
        medicalCertificateUrl: medicalCertificateUrl || undefined,
      });
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

          {/* ✅ Working profile photo upload */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Profile Photo</p>
            <FileUploadZone
              label="Upload Profile Photo"
              hint="PNG, JPG, WEBP up to 5MB"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              uploadType="photo"
              onUploaded={setAvatarUrl}
            />
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

          {/* ✅ Working license scan upload */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">License Scan</p>
            <FileUploadZone
              label="Upload License Scan"
              hint="PDF or JPG up to 10MB"
              accept="application/pdf,image/jpeg,image/jpg,image/png"
              uploadType="license"
              onUploaded={setLicenseScanUrl}
            />
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

          {/* ✅ Working medical certificate upload */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Medical Certificate</p>
            <FileUploadZone
              label="Upload Medical Certificate"
              hint="PDF file scan up to 10MB"
              accept="application/pdf,image/jpeg,image/jpg,image/png"
              uploadType="medical"
              onUploaded={setMedicalCertificateUrl}
            />
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
