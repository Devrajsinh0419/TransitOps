'use client';

import React from 'react';
import { TripStatus } from '@/types/trip';

interface TripProgressProps {
  status: TripStatus;
  source: string;
  destination: string;
  className?: string;
}

export function TripProgress({ status, source, destination, className = '' }: TripProgressProps) {
  const getPercentage = () => {
    switch (status) {
      case 'draft':
        return 0;
      case 'dispatched':
        return 20;
      case 'in_progress':
        return 60;
      case 'completed':
        return 100;
      case 'cancelled':
        return 0;
      case 'delayed':
        return 50;
      default:
        return 0;
    }
  };

  const percentage = getPercentage();

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-[10px] font-semibold text-muted-foreground">
        <span className="truncate max-w-[120px] text-left">{source.split(',')[0]}</span>
        <span>{percentage}%</span>
        <span className="truncate max-w-[120px] text-right">{destination.split(',')[0]}</span>
      </div>
      <div className="relative w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${
            status === 'cancelled'
              ? 'bg-rose-500'
              : status === 'completed'
              ? 'bg-emerald-500'
              : status === 'delayed'
              ? 'bg-red-500'
              : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default TripProgress;
