import React from 'react';
import { cn } from '@/lib/utils';

export type StatusDotVariant = 'success' | 'error' | 'warning' | 'info' | 'gray';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: StatusDotVariant;
  pulse?: boolean;
}

const colorStyles: Record<StatusDotVariant, string> = {
  success: 'bg-emerald-500',
  error: 'bg-rose-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  gray: 'bg-zinc-400',
};

const pulseStyles: Record<StatusDotVariant, string> = {
  success: 'bg-emerald-400',
  error: 'bg-rose-400',
  warning: 'bg-amber-400',
  info: 'bg-blue-400',
  gray: 'bg-zinc-300',
};

export function StatusDot({ variant = 'gray', pulse = false, className, ...props }: StatusDotProps) {
  return (
    <span className={cn('relative flex h-2 w-2 shrink-0 select-none', className)} {...props}>
      {pulse && (
        <span
          className={cn(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            pulseStyles[variant]
          )}
        />
      )}
      <span className={cn('relative inline-flex rounded-full h-2 w-2', colorStyles[variant])} />
    </span>
  );
}

export default StatusDot;
