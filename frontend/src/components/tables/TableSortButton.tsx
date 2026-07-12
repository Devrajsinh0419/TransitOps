'use client';

import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TableSortButtonProps {
  label: string;
  direction?: 'asc' | 'desc' | null;
  onSort?: () => void;
  className?: string;
}

export function TableSortButton({ label, direction = null, onSort, className }: TableSortButtonProps) {
  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        'inline-flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer group font-semibold uppercase tracking-wider',
        direction ? 'text-foreground font-bold' : 'text-muted-foreground',
        className
      )}
    >
      <span>{label}</span>
      <span className="shrink-0 text-muted-foreground/60 group-hover:text-foreground">
        {direction === 'asc' && <ArrowUp className="h-3.5 w-3.5" />}
        {direction === 'desc' && <ArrowDown className="h-3.5 w-3.5" />}
        {!direction && <ArrowUpDown className="h-3.5 w-3.5" />}
      </span>
    </button>
  );
}

export default TableSortButton;
