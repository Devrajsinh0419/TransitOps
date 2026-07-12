import React from 'react';
import { cn } from '@/lib/utils';

export interface LineChartProps {
  className?: string;
}

export function LineChart({ className }: LineChartProps) {
  return (
    <div className={cn('w-full h-full flex flex-col justify-between', className)}>
      {/* Grid lines & line path */}
      <svg className="w-full h-[130px] text-muted-foreground/15" viewBox="0 0 100 35" preserveAspectRatio="none">
        {/* Horizontal grid lines */}
        <line x1="0" y1="5" x2="100" y2="5" stroke="currentColor" strokeWidth="0.1" />
        <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="0.1" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeWidth="0.1" />
        
        {/* Line Stroke */}
        <path
          d="M0 25 Q15 15, 30 18 T60 8 T90 20 T100 5"
          fill="none"
          stroke="var(--color-primary, #2563eb)"
          strokeWidth="0.6"
          strokeLinecap="round"
        />

        {/* Glow fill underneath */}
        <path
          d="M0 25 Q15 15, 30 18 T60 8 T90 20 T100 5 L100 35 L0 35 Z"
          fill="var(--color-primary, #2563eb)"
          fillOpacity="0.06"
        />
        
        {/* Helper dots */}
        <circle cx="30" cy="18" r="0.8" fill="var(--color-primary, #2563eb)" stroke="white" strokeWidth="0.2" />
        <circle cx="60" cy="8" r="0.8" fill="var(--color-primary, #2563eb)" stroke="white" strokeWidth="0.2" />
        <circle cx="90" cy="20" r="0.8" fill="var(--color-primary, #2563eb)" stroke="white" strokeWidth="0.2" />
      </svg>
      
      {/* X Axis Labels */}
      <div className="flex justify-between text-[9px] font-semibold text-muted-foreground mt-2 px-1">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}

export default LineChart;
