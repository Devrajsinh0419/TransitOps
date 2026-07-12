'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Breadcrumb } from '../navigation/Breadcrumb';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export interface VehicleHeaderProps {
  title: string;
  subtitle: string;
  actionText?: string;
  actionHref?: string;
}

export function VehicleHeader({
  title,
  subtitle,
  actionText = 'Register Vehicle',
  actionHref = '/vehicles/new',
}: VehicleHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-border/60 select-none">
      <div className="space-y-1">
        <Breadcrumb />
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {actionText && actionHref && (
        <Button
          variant="primary"
          size="md"
          onClick={() => router.push(actionHref)}
          leftIcon={<Plus className="h-4 w-4" />}
          className="cursor-pointer font-bold shrink-0 self-start md:self-center"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}

export default VehicleHeader;
