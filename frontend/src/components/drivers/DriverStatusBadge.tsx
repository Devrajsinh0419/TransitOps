'use client';

import React from 'react';
import { Badge, BadgeVariant } from '../badges/Badge';
import { DriverStatus } from '@/types/driver';

export interface DriverStatusBadgeProps {
  status: DriverStatus;
  className?: string;
}

const statusConfig: Record<DriverStatus, { label: string; variant: BadgeVariant; tooltip: string }> = {
  available: {
    label: 'Available',
    variant: 'available',
    tooltip: 'Driver is active and ready for dispatch assignment',
  },
  on_trip: {
    label: 'On Trip',
    variant: 'on_trip',
    tooltip: 'Driver is currently on an active route assignment',
  },
  off_duty: {
    label: 'Off Duty',
    variant: 'draft',
    tooltip: 'Driver is off shift',
  },
  suspended: {
    label: 'Suspended',
    variant: 'suspended',
    tooltip: 'Driver is suspended from dispatching due to compliance issues',
  },
  leave: {
    label: 'On Leave',
    variant: 'pending',
    tooltip: 'Driver is on approved vacation or medical leave',
  },
  inactive: {
    label: 'Inactive',
    variant: 'unavailable',
    tooltip: 'Driver is currently inactive',
  },
};

export function DriverStatusBadge({ status, className }: DriverStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.available;

  return (
    <div title={config.tooltip} className="inline-flex select-none">
      <Badge variant={config.variant} className={className}>
        {config.label}
      </Badge>
    </div>
  );
}

export default DriverStatusBadge;
