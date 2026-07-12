import React from 'react';
import { cn } from '@/lib/utils';

export interface AppTitleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'text-base font-semibold',
  md: 'text-lg font-bold',
  lg: 'text-2xl font-extrabold',
};

export function AppTitle({ className, size = 'md' }: AppTitleProps) {
  return (
    <span className={cn('tracking-tight text-foreground select-none', sizes[size], className)}>
      Transit<span className="text-muted-foreground font-medium">Ops</span>
    </span>
  );
}

export default AppTitle;
