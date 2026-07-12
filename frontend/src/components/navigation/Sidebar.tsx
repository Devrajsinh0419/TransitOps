'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '../common/Logo';
import { SIDEBAR_ITEMS } from '@/constants/sidebar';
import { uiStore } from '@/store/ui.store';
import { isActiveRoute } from '@/lib/navigation';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { authStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [uiState, setUiState] = useState(uiStore.getState());

  useEffect(() => {
    const unsubscribe = uiStore.subscribe((state) => {
      setUiState(state);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    uiStore.toggleSidebar();
  };

  const handleLogout = () => {
    authStore.clearSession();
    router.push('/login');
  };

  const forceIconOnly = uiState.sidebarMode === 'collapsed';
  const isCollapsed = forceIconOnly || !uiState.sidebarOpen;
  const isCompact = uiState.sidebarMode === 'compact' && !isCollapsed;
  const sidebarWidth = isCollapsed ? 'w-18' : isCompact ? 'w-48' : 'w-64';

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-20 flex flex-col border-r border-border bg-card/85 backdrop-blur-md transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Header / Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
        <Logo collapsed={isCollapsed} />
        {!isCollapsed && (
          <button
            onClick={handleToggle}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-popover text-muted-foreground hover:text-foreground transition-colors shadow-soft cursor-pointer"
            aria-label="Collapse Sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
        {SIDEBAR_ITEMS.map((item) => {
          const active = isActiveRoute(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg font-medium transition-all group relative ${
                isCompact ? 'px-2 py-2 text-xs gap-2' : 'px-3 py-2.5 text-sm gap-3'
              } ${
                active
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? 'stroke-[2.5]' : 'group-hover:scale-105 transition-transform'}`} />
              {!isCollapsed && <span className="truncate">{item.title}</span>}
              {isCollapsed && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-popover text-popover-foreground border border-border text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-soft z-50 whitespace-nowrap">
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle & Logout */}
      <div className="p-3 border-t border-border/60 space-y-2">
        {isCollapsed && (
          <button
            onClick={handleToggle}
            className="flex w-full items-center justify-center p-2.5 rounded-lg text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Expand Sidebar"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors group relative cursor-pointer`}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          {!isCollapsed && <span className="truncate">Sign Out</span>}
          {isCollapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 rounded bg-destructive text-destructive-foreground text-xs opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-soft z-50 whitespace-nowrap">
              Sign Out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
