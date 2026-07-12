'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';
import { CheckCircle2, XCircle, AlertTriangle, Info as InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatusDialogVariant = 'success' | 'error' | 'warning' | 'info';

export interface StatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  title: string;
  message: string;
  variant: StatusDialogVariant;
  actionText?: string;
  closeText?: string;
  isLoading?: boolean;
}

const iconConfigs = {
  success: {
    icon: CheckCircle2,
    iconStyles: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    buttonVariant: 'success' as const,
  },
  error: {
    icon: XCircle,
    iconStyles: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    buttonVariant: 'destructive' as const,
  },
  warning: {
    icon: AlertTriangle,
    iconStyles: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    buttonVariant: 'warning' as const,
  },
  info: {
    icon: InfoIcon,
    iconStyles: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    buttonVariant: 'primary' as const,
  },
};

export function StatusDialog({
  isOpen,
  onClose,
  onAction,
  title,
  message,
  variant,
  actionText = 'Ok',
  closeText = 'Close',
  isLoading = false,
}: StatusDialogProps) {
  const config = iconConfigs[variant];
  const Icon = config.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading} className="cursor-pointer">
            {closeText}
          </Button>
          {onAction && (
            <Button
              variant={config.buttonVariant}
              size="sm"
              onClick={onAction}
              isLoading={isLoading}
              className="cursor-pointer"
            >
              {actionText}
            </Button>
          )}
        </>
      }
    >
      <div className="flex gap-4 items-start">
        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm border border-border/10', config.iconStyles)}>
          <Icon className="h-5.5 w-5.5" />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed pt-1 flex-1">
          {message}
        </p>
      </div>
    </Modal>
  );
}

export default StatusDialog;
