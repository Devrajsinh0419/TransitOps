import React from 'react';
import { cn } from '@/lib/utils';

export interface DonutChartProps {
  className?: string;
}

export function DonutChart({ className }: DonutChartProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-around w-full gap-6 select-none', className)}>
      {/* Circle Wheel SVG */}
      <div className="relative h-28 w-28 shrink-0 flex items-center justify-center">
        <svg className="h-full w-full rotate-[-90deg] absolute" viewBox="0 0 32 32">
          {/* Segment 1: 60% */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-primary, #2563eb)"
            strokeWidth="3.2"
            strokeDasharray="53 88"
            strokeDashoffset="0"
          />
          {/* Segment 2: 25% */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-rose-500, #f43f5e)"
            strokeWidth="3.2"
            strokeDasharray="22 88"
            strokeDashoffset="-53"
          />
          {/* Segment 3: 15% */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="transparent"
            stroke="var(--color-zinc-400, #a1a1aa)"
            strokeWidth="3.2"
            strokeDasharray="13 88"
            strokeDashoffset="-75"
          />
        </svg>
        {/* Core Center cutout */}
        <div className="text-center z-10">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Total</span>
          <span className="text-base font-extrabold text-foreground">1,248</span>
        </div>
      </div>

      {/* Legends */}
      <div className="flex flex-col gap-2.5 text-xs font-semibold text-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span>On Road (60%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500" />
          <span>In Shop (25%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-zinc-400" />
          <span>Idle (15%)</span>
        </div>
      </div>
    </div>
  );
}

export default DonutChart;
