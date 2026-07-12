'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateMaintenance } from '@/hooks/useCreateMaintenance';
import { MaintenanceForm } from '@/components/maintenance';
import { Wrench } from 'lucide-react';

export default function NewMaintenancePage() {
  const router = useRouter();
  const { createMaintenance, isLoading } = useCreateMaintenance();

  const handleFormSubmit = async (data: any) => {
    const success = await createMaintenance(data);
    if (success) {
      router.push('/maintenance');
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="pb-4 border-b border-border/40">
        <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
          <Wrench className="h-5 w-5 text-primary" />
          Schedule Fleet Maintenance
        </h1>
        <p className="text-xs text-muted-foreground">
          Register new workshop requests. Tickets start in a PENDING review state.
        </p>
      </div>

      <MaintenanceForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}
