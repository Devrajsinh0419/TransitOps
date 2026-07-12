'use client';

import React from 'react';
import { TripStatus } from '@/types/trip';

interface TripStatusBadgeProps {
  status: TripStatus;
  className?: string;
}

export function TripStatusBadge({ status, className = '' }: TripStatusBadgeProps) {
  const styles: Record<TripStatus, { text: string; bg: string; dot: string }> = {
    draft: {
      text: 'text-zinc-600 dark:text-zinc-300',
      bg: 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700',
      dot: 'bg-zinc-400',
    },
    dispatched: {
      text: 'text-indigo-600 dark:text-indigo-300',
      bg: 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200/50 dark:border-indigo-900/30',
      dot: 'bg-indigo-500',
    },
    in_progress: {
      text: 'text-amber-700 dark:text-amber-300',
      bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-900/30',
      dot: 'bg-amber-500',
    },
    completed: {
      text: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-900/30',
      dot: 'bg-emerald-500',
    },
    cancelled: {
      text: 'text-rose-700 dark:text-rose-300',
      bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200/50 dark:border-rose-900/30',
      dot: 'bg-rose-500',
    },
    delayed: {
      text: 'text-red-700 dark:text-red-300',
      bg: 'bg-red-50 dark:bg-red-950/30 border-red-200/50 dark:border-red-900/30',
      dot: 'bg-red-500',
    },
  };

  const style = styles[status] || styles.draft;

  // Format label
  const label = status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide border ${style.bg} ${style.text} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {label}
    </span>
  );
}

export default TripStatusBadge;
