'use client';

import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { VehicleHeader, VehicleForm } from '@/components/vehicles';
import { useCreateVehicle } from '@/hooks/useCreateVehicle';
import { useRouter } from 'next/navigation';

export default function NewVehiclePage() {
  const router = useRouter();
  const { createVehicle, isLoading } = useCreateVehicle();

  const handleFormSubmit = async (data: any) => {
    const res = await createVehicle(data);
    if (res) {
      router.push('/vehicles');
    }
  };

  return (
    <PageContainer className="py-6 space-y-6">
      <VehicleHeader
        title="Register Fleet Vehicle"
        subtitle="Submit regulatory, manufacturer specs and insurance files to add a new truck or van"
        actionText="" // Hide action button in form views
      />
      <div className="max-w-4xl mx-auto">
        <VehicleForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </PageContainer>
  );
}
