'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';

export interface DriverHeaderProps {
  title: string;
  subtitle: string;
  showCreateButton?: boolean;
}

export function DriverHeader({ title, subtitle, showCreateButton = false }: DriverHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-5 gap-4 select-none text-left">
      <div className="space-y-1">
        <h1 className="text-xl font-extrabold tracking-tight text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground leading-relaxed">{subtitle}</p>
      </div>

      {showCreateButton && (
        <Button
          onClick={() => router.push('/drivers/new')}
          className="self-start sm:self-center font-bold text-xs h-9.5 px-4 bg-primary hover:bg-primary/95 text-primary-foreground shadow-sm rounded-lg"
          leftIcon={<Plus className="h-4 w-4 stroke-[2.5]" />}
        >
          Register Driver
        </Button>
      )}
    </div>
  );
}

export default DriverHeader;
