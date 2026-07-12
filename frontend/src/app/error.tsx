'use client';

import React, { useEffect } from 'react';
import { ErrorState } from '@/components/common/ErrorState';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Captured by global error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-6">
      <ErrorState
        title="Application Exception"
        message={error.message || 'An unexpected runtime error occurred. Please try reloading the platform.'}
        onRetry={() => reset()}
      />
    </div>
  );
}
