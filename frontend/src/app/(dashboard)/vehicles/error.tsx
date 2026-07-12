'use client';

import React, { useEffect } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function VehiclesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Vehicles registry error:', error);
  }, [error]);

  return (
    <PageContainer className="flex-1 flex flex-col items-center justify-center py-16 text-center select-none">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 mb-4 animate-bounce">
        <AlertCircle className="h-7 w-7" />
      </div>
      <h2 className="text-base font-bold text-foreground">Unable to Load Vehicles Registry</h2>
      <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6 leading-relaxed">
        We encountered a problem loading the fleet records. Please check database connectivity or retry.
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={reset}
        leftIcon={<RefreshCw className="h-4 w-4" />}
        className="cursor-pointer font-bold"
      >
        Retry Registry Connection
      </Button>
    </PageContainer>
  );
}
