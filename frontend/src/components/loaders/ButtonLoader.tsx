import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function ButtonLoader({ className, size = 'md' }: ButtonLoaderProps) {
  return (
    <Loader2 className={cn('animate-spin text-current shrink-0', sizes[size], className)} />
  );
}

export default ButtonLoader;
