'use client';

import React from 'react';
import {
  Inbox,
  Search,
  WifiOff,
  Clock,
  Lock,
  FileQuestion,
  ServerCrash,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

export type EmptyStateVariant =
  | 'no_data'
  | 'no_results'
  | 'no_internet'
  | 'coming_soon'
  | 'denied'
  | 'not_found'
  | 'server_error';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, { title: string; description: string; icon: LucideIcon }> = {
  no_data: {
    title: 'No Records Found',
    description: 'There are currently no items in this section. Start by creating a new entry.',
    icon: Inbox,
  },
  no_results: {
    title: 'No Search Results',
    description: 'We couldn\'t find any matches for your query. Try refinement or different keywords.',
    icon: Search,
  },
  no_internet: {
    title: 'No Internet Connection',
    description: 'Please check your network status. Your device is currently offline.',
    icon: WifiOff,
  },
  coming_soon: {
    title: 'Coming Soon',
    description: 'This feature is currently under active development. Stay tuned for upcoming releases!',
    icon: Clock,
  },
  denied: {
    title: 'Permission Denied',
    description: 'You do not have the required access roles to view this module. Contact administrative support.',
    icon: Lock,
  },
  not_found: {
    title: 'Page Not Found',
    description: 'The resource you are looking for does not exist or has been relocated.',
    icon: FileQuestion,
  },
  server_error: {
    title: 'Internal Server Error',
    description: 'Something went wrong on our servers. Please refresh the page or try again later.',
    icon: ServerCrash,
  },
};

export function EmptyState({
  variant = 'no_data',
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = variantConfig[variant];
  const DisplayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-dashed border-border rounded-2xl bg-card max-w-md mx-auto my-6 animate-scale-in select-none',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm border border-primary/5">
        <DisplayIcon className="h-6.5 w-6.5 stroke-[2.2]" />
      </div>
      
      <h3 className="text-base font-bold text-foreground tracking-tight mb-1">
        {displayTitle}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed mb-6 max-w-xs">
        {displayDescription}
      </p>

      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="cursor-pointer">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
