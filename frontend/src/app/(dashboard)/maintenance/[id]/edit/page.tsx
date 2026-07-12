'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMaintenanceDetails } from '@/hooks/useMaintenanceDetails';
import { useUpdateMaintenance } from '@/hooks/useUpdateMaintenance';
import { MaintenanceForm } from '@/components/maintenance';
import { Wrench, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function EditMaintenancePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { record, isLoading: isDetailsLoading, error } = useMaintenanceDetails(id);
  const { updateMaintenance, isLoading: isUpdating } = useUpdateMaintenance();

  if (isDetailsLoading) {
    return (
      <div className="h-60 flex items-center justify-center text-xs font-semibold text-muted-foreground animate-pulse">
        Fetching workshop service ticket...
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="p-8 border border-dashed border-border/50 rounded-2xl text-center space-y-4 max-w-md mx-auto mt-12">
        <ShieldAlert className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">{error || 'Ticket not found'}</h3>
        <Button variant="outline" size="sm" onClick={() => router.push('/maintenance')} className="h-9 rounded-lg">
          Back to Maintenance
        </Button>
      </div>
    );
  }

  const handleFormSubmit = async (data: any) => {
    const success = await updateMaintenance(record.id, data);
    if (success) {
      router.push(`/maintenance/${record.id}`);
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="pb-4 border-b border-border/40">
        <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
          <Wrench className="h-5 w-5 text-primary" />
          Edit Work Order {record.maintenanceId}
        </h1>
        <p className="text-xs text-muted-foreground">
          Update service technician assignments, scheduled dates, or financial estimates.
        </p>
      </div>

      <MaintenanceForm
        initialValues={record as any}
        onSubmit={handleFormSubmit}
        isLoading={isUpdating}
        isEdit
      />
    </div>
  );
}
