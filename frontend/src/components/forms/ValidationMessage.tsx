import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ValidationMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
  success?: string;
}

export function ValidationMessage({ error, success, className, ...props }: ValidationMessageProps) {
  if (!error && !success) return null;

  return (
    <div
      className={cn('flex items-center gap-1.5 text-[11px] font-medium leading-relaxed', className)}
      {...props}
    >
      {error ? (
        <>
          <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0" />
          <span className="text-destructive">{error}</span>
        </>
      ) : (
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-emerald-600 dark:text-emerald-400">{success}</span>
        </>
      )}
    </div>
  );
}

export default ValidationMessage;
