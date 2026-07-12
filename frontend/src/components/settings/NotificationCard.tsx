'use client';

import React from 'react';
import { Notification } from '@/types/settings';
import { Button } from '../ui/Button';
import { Check, Trash2, Bell, Truck, Wrench, ShieldAlert, DollarSign, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationCard({ notification, onMarkRead, onDismiss }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.category) {
      case 'trips':
        return { icon: Truck, color: 'text-primary bg-primary/10 border-primary/20' };
      case 'maintenance':
        return { icon: Wrench, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
      case 'drivers':
        return { icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
      case 'expenses':
        return { icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
      case 'fuel':
        return { icon: Activity, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' };
      default:
        return { icon: FileText, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' };
    }
  };

  const { icon: Icon, color } = getIcon();
  const isUnread = notification.status === 'unread';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`p-4 border rounded-xl flex items-start gap-4 transition-all relative ${
        isUnread
          ? 'border-primary/30 bg-primary/5 shadow-sm'
          : 'border-border/50 bg-card hover:bg-muted/10'
      }`}
    >
      {/* Icon Badge */}
      <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${color}`}>
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 space-y-1 select-none text-left">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black text-foreground uppercase tracking-wide">
            {notification.title}
          </h4>
          <span className="text-[9px] font-semibold text-muted-foreground uppercase">{notification.time}</span>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
          {notification.description}
        </p>

        <div className="flex justify-end gap-2 pt-2 border-t border-border/10">
          {isUnread && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkRead(notification.id)}
              className="h-7 text-[9px] font-bold px-2 rounded-lg gap-1 border-primary/20 hover:bg-primary/5 text-primary"
              leftIcon={<Check className="h-3 w-3" />}
            >
              Mark Read
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(notification.id)}
            className="h-7 w-7 rounded-lg p-0 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 flex items-center justify-center"
            aria-label="Dismiss Alert"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default NotificationCard;
