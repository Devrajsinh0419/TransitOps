'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Truck, Navigation, Users, Wrench, Fuel, Landmark, Settings2, BarChart2 } from 'lucide-react';

export function ReportTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Executive Summary', path: '/reports', icon: BarChart2 },
    { label: 'Fleet Analytics', path: '/reports/fleet', icon: Truck },
    { label: 'Trip Analytics', path: '/reports/trips', icon: Navigation },
    { label: 'Driver Analytics', path: '/reports/drivers', icon: Users },
    { label: 'Maintenance Analytics', path: '/reports/maintenance', icon: Wrench },
    { label: 'Fuel Analytics', path: '/reports/fuel', icon: Fuel },
    { label: 'Expense Analytics', path: '/reports/expenses', icon: Landmark },
    { label: 'Custom Builder', path: '/reports/custom', icon: Settings2 },
  ];

  return (
    <div className="border-b border-border/40 select-none text-left">
      <div className="flex overflow-x-auto scrollbar-none gap-2 pb-0.5">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link key={tab.path} href={tab.path}>
              <div
                className={`flex items-center gap-2 px-3 py-2 text-xs font-black uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground/60'}`} />
                {tab.label}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ReportTabs;
