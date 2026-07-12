'use client';

import React from 'react';
import { MaintenanceStatus } from '@/types/maintenance';

interface StatusBadgeProps {
  status: MaintenanceStatus;
}

export function MaintenanceStatusBadge({ status }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
      case 'approved':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/25';
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/25';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';
      case 'cancelled':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/25';
      default:
        return 'bg-muted/10 text-muted border-muted/25';
    }
  };

  const formatText = () => {
    if (status === 'in_progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStyles()}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {formatText()}
    </span>
  );
}
export default MaintenanceStatusBadge;
