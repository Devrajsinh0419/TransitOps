import React from 'react';
import { cn } from '@/lib/utils';

export interface KeyValueProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
}

export function KeyValue({ label, value, className, ...props }: KeyValueProps) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)} {...props}>
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest select-none">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">
        {value}
      </span>
    </div>
  );
}

export default KeyValue;
