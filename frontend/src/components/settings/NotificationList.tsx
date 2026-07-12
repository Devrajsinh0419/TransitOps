'use client';

import React from 'react';
import { Notification } from '@/types/settings';
import { NotificationCard } from './NotificationCard';
import { Button } from '../ui/Button';
import { BellOff, CheckCheck } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

interface NotificationListProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onDismiss: (id: string) => void;
}

export function NotificationList({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
}: NotificationListProps) {
  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <div className="space-y-4 select-none text-left">
      <div className="flex justify-between items-center pb-2 border-b border-border/30">
        <div className="space-y-0.5">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
            Notification Feed
          </h3>
          <p className="text-[10px] text-muted-foreground">
            You have {unreadCount} unread system notifications
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllRead}
            className="h-8 text-[10px] font-bold rounded-lg gap-1 hover:bg-muted"
            leftIcon={<CheckCheck className="h-3.5 w-3.5" />}
          >
            Mark All Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-border/50 rounded-2xl max-w-sm mx-auto space-y-3">
          <BellOff className="h-8 w-8 text-muted-foreground/50 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-xs font-black text-foreground uppercase tracking-wider">No Notifications</h4>
            <p className="text-[9px] text-muted-foreground px-4">
              All caught up! You do not have any pending system actions or routing notifications.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout">
            {notifications.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onMarkRead={onMarkRead}
                onDismiss={onDismiss}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default NotificationList;
