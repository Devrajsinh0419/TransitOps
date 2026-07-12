'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SidebarItemProps {
  href: string;
  title: string;
  icon: LucideIcon;
  isActive?: boolean;
  isCollapsed?: boolean;
}

export function SidebarItem({ href, title, icon: Icon, isActive = false, isCollapsed = false }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative select-none',
        isActive
          ? 'bg-primary text-primary-foreground shadow-soft font-semibold'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
      )}
    >
      <Icon
        className={cn(
          'h-4.5 w-4.5 shrink-0 transition-transform',
          isActive ? 'stroke-[2.5]' : 'group-hover:scale-105'
        )}
      />
      {!isCollapsed && <span className="truncate">{title}</span>}
      {isCollapsed && (
        <span className="absolute left-full ml-2 px-2 py-1 rounded bg-popover text-popover-foreground border border-border text-[10px] font-semibold opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-soft z-50 whitespace-nowrap">
          {title}
        </span>
      )}
    </Link>
  );
}

export default SidebarItem;
