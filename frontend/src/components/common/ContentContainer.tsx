import React from 'react';
import { cn } from '@/lib/utils';

export interface ContentContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ContentContainer({ children, className, ...props }: ContentContainerProps) {
  return (
    <div
      className={cn(
        'bg-card border border-border/80 rounded-xl p-5 sm:p-6 shadow-soft',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default ContentContainer;
