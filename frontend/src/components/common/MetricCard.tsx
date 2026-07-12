import React from 'react';
import { cn } from '@/lib/utils';

export interface MetricCardProps {
  title: string;
  metric: string | number;
  subtext?: string;
  badge?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, metric, subtext, badge, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border/80 rounded-xl p-5 shadow-soft select-none flex flex-col justify-between',
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      
      <div className="mt-4">
        <span className="text-3xl font-extrabold tracking-tight text-foreground block">
          {metric}
        </span>
        {subtext && (
          <span className="text-xs text-muted-foreground mt-1.5 block">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
}

export default MetricCard;
