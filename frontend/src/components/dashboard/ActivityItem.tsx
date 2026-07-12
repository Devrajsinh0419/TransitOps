'use client';

import React from 'react';
import { Activity } from '@/types/dashboard';
import { PlusCircle, Navigation, Wrench, UserPlus, Droplet, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActivityItemProps {
  activity: Activity;
  isLast?: boolean;
}

const config: Record<
  Activity['type'],
  { icon: LucideIcon; color: string; bg: string }
> = {
  vehicle_added: {
    icon: PlusCircle,
    color: 'text-blue-500 border-blue-500/20',
    bg: 'bg-blue-500/10',
  },
  trip_created: {
    icon: Navigation,
    color: 'text-emerald-500 border-emerald-500/20',
    bg: 'bg-emerald-500/10',
  },
  maintenance_started: {
    icon: Wrench,
    color: 'text-amber-500 border-amber-500/20',
    bg: 'bg-amber-500/10',
  },
  driver_assigned: {
    icon: UserPlus,
    color: 'text-purple-500 border-purple-500/20',
    bg: 'bg-purple-500/10',
  },
  fuel_logged: {
    icon: Droplet,
    color: 'text-indigo-500 border-indigo-500/20',
    bg: 'bg-indigo-500/10',
  },
};

export function ActivityItem({ activity, isLast = false }: ActivityItemProps) {
  const itemConfig = config[activity.type] || config.vehicle_added;
  const Icon = itemConfig.icon;

  return (
    <div className="relative flex gap-4 text-left select-none group">
      {/* Connector line */}
      {!isLast && (
        <span
          className="absolute left-4 top-8 bottom-[-16px] w-[1px] bg-border/60 group-hover:bg-border transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Icon node */}
      <div className={cn(
        'relative z-10 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border shadow-soft',
        itemConfig.color,
        itemConfig.bg
      )}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Text details */}
      <div className="space-y-1 pb-4 min-w-0 flex-1">
        <div className="flex justify-between items-baseline gap-2">
          <p className="text-[11px] font-bold text-foreground truncate">{activity.description}</p>
          <span className="text-[9px] font-semibold text-muted-foreground/60 shrink-0 uppercase tracking-wider">
            {activity.time}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground font-medium leading-none">
          Logged by <span className="text-foreground/80 font-bold">{activity.user}</span>
        </p>
      </div>
    </div>
  );
}

export default ActivityItem;
