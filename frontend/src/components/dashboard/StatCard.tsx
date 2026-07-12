'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../cards/Card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendDirection?: 'up' | 'down';
  sparklineData?: number[];
  isLoading?: boolean;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendDirection = 'up',
  sparklineData = [10, 15, 8, 22, 18, 25, 30],
  isLoading = false,
  className,
  iconClassName,
}: StatCardProps) {
  if (isLoading) {
    return (
      <Card className="p-5 space-y-4 animate-pulse select-none">
        <div className="flex justify-between items-center">
          <div className="h-4 w-24 bg-muted rounded"></div>
          <div className="h-8 w-8 bg-muted rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="h-7 w-16 bg-muted rounded"></div>
          <div className="h-3 w-32 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  // Draw simple visual sparkline path
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  const isTrendUp = trendDirection === 'up';

  return (
    <Card className={cn('p-5 select-none hover:shadow-md hover:border-border/100 transition-all duration-300 group', className)}>
      <div className="flex justify-between items-start">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{title}</span>
        <div className={cn(
          'flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/40 text-muted-foreground group-hover:text-primary transition-colors',
          iconClassName
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="space-y-1">
          <span className="text-2xl font-extrabold tracking-tight text-foreground">{value}</span>
          {trend !== undefined && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold">
              <span className={cn(
                'flex items-center gap-0.5',
                isTrendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              )}>
                {isTrendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {isTrendUp ? '+' : ''}{trend}%
              </span>
              <span className="text-muted-foreground/60">vs last week</span>
            </div>
          )}
        </div>

        {/* Mini SVG Sparkline */}
        <div className="h-7 w-20 shrink-0">
          <svg className="h-full w-full" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke={isTrendUp ? '#10b981' : '#ef4444'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </Card>
  );
}

export default StatCard;
