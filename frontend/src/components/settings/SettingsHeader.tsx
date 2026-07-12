'use client';

import React from 'react';
import Link from 'next/link';

interface SettingsHeaderProps {
  title: string;
}

export function SettingsHeader({ title }: SettingsHeaderProps) {
  return (
    <div className="space-y-4 select-none text-left">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          TransitOps
        </Link>
        <span>/</span>
        <Link href="/settings" className="hover:text-foreground">
          Administration
        </Link>
        <span>/</span>
        <span className="text-primary">{title}</span>
      </div>

      <div className="space-y-1">
        <h1 className="text-lg font-black text-foreground uppercase tracking-tight">
          System Administration & Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Provision roles, configure notification dispatch channels, manage system accents, and define fleet units.
        </p>
      </div>
    </div>
  );
}

export default SettingsHeader;
