'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ReportsError({ error, reset }: ErrorProps) {
  React.useEffect(() => {
    console.error('Reports module failed:', error);
  }, [error]);

  return (
    <div className="select-none text-center p-12 border border-dashed border-border/50 rounded-2xl max-w-md mx-auto space-y-4 my-12">
      <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto" />
      <div className="space-y-1">
        <h2 className="text-sm font-black text-foreground uppercase tracking-wider">
          Unable to Load Reports
        </h2>
        <p className="text-xs text-muted-foreground leading-normal">
          An unexpected error occurred while compiling analytical dataset logs. Please check network connection or retry.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="h-9 rounded-lg text-xs"
        >
          Check Connection
        </Button>

        <Button
          onClick={() => reset()}
          className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5"
          leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
        >
          Retry Compilation
        </Button>
      </div>
    </div>
  );
}
