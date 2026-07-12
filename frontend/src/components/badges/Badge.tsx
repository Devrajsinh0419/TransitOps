import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info as InfoIcon,
  FileText,
  Clock,
  Wrench,
  Check,
  Ban,
  Activity,
  Archive,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'draft'
  | 'completed'
  | 'cancelled'
  | 'pending'
  | 'maintenance'
  | 'available'
  | 'unavailable'
  | 'on_trip'
  | 'retired'
  | 'suspended'
  | 'approved'
  | 'rejected';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  showIcon?: boolean;
  customIcon?: React.ReactNode;
}

const variantConfig: Record<BadgeVariant, { text: string; styles: string; icon: React.ComponentType<any> }> = {
  success: { text: 'Success', styles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
  danger: { text: 'Danger', styles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', icon: AlertTriangle },
  warning: { text: 'Warning', styles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20', icon: AlertTriangle },
  info: { text: 'Info', styles: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20', icon: InfoIcon },
  draft: { text: 'Draft', styles: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20', icon: FileText },
  completed: { text: 'Completed', styles: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25', icon: CheckCircle2 },
  cancelled: { text: 'Cancelled', styles: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25', icon: XCircle },
  pending: { text: 'Pending', styles: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25', icon: Clock },
  maintenance: { text: 'Maintenance', styles: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20', icon: Wrench },
  available: { text: 'Available', styles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: Check },
  unavailable: { text: 'Unavailable', styles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', icon: Ban },
  on_trip: { text: 'On Trip', styles: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20', icon: Activity },
  retired: { text: 'Retired', styles: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20', icon: Archive },
  suspended: { text: 'Suspended', styles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', icon: Ban },
  approved: { text: 'Approved', styles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20', icon: CheckCircle2 },
  rejected: { text: 'Rejected', styles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20', icon: XCircle },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] font-semibold px-2 py-0.5 gap-1 border',
  md: 'text-xs font-semibold px-2.5 py-0.5 gap-1.5 border',
  lg: 'text-sm font-semibold px-3.5 py-1 gap-2 border-[1.5px]',
};

const iconSizes: Record<BadgeSize, string> = {
  sm: 'h-3 w-3 shrink-0',
  md: 'h-3.5 w-3.5 shrink-0',
  lg: 'h-4.5 w-4.5 shrink-0',
};

export function Badge({
  variant,
  size = 'md',
  rounded = false,
  showIcon = true,
  customIcon,
  className,
  children,
  ...props
}: BadgeProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center transition-all select-none',
        sizeStyles[size],
        config.styles,
        rounded ? 'rounded-full' : 'rounded-md',
        className
      )}
      {...props}
    >
      {showIcon && (customIcon ? <span className="shrink-0">{customIcon}</span> : <Icon className={iconSizes[size]} />)}
      <span>{children || config.text}</span>
    </span>
  );
}

export default Badge;
