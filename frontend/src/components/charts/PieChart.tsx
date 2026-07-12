import React from 'react';
import { cn } from '@/lib/utils';

export interface PieChartProps {
  className?: string;
}

export function PieChart({ className }: PieChartProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-around w-full gap-6 select-none', className)}>
      {/* Circle Wheel SVG */}
      <div className="relative h-28 w-28 shrink-0">
        <svg className="h-full w-full rotate-[-90deg]" viewBox="0 0 32 32">
          {/* Segment 1: 50% (emerald-500) */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-emerald-500, #10b981)"
            strokeWidth="4"
            strokeDasharray="44 88"
            strokeDashoffset="0"
          />
          {/* Segment 2: 30% (primary/blue) */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-primary, #2563eb)"
            strokeWidth="4"
            strokeDasharray="26 88"
            strokeDashoffset="-44"
          />
          {/* Segment 3: 20% (amber-500) */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-amber-500, #f59e0b)"
            strokeWidth="4"
            strokeDasharray="18 88"
            strokeDashoffset="-70"
          />
        </svg>
      </div>

      {/* Legends */}
      <div className="flex flex-col gap-2.5 text-xs font-semibold text-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span>Completed (50%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>Active (30%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <span>Pending (20%)</span>
        </div>
      </div>
    </div>
  );
}

export default PieChart;
