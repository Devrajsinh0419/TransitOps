import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { persistAppearance } from '@/lib/appearance';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme = (newTheme: string) => {
    persistAppearance({ theme: newTheme as 'light' | 'dark' | 'system' }, setTheme);
  };

  return {
    theme: mounted ? theme : 'system',
    resolvedTheme: mounted ? resolvedTheme : 'light',
    systemTheme: mounted ? systemTheme : 'light',
    setTheme: handleSetTheme,
    isDark: mounted ? resolvedTheme === 'dark' : false,
    mounted,
  };
}

export default useTheme;
