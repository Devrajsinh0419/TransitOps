'use client';

import React from 'react';
import { Truck, UserPlus, PlusCircle, Droplet, Wrench, FileSpreadsheet } from 'lucide-react';
import { QuickActionCard } from './QuickActionCard';
import { toast } from 'sonner';

export function QuickActions() {
  const actions = [
    {
      title: 'Register Vehicle',
      description: 'Add a new vehicle record to the active fleet registry.',
      icon: Truck,
      onClick: () => toast.info('Register Vehicle clicked', { description: 'Opening registry panel...' }),
    },
    {
      title: 'Register Driver',
      description: 'Enlist new commercial drivers and upload CDL profiles.',
      icon: UserPlus,
      onClick: () => toast.info('Register Driver clicked', { description: 'Opening CDL credentials uploader...' }),
    },
    {
      title: 'Create Trip',
      description: 'Dispatch trips, assign drivers, and configure routes.',
      icon: PlusCircle,
      onClick: () => toast.info('Create Trip clicked', { description: 'Opening routing & planning dialog...' }),
    },
    {
      title: 'Fuel Log',
      description: 'Record fuel fillups, expenses, and efficiency metrics.',
      icon: Droplet,
      onClick: () => toast.info('Fuel Log clicked', { description: 'Opening telemetry fuel input sheets...' }),
    },
    {
      title: 'Maintenance',
      description: 'Schedule preventative maintenance or log vehicle shop tasks.',
      icon: Wrench,
      onClick: () => toast.info('Maintenance clicked', { description: 'Opening shop tickets dashboard...' }),
    },
    {
      title: 'Reports',
      description: 'Generate operational reports, logs, and fuel indexes.',
      icon: FileSpreadsheet,
      onClick: () => toast.info('Reports clicked', { description: 'Opening report query center...' }),
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
