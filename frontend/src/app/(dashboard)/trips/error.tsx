'use client';

import React, { useEffect } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Button } from '@/components/ui/Button';
import { AlertOctagon, RefreshCw } from 'lucide-react';

export default function TripsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Trips route error:', error);
  }, [error]);

  return (
    <PageContainer className="flex items-center justify-center min-h-[70vh] select-none text-left">
      <div className="text-center py-12 px-6 border border-border/60 bg-card rounded-2xl max-w-md shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 mx-auto mb-4">
          <AlertOctagon className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-extrabold text-foreground tracking-tight">Unable to Load Trips</h2>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-semibold">
          An error occurred while loading the shipping manifests. Please check connection logs or reset page filters.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="text-xs font-semibold h-9 rounded-lg border-border/60"
          >
            Reload Window
          </Button>
          <Button
            onClick={reset}
            className="text-xs font-bold h-9 rounded-lg gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry Request
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
