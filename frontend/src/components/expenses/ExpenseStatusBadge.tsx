'use client';

import React from 'react';
import { ExpenseStatus } from '@/types/expense';

interface StatusBadgeProps {
  status: ExpenseStatus;
}

export function ExpenseStatusBadge({ status }: StatusBadgeProps) {
  const getStyles = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/25';
      case 'approved':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25';
      case 'rejected':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/25';
      default:
        return 'bg-muted/10 text-muted border-muted/25';
    }
  };

  const formatText = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStyles()}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
      {formatText()}
    </span>
  );
}
export default ExpenseStatusBadge;
