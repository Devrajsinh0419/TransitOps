'use client';

import { useState, useEffect } from 'react';
import { Notification, NotificationCategory } from '@/types/settings';
import { toast } from 'sonner';

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { id: 'not-1', category: 'trips', title: 'Trip TRP-003 Dispatched', description: 'Driver Amanda Sterling has commenced route Austin - Houston on vehicle VAN-102-X.', time: '10 mins ago', status: 'unread', createdAt: '2026-07-12', updatedAt: '2026-07-12' },
  { id: 'not-2', category: 'maintenance', title: 'Maintenance Ticket MNT-001 Approved', description: 'Workorder for TRK-108-B at Scania workshop was approved. Scheduled repair starts tomorrow.', time: '2 hours ago', status: 'unread', createdAt: '2026-07-12', updatedAt: '2026-07-12' },
  { id: 'not-3', category: 'drivers', title: 'Driver License Renewal Warning', description: 'Amanda Sterling CDL Class A license is expiring in 18 days. Submit renewals.', time: '1 day ago', status: 'read', createdAt: '2026-07-11', updatedAt: '2026-07-11' },
  { id: 'not-4', category: 'expenses', title: 'New High Expense Log Alert', description: '$1,250.00 logged for Scania truck engine overhaul requires dual operations manager approval.', time: '2 days ago', status: 'read', createdAt: '2026-07-10', updatedAt: '2026-07-10' },
];

export interface NotificationSettingsState {
  email: boolean;
  push: boolean;
  inApp: boolean;
  trips: boolean;
  maintenance: boolean;
  fuel: boolean;
  expenses: boolean;
  drivers: boolean;
}

const DEFAULT_SETTINGS: NotificationSettingsState = {
  email: true,
  push: false,
  inApp: true,
  trips: true,
  maintenance: true,
  fuel: false,
  expenses: true,
  drivers: true,
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettingsState>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In-memory simulation
    const savedNotifs = localStorage.getItem('transitops_notifications');
    const savedSettings = localStorage.getItem('transitops_notification_settings');

    if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
    else {
      setNotifications(DEFAULT_NOTIFICATIONS);
      localStorage.setItem('transitops_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
    }

    if (savedSettings) setSettings(JSON.parse(savedSettings));
    else {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem('transitops_notification_settings', JSON.stringify(DEFAULT_SETTINGS));
    }

    setIsLoading(false);
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, status: 'read' as const } : n));
    setNotifications(updated);
    localStorage.setItem('transitops_notifications', JSON.stringify(updated));
    toast.success('Alert marked as read');
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, status: 'read' as const }));
    setNotifications(updated);
    localStorage.setItem('transitops_notifications', JSON.stringify(updated));
    toast.success('All alerts marked as read');
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('transitops_notifications', JSON.stringify(updated));
    toast.info('Notification dismissed');
  };

  const updateSettings = async (newSettings: Partial<NotificationSettingsState>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('transitops_notification_settings', JSON.stringify(updated));
    toast.success('Notification channels synchronized!');
    setIsLoading(false);
    return true;
  };

  return {
    notifications,
    settings,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
  };
}

export default useNotifications;
