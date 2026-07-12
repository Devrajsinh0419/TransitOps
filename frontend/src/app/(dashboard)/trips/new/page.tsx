'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { TripHeader, TripForm } from '@/components/trips';
import { useCreateTrip } from '@/hooks/useCreateTrip';
import { TripSchemaInput } from '@/validation/trip.schema';

export default function NewTripPage() {
  const router = useRouter();
  const { createTrip, isLoading } = useCreateTrip();

  const handleSubmit = async (data: TripSchemaInput) => {
    const success = await createTrip(data);
    if (success) {
      router.push('/trips');
    }
  };

  return (
    <PageContainer className="space-y-6">
      <TripHeader
        title="Register New Trip"
        subtitle="Create an enterprise commercial shipping manifest and assign active fleet assets."
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: 'Register' },
        ]}
      />

      <div className="py-4">
        <TripForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </PageContainer>
  );
}
