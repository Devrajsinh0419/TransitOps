import React from 'react';
import { cn } from '@/lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Divider({ children, className, ...props }: DividerProps) {
  return (
    <div className={cn('relative flex py-5 items-center w-full', className)} {...props}>
      <div className="flex-grow border-t border-border/80"></div>
      {children && (
        <span className="flex-shrink mx-4 text-xs font-medium text-muted-foreground uppercase tracking-wider select-none">
          {children}
        </span>
      )}
      <div className="flex-grow border-t border-border/80"></div>
    </div>
  );
}

export default Divider;
