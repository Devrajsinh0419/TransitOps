import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      const savedApp = localStorage.getItem('transitops_appearance');
      const parsed = savedApp ? JSON.parse(savedApp) : { theme: 'light', sidebarMode: 'expanded', colorAccent: '#6366f1', fontSize: 'medium' };
      parsed.theme = newTheme;
      localStorage.setItem('transitops_appearance', JSON.stringify(parsed));
      window.dispatchEvent(new Event('transitops_appearance_changed'));
    }
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
