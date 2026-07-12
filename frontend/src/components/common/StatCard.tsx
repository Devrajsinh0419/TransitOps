'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconWrapper } from './IconWrapper';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, description, className }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        'bg-card border border-border/80 rounded-xl p-5 shadow-soft flex flex-col justify-between transition-all select-none',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <IconWrapper variant="secondary" size="sm" className="bg-muted border-none shrink-0">
            {icon}
          </IconWrapper>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h4 className="text-2xl font-bold tracking-tight text-foreground">{value}</h4>
        
        {(trend || description) && (
          <div className="flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded',
                  trend.isPositive
                    ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400'
                    : 'text-rose-600 bg-rose-500/10 dark:text-rose-400'
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value}%
              </span>
            )}
            {description && <span className="text-muted-foreground truncate">{description}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default StatCard;
