'use client';

import React, { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = 'Search transactions, vehicles...', className }: SearchBarProps) {
  const [value, setValue] = useState('');

  return (
    <div className={cn('relative w-full max-w-xs flex items-center select-none', className)}>
      <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full h-9.5 pl-9 pr-12 bg-card border border-border rounded-xl text-xs text-foreground placeholder-muted-foreground outline-none transition-all shadow-soft',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary'
        )}
      />
      <div className="absolute right-3 flex items-center gap-0.5 pointer-events-none text-muted-foreground/60 border border-border/80 bg-muted/30 px-1.5 py-0.5 rounded text-[9px] font-bold">
        <Command className="h-2.5 w-2.5" />K
      </div>
    </div>
  );
}

export default SearchBar;
