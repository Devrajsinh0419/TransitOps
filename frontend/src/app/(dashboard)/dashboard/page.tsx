'use client';

import React, { useEffect, useState } from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import {
  DashboardHeader,
  WelcomeBanner,
  DashboardStats,
  DashboardFilters,
  DashboardCharts,
  TripsTable,
  QuickActions,
  FleetSummaryCard,
  RecentActivity,
  MaintenanceAlertCard,
  LicenseAlertCard,
  NotificationPanel,
  DashboardSkeleton,
} from '@/components/dashboard';
import { useDashboard } from '@/hooks/useDashboard';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useFleetOverview } from '@/hooks/useFleetOverview';
import { uiStore } from '@/store/ui.store';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const {
    trips,
    activities,
    notifications,
    chartData,
    isLoading: mainLoading,
    error: mainError,
    refreshDashboard,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  } = useDashboard();

  const { stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { overview, isLoading: overviewLoading, error: overviewError } = useFleetOverview();

  const [uiState, setUiState] = useState(uiStore.getState());
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    vehicleType: '',
    status: '',
    department: '',
  });

  useEffect(() => {
    const unsubscribe = uiStore.subscribe((state) => {
      setUiState(state);
    });
    return unsubscribe;
  }, []);

  const isLoading = mainLoading || statsLoading || overviewLoading;
  const error = mainError || statsError || overviewError;

  const handleRetry = () => {
    refreshDashboard();
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = searchTerm === '' ||
      trip.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.cargo.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = filters.status === '' ||
      trip.status.toLowerCase() === filters.status.toLowerCase() ||
      (filters.status === 'maintenance' && trip.status === 'maintenance');
      
    return matchesSearch && matchesStatus;
  });

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = searchTerm === '' ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = filters.department === '' ||
      activity.type.toLowerCase().includes(filters.department.toLowerCase()) ||
      activity.description.toLowerCase().includes(filters.department.toLowerCase());
      
    return matchesSearch && matchesDepartment;
  });

  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch = searchTerm === '' ||
      notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = filters.department === '' ||
      notif.category.toLowerCase() === filters.department.toLowerCase() ||
      (filters.department === 'operations' && notif.category === 'trips') ||
      (filters.department === 'maintenance' && notif.category === 'maintenance');
      
    return matchesSearch && matchesCategory;
  });

  // 1. Error state view
  if (error) {
    return (
      <PageContainer className="flex-1 flex flex-col items-center justify-center py-16 text-center select-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 mb-4 animate-bounce">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h2 className="text-base font-bold text-foreground">Unable to Load Dashboard</h2>
        <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-6 leading-relaxed">
          The telemetry dispatcher could not sync status metrics. Please check network connection or try again.
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={handleRetry}
          leftIcon={<RefreshCw className="h-4 w-4" />}
          className="cursor-pointer font-bold"
        >
          Retry Connection
        </Button>
      </PageContainer>
    );
  }

  // 2. Loading state view
  if (isLoading) {
    return (
      <PageContainer className="space-y-6 py-6">
        <div className="flex flex-col gap-1 pb-4 border-b border-border/60">
          <div className="h-3 w-32 bg-muted rounded"></div>
          <div className="h-6 w-52 bg-muted rounded mt-2"></div>
        </div>
        <DashboardSkeleton />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-6 space-y-6">
      {/* 1. Header component */}
      <DashboardHeader
        title="Fleet Operations Control"
        subtitle="Real-time telemetry and dispatch logistics metrics"
        onFilterToggle={() => setShowFilters(!showFilters)}
        onSearchChange={setSearchTerm}
      />

      {/* 2. Collapsible filters panel */}
      {showFilters && (
        <DashboardFilters
          onApplyFilters={setFilters}
          onResetFilters={() => setFilters({ region: '', vehicleType: '', status: '', department: '' })}
        />
      )}

      {/* 3. Welcome banner */}
      <WelcomeBanner />

      {/* 4. KPI cards grid */}
      <DashboardStats stats={stats} />

      {/* 5. Main Dashboard Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Charts, Active Trips table) */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCharts chartData={chartData} />
          <TripsTable trips={filteredTrips} />
        </div>

        {/* Right Column (Quick Actions, Warnings, Summaries, Logs) */}
        <div className="space-y-6">
          <QuickActions />
          <FleetSummaryCard summary={overview} />
          <MaintenanceAlertCard />
          <LicenseAlertCard />
          <RecentActivity activities={filteredActivities} />
        </div>
      </div>

      {/* 6. Slide-out Notifications Drawer */}
      <NotificationPanel
        isOpen={uiState.notificationsOpen}
        onClose={() => uiStore.setNotificationsOpen(false)}
        notifications={filteredNotifications}
        onMarkAllAsRead={markAllNotificationsAsRead}
        onMarkAsRead={markNotificationAsRead}
      />
    </PageContainer>
  );
}
