'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { VehicleHeader, VehicleForm, VehicleFormSkeleton } from '@/components/vehicles';
import { useVehicle } from '@/hooks/useVehicle';
import { useUpdateVehicle } from '@/hooks/useUpdateVehicle';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function EditVehiclePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { vehicle, isLoading: detailLoading, error } = useVehicle(id);
  const { updateVehicle, isLoading: updateLoading } = useUpdateVehicle();

  const handleFormSubmit = async (data: any) => {
    const res = await updateVehicle(id, data);
    if (res) {
      router.push(`/vehicles/${id}`);
    }
  };

  if (detailLoading) {
    return (
      <PageContainer className="py-6 space-y-6">
        <div className="flex flex-col gap-1 pb-4 border-b border-border/60">
          <div className="h-3 w-32 bg-muted rounded"></div>
          <div className="h-6 w-52 bg-muted rounded mt-2"></div>
        </div>
        <VehicleFormSkeleton />
      </PageContainer>
    );
  }

  if (error || !vehicle) {
    return (
      <PageContainer className="flex-1 flex flex-col items-center justify-center py-16 text-center select-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 mb-4">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-base font-bold text-foreground">Vehicle Not Found</h2>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6">
          The requested vehicle identifier could not be retrieved from the active registry.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push('/vehicles')}
          className="cursor-pointer font-bold"
        >
          Return to Registry
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-6 space-y-6">
      <VehicleHeader
        title={`Edit vehicle: ${vehicle.name}`}
        subtitle={`Update plate number, regulatory insurance terms, or maintenance status`}
        actionText="" // Hide action button in form views
      />
      <div className="max-w-4xl mx-auto">
        <VehicleForm
          initialData={vehicle}
          onSubmit={handleFormSubmit}
          isLoading={updateLoading}
        />
      </div>
    </PageContainer>
  );
}
