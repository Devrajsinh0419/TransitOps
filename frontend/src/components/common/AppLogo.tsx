import React from 'react';
import { Route } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AppLogoProps {
  collapsed?: boolean;
  className?: string;
}

export function AppLogo({ collapsed = false, className }: AppLogoProps) {
  return (
    <Link href="/" className={cn('flex items-center gap-3 select-none group', className)}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
        <Route className="h-5.5 w-5.5 stroke-[2.5]" />
      </div>
      {!collapsed && (
        <span className="text-xl font-bold tracking-tight text-foreground transition-all duration-300">
          Transit<span className="text-muted-foreground font-semibold">Ops</span>
        </span>
      )}
    </Link>
  );
}

export default AppLogo;
