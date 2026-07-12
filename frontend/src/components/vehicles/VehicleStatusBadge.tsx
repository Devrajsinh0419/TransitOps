'use client';

import React from 'react';
import { Badge, BadgeVariant } from '../badges/Badge';
import { VehicleStatus } from '@/types/vehicle';

export interface VehicleStatusBadgeProps {
  status: VehicleStatus;
  className?: string;
}

const statusConfig: Record<VehicleStatus, { label: string; variant: BadgeVariant; tooltip: string }> = {
  available: {
    label: 'Available',
    variant: 'available',
    tooltip: 'Vehicle is active and ready for dispatch',
  },
  on_trip: {
    label: 'On Trip',
    variant: 'on_trip',
    tooltip: 'Vehicle is currently on an active dispatch route',
  },
  maintenance: {
    label: 'In Shop',
    variant: 'maintenance',
    tooltip: 'Vehicle is undergoing maintenance or safety checks',
  },
  retired: {
    label: 'Retired',
    variant: 'retired',
    tooltip: 'Vehicle is retired from operations but retained for history',
  },
  inactive: {
    label: 'Inactive',
    variant: 'warning',
    tooltip: 'Vehicle is temporarily out of service',
  },
  disposed: {
    label: 'Disposed',
    variant: 'danger',
    tooltip: 'Vehicle is permanently removed from the fleet register',
  },
};

export function VehicleStatusBadge({ status, className }: VehicleStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.available;

  return (
    <div title={config.tooltip} className="inline-flex select-none">
      <Badge
        variant={config.variant}
        className={className}
      >
        {config.label}
      </Badge>
    </div>
  );
}

export default VehicleStatusBadge;
