'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateFuelLog } from '@/hooks/useCreateFuelLog';
import { FuelForm } from '@/components/fuel';
import { Fuel } from 'lucide-react';

export default function NewFuelPage() {
  const router = useRouter();
  const { createFuelLog, isLoading } = useCreateFuelLog();

  const handleFormSubmit = async (data: any) => {
    const success = await createFuelLog(data);
    if (success) {
      router.push('/fuel');
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="pb-4 border-b border-border/40">
        <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
          <Fuel className="h-5 w-5 text-primary" />
          Log Fuel Refilling
        </h1>
        <p className="text-xs text-muted-foreground">
          Register refuel receipts to audit vehicle gas/diesel consumption and calibrate odometers.
        </p>
      </div>

      <FuelForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}
