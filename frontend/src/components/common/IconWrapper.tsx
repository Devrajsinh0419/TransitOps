import React from 'react';
import { cn } from '@/lib/utils';

export type IconWrapperVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost';
export type IconWrapperSize = 'sm' | 'md' | 'lg';

export interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: IconWrapperVariant;
  size?: IconWrapperSize;
  rounded?: boolean;
}

const variantStyles: Record<IconWrapperVariant, string> = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border border-border/80',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  ghost: 'bg-transparent text-muted-foreground',
};

const sizeStyles: Record<IconWrapperSize, string> = {
  sm: 'h-7 w-7 rounded-md p-1.5',
  md: 'h-9.5 w-9.5 rounded-lg p-2.5',
  lg: 'h-12 w-12 rounded-xl p-3',
};

export function IconWrapper({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className,
  ...props
}: IconWrapperProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center shrink-0 select-none shadow-sm',
        variantStyles[variant],
        sizeStyles[size],
        rounded ? 'rounded-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default IconWrapper;
