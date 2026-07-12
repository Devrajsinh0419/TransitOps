'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  User,
  Settings,
  Shield,
  Truck,
  Users,
  Key,
  ShieldAlert,
  Bell,
  Eye,
  Info,
} from 'lucide-react';

export function SettingsSidebar() {
  const pathname = usePathname();

  const links = [
    { label: 'Admin Dashboard', path: '/settings', icon: Settings },
    { label: 'My Profile', path: '/settings/profile', icon: User },
    { label: 'Account Security', path: '/settings/account', icon: Shield },
    { label: 'Sign-in & Password', path: '/settings/security', icon: Key },
    { label: 'Fleet Configurations', path: '/settings/fleet', icon: Truck },
    { label: 'Users Directory', path: '/settings/users', icon: Users },
    { label: 'System Roles', path: '/settings/roles', icon: ShieldAlert },
    { label: 'Access Permissions', path: '/settings/permissions', icon: Shield },
    { label: 'Notification Settings', path: '/settings/notifications', icon: Bell },
    { label: 'Visual Theme', path: '/settings/appearance', icon: Eye },
    { label: 'About App', path: '/settings/about', icon: Info },
  ];

  return (
    <div className="w-full lg:w-60 shrink-0 border border-border/50 bg-card rounded-2xl p-4 shadow-sm h-fit space-y-1.5 select-none text-left">
      <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-widest px-2.5 pb-2 border-b border-border/20 mb-2">
        Settings Directories
      </span>
      {links.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link key={link.path} href={link.path}>
            <div
              className={`flex items-center gap-2.5 px-3 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground font-black'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <link.icon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground/60'}`} />
              {link.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SettingsSidebar;
