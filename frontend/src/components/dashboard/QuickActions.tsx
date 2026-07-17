'use client';

import React from 'react';
import { Truck, UserPlus, PlusCircle, Droplet, Wrench, FileSpreadsheet } from 'lucide-react';
import { QuickActionCard } from './QuickActionCard';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();
  const actions = [
    {
      title: 'Register Vehicle',
      description: 'Add a new vehicle record to the active fleet registry.',
      icon: Truck,
      onClick: () => router.push('/vehicles/new'),
    },
    {
      title: 'Register Driver',
      description: 'Enlist new commercial drivers and upload CDL profiles.',
      icon: UserPlus,
      onClick: () => router.push('/drivers/new'),
    },
    {
      title: 'Create Trip',
      description: 'Dispatch trips, assign drivers, and configure routes.',
      icon: PlusCircle,
      onClick: () => router.push('/trips/new'),
    },
    {
      title: 'Fuel Log',
      description: 'Record fuel fillups, expenses, and efficiency metrics.',
      icon: Droplet,
      onClick: () => router.push('/fuel/new'),
    },
    {
      title: 'Maintenance',
      description: 'Schedule preventative maintenance or log vehicle shop tasks.',
      icon: Wrench,
      onClick: () => router.push('/maintenance/new'),
    },
    {
      title: 'Reports',
      description: 'Generate operational reports, logs, and fuel indexes.',
      icon: FileSpreadsheet,
      onClick: () => router.push('/reports'),
    },
  ];

  return (
    <div className="space-y-3.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {actions.map((act, idx) => (
          <QuickActionCard
            key={idx}
            title={act.title}
            description={act.description}
            icon={act.icon}
            onClick={act.onClick}
          />
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
