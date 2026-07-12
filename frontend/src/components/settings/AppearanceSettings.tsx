'use client';

import React from 'react';
import { useSettings } from '@/hooks/useSettings';
import { Button } from '../ui/Button';
import { Sun, Moon, Laptop, Eye, Check } from 'lucide-react';
import { toast } from 'sonner';

export function AppearanceSettings() {
  const { appearance, updateAppearance, isLoading } = useSettings();

  const themes = [
    { value: 'light', label: 'Light Mode', icon: Sun },
    { value: 'dark', label: 'Dark Mode', icon: Moon },
    { value: 'system', label: 'System default', icon: Laptop },
  ];

  const sidebars = [
    { value: 'expanded', label: 'Expanded', desc: 'Standard width (240px)' },
    { value: 'collapsed', label: 'Collapsed', desc: 'Icon view with popover' },
    { value: 'compact', label: 'Compact', desc: 'Slim layout labels' },
  ];

  const accents = [
    { name: 'Indigo (Default)', hex: '#6366f1' },
    { name: 'Blue Horizon', hex: '#3b82f6' },
    { name: 'Forest Emerald', hex: '#10b981' },
    { name: 'Amber Glow', hex: '#f59e0b' },
    { name: 'Crimson Rose', hex: '#ef4444' },
  ];

  return (
    <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6 select-none text-left">
      <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
        <Eye className="h-4 w-4 text-primary" />
        Application Visual Themes
      </h3>

      {/* Theme choices */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Base Interface Theme</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {themes.map((theme) => {
            const isActive = appearance.theme === theme.value;
            return (
              <button
                key={theme.value}
                type="button"
                onClick={() => updateAppearance({ theme: theme.value as any })}
                className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                <theme.icon className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">{theme.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sidebar layouts */}
      <div className="space-y-2 pt-4 border-t border-border/10">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Sidebar Navigation Layout</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sidebars.map((side) => {
            const isActive = appearance.sidebarMode === side.value;
            return (
              <button
                key={side.value}
                type="button"
                onClick={() => updateAppearance({ sidebarMode: side.value as any })}
                className={`p-3 border rounded-xl flex flex-col items-start gap-1 transition-all text-left cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{side.label}</span>
                <span className="text-[9px] text-muted-foreground leading-normal">{side.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Accent */}
      <div className="space-y-2 pt-4 border-t border-border/10">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Accent Branding Color</span>
        <div className="flex flex-wrap gap-3">
          {accents.map((accent) => {
            const isActive = appearance.colorAccent === accent.hex;
            return (
              <button
                key={accent.hex}
                type="button"
                onClick={() => updateAppearance({ colorAccent: accent.hex })}
                className="flex items-center gap-2 p-2 border border-border/60 rounded-xl hover:bg-muted/30 transition-all cursor-pointer"
              >
                <div
                  className="w-5 h-5 rounded-full border border-black/10 flex items-center justify-center"
                  style={{ backgroundColor: accent.hex }}
                >
                  {isActive && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className="text-xs font-semibold text-foreground">{accent.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-2 pt-4 border-t border-border/10">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">App Typography Sizing</span>
        <div className="flex gap-2">
          {['small', 'medium', 'large'].map((size) => {
            const isActive = appearance.fontSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => updateAppearance({ fontSize: size as any })}
                className={`px-4 py-2 border text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border/60 hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default AppearanceSettings;
