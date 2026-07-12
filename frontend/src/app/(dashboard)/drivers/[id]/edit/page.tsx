'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Button } from '@/components/ui/Button';
import { DriverHeader, DriverForm, DriverSkeleton } from '@/components/drivers';
import { useDriver } from '@/hooks/useDriver';
import { useUpdateDriver } from '@/hooks/useUpdateDriver';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

export default function EditDriverPage() {
  const router = useRouter();
  const params = useParams();
  const driverId = params.id as string;

  const { driver, isLoading, error } = useDriver(driverId);
  const { updateDriver, isLoading: isUpdating } = useUpdateDriver();

  const handleEditSubmit = async (data: any) => {
    try {
      const success = await updateDriver(driverId, data);
      if (success) {
        router.push(`/drivers/${driverId}`);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update driver profile.');
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground select-none">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0 flex items-center justify-center">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-semibold">Loading Form...</span>
        </div>
        <DriverSkeleton.Profile />
      </PageContainer>
    );
  }

  if (error || !driver) {
    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground select-none">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0 flex items-center justify-center">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-semibold">Back</span>
        </div>
        <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto bg-card">
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-base font-extrabold text-foreground">Driver Not Found</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            The driver you are trying to edit does not exist or has been removed from active memory.
          </p>
          <Button onClick={() => router.push('/drivers')} className="mt-5 text-xs font-bold px-4 h-9 rounded-lg">
            Back to Directory
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 border border-border/60 p-0 flex items-center justify-center">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-bold text-foreground">Back to Profile</span>
      </div>

      <DriverHeader
        title={`Edit Driver: ${driver.name}`}
        subtitle="Modify profile registration details, contact credentials, license compliance or health parameters"
      />

      <div className="pt-2">
        <DriverForm initialData={driver} onSubmit={handleEditSubmit} isSubmitting={isUpdating} />
      </div>
    </PageContainer>
  );
}
