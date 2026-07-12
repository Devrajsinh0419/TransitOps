import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SidebarGroup({ children, className, ...props }: SidebarGroupProps) {
  return (
    <div className={cn('space-y-1.5 w-full flex flex-col shrink-0', className)} {...props}>
      {children}
    </div>
  );
}

export default SidebarGroup;
