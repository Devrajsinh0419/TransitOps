'use client';

import React from 'react';
import { DriverStatus } from '@/types/driver';
import { cn } from '@/lib/utils';

export interface DriverAvatarProps {
  name: string;
  avatarUrl?: string;
  status?: DriverStatus;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeConfig = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-2xl',
};

const statusDotColors: Record<DriverStatus, string> = {
  available: 'bg-emerald-500 ring-emerald-100 dark:ring-emerald-950',
  on_trip: 'bg-sky-500 ring-sky-100 dark:ring-sky-950',
  off_duty: 'bg-zinc-400 ring-zinc-100 dark:ring-zinc-950',
  suspended: 'bg-rose-500 ring-rose-100 dark:ring-rose-950',
  leave: 'bg-amber-500 ring-amber-100 dark:ring-amber-950',
  inactive: 'bg-zinc-500 ring-zinc-100 dark:ring-zinc-950',
};

export function DriverAvatar({ name, avatarUrl, status, size = 'md', className }: DriverAvatarProps) {
  const getInitials = (n: string) => {
    if (!n) return '';
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      <div className={cn(
        sizeConfig[size], 
        'relative flex shrink-0 overflow-hidden rounded-full border border-border/80 shadow-sm items-center justify-center font-extrabold bg-muted text-muted-foreground'
      )}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2',
            statusDotColors[status] || 'bg-zinc-400',
            size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-2.5 w-2.5' : size === 'lg' ? 'h-3.5 w-3.5' : 'h-4 w-4'
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default DriverAvatar;
