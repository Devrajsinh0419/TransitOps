'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TripHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  action?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export function TripHeader({ title, subtitle, breadcrumbs, action }: TripHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-4 select-none text-left">
      <div className="space-y-1">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <Link href="/dashboard" className="hover:text-foreground transition-colors flex items-center">
            <Home className="h-3.5 w-3.5" />
          </Link>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
              {item.href ? (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground/80">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title & Subtitle */}
        <h1 className="text-xl font-extrabold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>}
      </div>

      {action && (
        <Link href={action.href} className="self-start sm:self-auto">
          <Button
            className="h-9 text-xs font-bold gap-1.5 bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg"
            leftIcon={action.icon || <Plus className="h-4 w-4" />}
          >
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
}

export default TripHeader;
