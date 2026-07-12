'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { uiStore } from '@/store/ui.store';
import { authStore } from '@/store/auth.store';
import { Bell, Sun, Moon, Laptop, Menu, User as UserIcon } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [authSession, setAuthSession] = useState(authStore.getState());
  const [uiState, setUiState] = useState(uiStore.getState());

  useEffect(() => {
    const unsubAuth = authStore.subscribe((state) => setAuthSession(state));
    const unsubUi = uiStore.subscribe((state) => setUiState(state));
    return () => {
      unsubAuth();
      unsubUi();
    };
  }, []);

  const handleSidebarToggle = () => {
    uiStore.toggleSidebar();
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const user = authSession.user;

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 shadow-soft">
      {/* Left side: Hamburger for mobile */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSidebarToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <div className="hidden sm:block text-sm font-semibold tracking-tight text-foreground">
          TransitOps Control
        </div>
      </div>

      {/* Right side: Utilities & Profile */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={cycleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title={`Current Theme: ${theme}. Click to change.`}
        >
          {theme === 'light' && <Sun className="h-4.5 w-4.5" />}
          {theme === 'dark' && <Moon className="h-4.5 w-4.5" />}
          {(theme === 'system' || !theme) && <Laptop className="h-4.5 w-4.5" />}
        </button>

        {/* Notifications Icon */}
        <button
          onClick={() => uiStore.toggleNotifications()}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="View notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        <div className="h-6 w-px bg-border/60 mx-1"></div>

        {/* User Info & Avatar */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-semibold text-foreground truncate max-w-[120px]">
              {user ? user.name : 'Guest User'}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {user ? user.role.replace('_', ' ') : 'Viewer'}
            </span>
          </div>
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-muted border border-border text-muted-foreground overflow-hidden">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-4.5 w-4.5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
