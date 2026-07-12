'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, Bell, Navigation, Wrench, Users, ShieldAlert, Laptop } from 'lucide-react';
import { Notification } from '@/types/dashboard';
import { cn } from '@/lib/utils';

export interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
}

const catIcons = {
  trips: Navigation,
  maintenance: Wrench,
  drivers: Users,
  vehicles: ShieldAlert,
  system: Laptop,
};

const catColors = {
  trips: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  maintenance: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  drivers: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  vehicles: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
  system: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
};

export function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
}: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs"
          />

          {/* Slide-over Panel Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-card border-l border-border flex flex-col shadow-premium select-none"
          >
            {/* Slide Header */}
            <div className="p-4 border-b border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-primary" />
                <h2 className="text-sm font-bold text-foreground">Alert Center</h2>
                {unreadCount > 0 && (
                  <span className="flex h-5 items-center justify-center rounded-full bg-primary px-2 text-[9px] font-extrabold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab Toggles & Actions */}
            <div className="px-4 py-2 bg-muted/20 border-b border-border/40 flex items-center justify-between">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveTab('all')}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors cursor-pointer',
                    activeTab === 'all' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  All Alerts
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={cn(
                    'px-2.5 py-1 text-[10px] font-bold rounded-md transition-colors cursor-pointer',
                    activeTab === 'unread' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="flex items-center gap-1 text-[9px] font-extrabold text-primary hover:underline cursor-pointer"
                >
                  <Check className="h-3 w-3" />
                  <span>Mark all read</span>
                </button>
              )}
            </div>

            {/* Notifications Scroll List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {filtered.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/60 py-12">
                  <Bell className="h-10 w-10 text-muted-foreground/30 mb-2 stroke-1" />
                  <p className="text-xs font-bold">All clear!</p>
                  <p className="text-[10px] text-muted-foreground/50 max-w-xs mt-1">
                    No notifications or system logs require attention at this time.
                  </p>
                </div>
              ) : (
                filtered.map((item) => {
                  const CatIcon = catIcons[item.category] || Bell;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onMarkAsRead(item.id)}
                      className={cn(
                        'p-3 border border-border/80 rounded-xl flex items-start gap-3 text-left transition-colors cursor-pointer hover:bg-muted/30 relative overflow-hidden',
                        !item.read ? 'bg-primary/5 border-primary/20' : 'bg-muted/10'
                      )}
                    >
                      {/* Category Symbol */}
                      <div className={cn(
                        'flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border',
                        catColors[item.category] || catColors.system
                      )}>
                        <CatIcon className="h-3.5 w-3.5" />
                      </div>

                      {/* Content details */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex justify-between items-baseline gap-2">
                          <h4 className="text-[11px] font-bold text-foreground truncate">{item.title}</h4>
                          <span className="text-[9px] font-semibold text-muted-foreground/60 shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground/90 leading-relaxed font-semibold">
                          {item.message}
                        </p>
                      </div>

                      {/* Unread circle badge */}
                      {!item.read && (
                        <span className="absolute top-3 right-3 flex h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default NotificationPanel;
