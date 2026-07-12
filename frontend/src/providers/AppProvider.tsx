'use client';

import React from 'react';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { AppearanceProvider } from './AppearanceProvider';
import { ToastProvider } from './ToastProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <AppearanceProvider>
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </AppearanceProvider>
    </ThemeProvider>
  );
}
export default AppProvider;
