import React from 'react';
import { cn } from '@/lib/utils';

export interface SidebarSectionProps {
  title: string;
  isCollapsed?: boolean;
  className?: string;
}

export function SidebarSection({ title, isCollapsed = false, className }: SidebarSectionProps) {
  if (isCollapsed) return <div className="h-px bg-border/60 my-4 w-full shrink-0" />;

  return (
    <div
      className={cn(
        'px-3 text-[10px] font-bold text-muted-foreground/80 uppercase tracking-widest py-2 shrink-0 select-none',
        className
      )}
    >
      {title}
    </div>
  );
}

export default SidebarSection;
