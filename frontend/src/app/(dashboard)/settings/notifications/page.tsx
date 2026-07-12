'use client';

import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationCategory, NotificationStatus } from '@/types/settings';
import {
  SettingsHeader,
  SettingsSidebar,
  NotificationFilters,
  NotificationList,
  SettingsSkeleton,
} from '@/components/settings';
import { Button } from '@/components/ui/Button';
import { Save, Bell, Mail, Smartphone, Monitor } from 'lucide-react';
import { toast } from 'sonner';

export default function NotificationsSettingsPage() {
  const {
    notifications,
    settings,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    updateSettings,
  } = useNotifications();

  // Filter state
  const [statusFilter, setStatusFilter] = React.useState<NotificationStatus | 'all'>('unread');
  const [selectedCats, setSelectedCats] = React.useState<NotificationCategory[]>(['trips', 'maintenance', 'drivers', 'expenses', 'fuel', 'system']);

  // Channel toggles
  const [email, setEmail] = React.useState(true);
  const [push, setPush] = React.useState(false);
  const [inApp, setInApp] = React.useState(true);

  // Workflow toggles
  const [trips, setTrips] = React.useState(true);
  const [maint, setMaint] = React.useState(true);
  const [fuel, setFuel] = React.useState(false);
  const [exp, setExp] = React.useState(true);
  const [drivers, setDrivers] = React.useState(true);

  React.useEffect(() => {
    if (settings) {
      setEmail(settings.email);
      setPush(settings.push);
      setInApp(settings.inApp);
      setTrips(settings.trips);
      setMaint(settings.maintenance);
      setFuel(settings.fuel);
      setExp(settings.expenses);
      setDrivers(settings.drivers);
    }
  }, [settings]);

  const handleSaveSettings = async () => {
    await updateSettings({
      email,
      push,
      inApp,
      trips,
      maintenance: maint,
      fuel,
      expenses: exp,
      drivers,
    });
  };

  const handleToggleCat = (cat: NotificationCategory) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  // Filter notifications list
  const filteredNotifications = notifications.filter((n) => {
    const matchesStatus = statusFilter === 'all' || n.status === statusFilter;
    const matchesCat = selectedCats.includes(n.category);
    return matchesStatus && matchesCat;
  });

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="Notification Settings" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1 space-y-6">
          
          {/* Notification channel setup */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
              <Bell className="h-4 w-4 text-primary" />
              Notification Delivery Configuration
            </h3>

            {/* Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Email */}
              <label className="p-4 border border-border/60 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-muted/10 transition-all select-none">
                <input
                  type="checkbox"
                  checked={email}
                  onChange={(e) => setEmail(e.target.checked)}
                  className="rounded border-border/60 text-primary focus:ring-0 cursor-pointer h-4 w-4 mt-0.5"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" /> Email Digests
                  </span>
                  <p className="text-[9px] text-muted-foreground leading-normal">Send monthly reports & invoices.</p>
                </div>
              </label>

              {/* Push */}
              <label className="p-4 border border-border/60 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-muted/10 transition-all select-none">
                <input
                  type="checkbox"
                  checked={push}
                  onChange={(e) => setPush(e.target.checked)}
                  className="rounded border-border/60 text-primary focus:ring-0 cursor-pointer h-4 w-4 mt-0.5"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <Smartphone className="h-3.5 w-3.5" /> Mobile Push
                  </span>
                  <p className="text-[9px] text-muted-foreground leading-normal">Alerts to native mobile devices.</p>
                </div>
              </label>

              {/* In App */}
              <label className="p-4 border border-border/60 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-muted/10 transition-all select-none">
                <input
                  type="checkbox"
                  checked={inApp}
                  onChange={(e) => setInApp(e.target.checked)}
                  className="rounded border-border/60 text-primary focus:ring-0 cursor-pointer h-4 w-4 mt-0.5"
                />
                <div className="space-y-0.5 text-xs">
                  <span className="font-bold text-foreground flex items-center gap-1">
                    <Monitor className="h-3.5 w-3.5" /> In-App Feed
                  </span>
                  <p className="text-[9px] text-muted-foreground leading-normal">Realtime notifications in ERP drawer.</p>
                </div>
              </label>
            </div>

            {/* Workflow Categories toggles */}
            <div className="space-y-3 pt-4 border-t border-border/10">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Workflow Subscriptions</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                {/* Trips */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={trips}
                    onChange={(e) => setTrips(e.target.checked)}
                    className="rounded border-border/60 text-primary focus:ring-0 h-4 w-4"
                  />
                  <span className="font-semibold text-foreground uppercase text-[10px]">Trips</span>
                </label>

                {/* Maintenance */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maint}
                    onChange={(e) => setMaint(e.target.checked)}
                    className="rounded border-border/60 text-primary focus:ring-0 h-4 w-4"
                  />
                  <span className="font-semibold text-foreground uppercase text-[10px]">Maintenance</span>
                </label>

                {/* Fuel */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fuel}
                    onChange={(e) => setFuel(e.target.checked)}
                    className="rounded border-border/60 text-primary focus:ring-0 h-4 w-4"
                  />
                  <span className="font-semibold text-foreground uppercase text-[10px]">Fuel</span>
                </label>

                {/* Expenses */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exp}
                    onChange={(e) => setExp(e.target.checked)}
                    className="rounded border-border/60 text-primary focus:ring-0 h-4 w-4"
                  />
                  <span className="font-semibold text-foreground uppercase text-[10px]">Expenses</span>
                </label>

                {/* Drivers */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={drivers}
                    onChange={(e) => setDrivers(e.target.checked)}
                    className="rounded border-border/60 text-primary focus:ring-0 h-4 w-4"
                  />
                  <span className="font-semibold text-foreground uppercase text-[10px]">Drivers</span>
                </label>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex justify-end pt-4 border-t border-border/20">
              <Button
                onClick={handleSaveSettings}
                isLoading={isLoading}
                className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg px-4 gap-1.5"
                leftIcon={<Save className="h-3.5 w-3.5" />}
              >
                Save Notification Channels
              </Button>
            </div>
          </div>

          {/* Filters & Inbox Feed splits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <NotificationFilters
                status={statusFilter}
                onStatusChange={setStatusFilter}
                selectedCategories={selectedCats}
                onToggleCategory={handleToggleCat}
              />
            </div>
            
            <div className="md:col-span-2">
              <NotificationList
                notifications={filteredNotifications}
                onMarkRead={markAsRead}
                onMarkAllRead={markAllAsRead}
                onDismiss={deleteNotification}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
