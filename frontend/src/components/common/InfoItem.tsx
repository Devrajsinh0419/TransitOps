import React from 'react';
import { cn } from '@/lib/utils';

export interface InfoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  horizontal?: boolean;
}

export function InfoItem({ label, value, icon, horizontal = false, className, ...props }: InfoItemProps) {
  return (
    <div
      className={cn(
        'flex gap-2.5',
        horizontal ? 'flex-row items-center justify-between' : 'flex-col justify-start',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
        {icon && <span className="text-muted-foreground/60">{icon}</span>}
        {label}
      </div>
      <div className="text-sm font-medium text-foreground leading-snug break-words">
        {value}
      </div>
    </div>
  );
}

export default InfoItem;
