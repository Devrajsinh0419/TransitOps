import { AppearanceSettings } from '@/types/settings';
import { uiStore } from '@/store/ui.store';

export const APPEARANCE_STORAGE_KEY = 'transitops_appearance';

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  theme: 'light',
  sidebarMode: 'expanded',
  colorAccent: '#6366f1',
  fontSize: 'medium',
};

export function loadAppearance(): AppearanceSettings {
  if (typeof window === 'undefined') return DEFAULT_APPEARANCE;
  try {
    const saved = localStorage.getItem(APPEARANCE_STORAGE_KEY);
    if (saved) return { ...DEFAULT_APPEARANCE, ...JSON.parse(saved) };
  } catch {
    // ignore parse errors
  }
  return DEFAULT_APPEARANCE;
}

export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function applyAppearanceSettings(settings: AppearanceSettings): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  root.dataset.fontSize = settings.fontSize;

  const hsl = hexToHsl(settings.colorAccent);
  root.style.setProperty('--primary', hsl);
  root.style.setProperty('--ring', hsl);
  root.style.setProperty('--primary-foreground', '0 0% 100%');

  uiStore.setSidebarMode(settings.sidebarMode);
}

export function persistAppearance(
  partial: Partial<AppearanceSettings>,
  setTheme?: (theme: string) => void
): AppearanceSettings {
  const current = loadAppearance();
  const updated = { ...current, ...partial };

  localStorage.setItem(APPEARANCE_STORAGE_KEY, JSON.stringify(updated));

  if (partial.theme) {
    localStorage.setItem('theme', partial.theme);
    setTheme?.(partial.theme);
  }

  applyAppearanceSettings(updated);
  window.dispatchEvent(new Event('transitops_appearance_changed'));

  return updated;
}

export const APPEARANCE_INIT_SCRIPT = `(function(){try{var k='transitops_appearance',s=localStorage.getItem(k);if(!s)return;var a=JSON.parse(s);var r=document.documentElement;if(a.fontSize)r.dataset.fontSize=a.fontSize;if(a.colorAccent){var h=a.colorAccent.replace('#','');var R=parseInt(h.slice(0,2),16)/255,G=parseInt(h.slice(2,4),16)/255,B=parseInt(h.slice(4,6),16)/255,m=Math.max(R,G,B),n=Math.min(R,G,B),l=(m+n)/2,H=0,S=0;if(m!==n){var d=m-n;S=l>0.5?d/(2-m-n):d/(m+n);if(m===R)H=((G-B)/d+(G<B?6:0))/6;else if(m===G)H=((B-R)/d+2)/6;else H=((R-G)/d+4)/6;}var hsl=Math.round(H*360)+' '+Math.round(S*100)+'% '+Math.round(l*100)+'%';r.style.setProperty('--primary',hsl);r.style.setProperty('--ring',hsl);r.style.setProperty('--primary-foreground','0 0% 100%');}if(a.theme){localStorage.setItem('theme',a.theme);if(a.theme==='dark')r.classList.add('dark');else if(a.theme==='light')r.classList.remove('dark');else if(a.theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches)r.classList.add('dark');}}catch(e){}})();`;
