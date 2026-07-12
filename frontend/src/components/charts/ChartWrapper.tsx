import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartWrapper({ title, subtitle, actions, children, className }: ChartWrapperProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border/80 rounded-xl p-5 shadow-soft select-none flex flex-col justify-between w-full min-h-56',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="space-y-0.5">
          <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
          {subtitle && <p className="text-[11px] text-muted-foreground leading-normal">{subtitle}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div className="flex-1 w-full flex items-center justify-center min-h-[160px] relative">
        {children}
      </div>
    </div>
  );
}

export default ChartWrapper;
