'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, ShieldAlert, CheckCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'success';
}

const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Trip #1024 completed',
    description: 'Driver John Doe successfully finalized delivery route B.',
    time: '2 mins ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Maintenance Due',
    description: 'Vehicle TRK-8902 has exceeded odometer threshold limits.',
    time: '1 hour ago',
    type: 'warning',
  },
  {
    id: '3',
    title: 'System Update',
    description: 'TransitOps ERP updated successfully to v2.4.0.',
    time: '1 day ago',
    type: 'info',
  },
];

export interface NotificationButtonProps {
  className?: string;
}

export function NotificationButton({ className }: NotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative select-none', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9.5 w-9.5 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
        aria-label="View notifications"
      >
        <Bell className="h-4.5 w-4.5" />
        <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-50 mt-1.5 w-72 bg-popover text-popover-foreground border border-border rounded-xl shadow-premium overflow-hidden"
          >
            <div className="p-4 border-b border-border/60 flex items-center justify-between">
              <span className="text-xs font-bold text-foreground">Notifications</span>
              <span className="text-[10px] font-semibold text-primary hover:underline cursor-pointer">Mark all read</span>
            </div>

            <div className="divide-y divide-border/60 max-h-64 overflow-y-auto scrollbar-thin">
              {mockNotifications.map((notif) => (
                <div key={notif.id} className="p-3.5 flex gap-3 hover:bg-muted/40 transition-colors cursor-default">
                  <div className="mt-0.5 shrink-0">
                    {notif.type === 'success' && <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                    {notif.type === 'warning' && <ShieldAlert className="h-4 w-4 text-amber-500" />}
                    {notif.type === 'info' && <Info className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div className="space-y-0.5 min-w-0 pr-1">
                    <h5 className="text-[11px] font-bold text-foreground truncate leading-snug">{notif.title}</h5>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{notif.description}</p>
                    <span className="text-[9px] text-muted-foreground/60 block pt-0.5">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-border/60 text-center bg-muted/10">
              <span className="text-[10px] font-semibold text-muted-foreground hover:text-foreground cursor-pointer">
                View all notifications
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationButton;
