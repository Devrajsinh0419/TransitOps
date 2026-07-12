'use client';

import React from 'react';
import { MaintenancePriority } from '@/types/maintenance';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface PriorityBadgeProps {
  priority: MaintenancePriority;
}

export function MaintenancePriorityBadge({ priority }: PriorityBadgeProps) {
  const getStyles = () => {
    switch (priority) {
      case 'low':
        return {
          classes: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
          icon: Shield,
        };
      case 'medium':
        return {
          classes: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
          icon: Shield,
        };
      case 'high':
        return {
          classes: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
          icon: ShieldCheck,
        };
      case 'critical':
        return {
          classes: 'bg-rose-500/10 text-rose-600 border-rose-500/20 animate-pulse',
          icon: ShieldAlert,
        };
      default:
        return {
          classes: 'bg-muted/10 text-muted border-muted/20',
          icon: Shield,
        };
    }
  };

  const { classes, icon: Icon } = getStyles();

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${classes}`}>
      <Icon className="h-3 w-3" />
      {priority.toUpperCase()}
    </span>
  );
}
export default MaintenancePriorityBadge;
