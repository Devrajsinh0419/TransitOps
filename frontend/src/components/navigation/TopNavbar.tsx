'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { uiStore } from '@/store/ui.store';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { NotificationButton } from './NotificationButton';
import { ProfileDropdown } from './ProfileDropdown';
import { cn } from '@/lib/utils';

export interface TopNavbarProps {
  className?: string;
}

export function TopNavbar({ className }: TopNavbarProps) {
  const handleSidebarToggle = () => {
    uiStore.toggleSidebar();
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-soft select-none',
        className
      )}
    >
      {/* Mobile Sidebar Hamburger Toggle & Navigation Brand name */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSidebarToggle}
          className="flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <span className="hidden sm:block text-xs font-bold uppercase tracking-wider text-muted-foreground">
          ERP Panel
        </span>
      </div>

      {/* Search Input Bar */}
      <div className="hidden md:block flex-1 max-w-xs mx-4">
        <SearchBar />
      </div>

      {/* Right side actions controls */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <NotificationButton />
        <div className="h-6 w-px bg-border/60 mx-1"></div>
        <ProfileDropdown />
      </div>
    </header>
  );
}

export default TopNavbar;
