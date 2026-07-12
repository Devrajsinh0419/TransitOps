'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { DriverHeader, DriverForm } from '@/components/drivers';
import { useCreateDriver } from '@/hooks/useCreateDriver';
import { toast } from 'sonner';

export default function RegisterDriverPage() {
  const router = useRouter();
  const { createDriver, isLoading } = useCreateDriver();

  const handleRegisterSubmit = async (data: any) => {
    try {
      const created = await createDriver(data);
      if (created) {
        router.push('/drivers');
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to register driver profile.');
    }
  };

  return (
    <PageContainer className="space-y-6">
      <DriverHeader
        title="Register New Driver"
        subtitle="Onboard a fleet operator by providing personal contact, licensing compliance and health clearances"
      />
      <div className="pt-2">
        <DriverForm onSubmit={handleRegisterSubmit} isSubmitting={isLoading} />
      </div>
    </PageContainer>
  );
}
