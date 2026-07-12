import React from 'react';
import { cn } from '@/lib/utils';

export interface AreaChartProps {
  className?: string;
}

export function AreaChart({ className }: AreaChartProps) {
  return (
    <div className={cn('w-full h-full flex flex-col justify-between', className)}>
      <svg className="w-full h-[130px] text-muted-foreground/15" viewBox="0 0 100 35" preserveAspectRatio="none">
        {/* Grids */}
        <line x1="0" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="0.1" />
        <line x1="0" y1="18" x2="100" y2="18" stroke="currentColor" strokeWidth="0.1" />
        <line x1="0" y1="28" x2="100" y2="28" stroke="currentColor" strokeWidth="0.1" />

        {/* Gradient fill */}
        <defs>
          <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary, #2563eb)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--color-primary, #2563eb)" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        <path
          d="M0 28 Q10 20, 20 22 T40 10 T70 24 T90 12 T100 6 L100 35 L0 35 Z"
          fill="url(#areaGlow)"
        />

        <path
          d="M0 28 Q10 20, 20 22 T40 10 T70 24 T90 12 T100 6"
          fill="none"
          stroke="var(--color-primary, #2563eb)"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between text-[9px] font-semibold text-muted-foreground mt-2 px-1">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}

export default AreaChart;
