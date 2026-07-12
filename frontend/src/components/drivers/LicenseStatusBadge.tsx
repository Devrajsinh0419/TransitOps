'use client';

import React from 'react';
import { Badge, BadgeVariant } from '../badges/Badge';

export interface LicenseStatusBadgeProps {
  expiryDate: string;
  className?: string;
}

export function LicenseStatusBadge({ expiryDate, className }: LicenseStatusBadgeProps) {
  const getStatus = (): { label: string; variant: BadgeVariant; tooltip: string } => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        label: 'Expired',
        variant: 'danger',
        tooltip: `License expired on ${expiryDate}`,
      };
    } else if (diffDays <= 60) {
      return {
        label: `Expiring Soon (${diffDays}d)`,
        variant: 'warning',
        tooltip: `License expires soon on ${expiryDate}`,
      };
    } else {
      return {
        label: 'Valid',
        variant: 'success',
        tooltip: `License is active until ${expiryDate}`,
      };
    }
  };

  const status = getStatus();

  return (
    <div title={status.tooltip} className="inline-flex select-none">
      <Badge variant={status.variant} className={className}>
        {status.label}
      </Badge>
    </div>
  );
}

export default LicenseStatusBadge;
