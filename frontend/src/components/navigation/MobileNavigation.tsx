'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, CalendarRange, Settings } from 'lucide-react';
import { isActiveRoute } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export interface MobileNavItem {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
}

const mobileItems: MobileNavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Vehicles', href: '/vehicles', icon: Truck },
  { title: 'Trips', href: '/trips', icon: CalendarRange },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export interface MobileNavigationProps {
  className?: string;
}

export function MobileNavigation({ className }: MobileNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'md:hidden fixed bottom-0 left-0 right-0 z-35 h-16 bg-card border-t border-border flex items-center justify-around px-2 shadow-soft select-none pb-safe',
        className
      )}
    >
      {mobileItems.map((item) => {
        const active = isActiveRoute(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1.5 flex-1 py-1 text-muted-foreground transition-all duration-200',
              active ? 'text-primary' : 'hover:text-foreground'
            )}
          >
            <Icon className={cn('h-5 w-5', active ? 'stroke-[2.2]' : '')} />
            <span className={cn('text-[9px] font-semibold tracking-wide', active ? 'font-bold' : '')}>
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileNavigation;
