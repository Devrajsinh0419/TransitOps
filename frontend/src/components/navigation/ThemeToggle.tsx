'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none',
        className
      )}
      title={`Current Theme: ${theme || 'system'}. Click to change.`}
    >
      {theme === 'light' && <Sun className="h-4.5 w-4.5" />}
      {theme === 'dark' && <Moon className="h-4.5 w-4.5" />}
      {(theme === 'system' || !theme) && <Laptop className="h-4.5 w-4.5" />}
    </button>
  );
}

export default ThemeToggle;
