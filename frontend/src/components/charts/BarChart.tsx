import React from 'react';
import { cn } from '@/lib/utils';

export interface BarChartProps {
  className?: string;
}

const mockBars = [
  { label: 'Jan', height: '40%' },
  { label: 'Feb', height: '65%' },
  { label: 'Mar', height: '50%' },
  { label: 'Apr', height: '80%' },
  { label: 'May', height: '55%' },
  { label: 'Jun', height: '95%' },
  { label: 'Jul', height: '70%' },
];

export function BarChart({ className }: BarChartProps) {
  return (
    <div className={cn('w-full h-full flex flex-col justify-end select-none', className)}>
      <div className="flex items-end justify-between h-[130px] border-b border-border/70 px-2.5">
        {mockBars.map((bar, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1.5 w-1/12 group">
            <div
              className="w-full bg-primary rounded-t-md transition-all group-hover:bg-primary/95 group-hover:scale-y-[1.02] origin-bottom shadow-sm"
              style={{ height: bar.height }}
            />
          </div>
        ))}
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-[9px] font-semibold text-muted-foreground mt-2 px-1">
        {mockBars.map((bar, idx) => (
          <span key={idx} className="w-12 text-center">
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default BarChart;
