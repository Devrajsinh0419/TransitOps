'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../navigation/Sidebar';
import Navbar from '../navigation/Navbar';
import { uiStore } from '@/store/ui.store';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [uiState, setUiState] = useState(uiStore.getState());

  useEffect(() => {
    const unsubscribe = uiStore.subscribe((state) => {
      setUiState(state);
    });
    return unsubscribe;
  }, []);

  const forceIconOnly = uiState.sidebarMode === 'collapsed';
  const isCollapsed = forceIconOnly || !uiState.sidebarOpen;
  const isCompact = uiState.sidebarMode === 'compact' && !isCollapsed;
  const contentPadding = isCollapsed ? 'pl-18' : isCompact ? 'pl-0 lg:pl-48' : 'pl-0 lg:pl-64';

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-250">
      {/* Navigation Sidebar */}
      <Sidebar />
      
      {/* Main Workspace Frame */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${contentPadding}`}
      >
        {/* Top Header Controls */}
        <Navbar />
        
        {/* Sub-view Content Frame */}
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        
        {/* Footer info bar */}
        <footer className="py-4 px-6 border-t border-border/50 text-center text-[10px] sm:text-xs text-muted-foreground bg-card/10 select-none">
          © {new Date().getFullYear()} TransitOps ERP. All rights reserved. Built for Next-generation Logistics.
        </footer>
      </div>
    </div>
  );
}
export default DashboardLayout;
