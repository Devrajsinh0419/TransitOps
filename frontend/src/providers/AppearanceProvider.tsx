'use client';

import React, { useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { applyAppearanceSettings, loadAppearance } from '@/lib/appearance';

interface AppearanceProviderProps {
  children: React.ReactNode;
}

export function AppearanceProvider({ children }: AppearanceProviderProps) {
  const { setTheme } = useNextTheme();

  useEffect(() => {
    const settings = loadAppearance();
    setTheme(settings.theme);
    applyAppearanceSettings(settings);

    const handleChange = () => {
      applyAppearanceSettings(loadAppearance());
    };

    window.addEventListener('transitops_appearance_changed', handleChange);
    return () => window.removeEventListener('transitops_appearance_changed', handleChange);
  }, [setTheme]);

  return <>{children}</>;
}

export default AppearanceProvider;
