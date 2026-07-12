'use client';

import { useState, useEffect } from 'react';
import { TripSummary, Activity, Notification, ChartData } from '@/types/dashboard';
import { dashboardService } from '@/services/dashboard.service';
import { toast } from 'sonner';

const mockChartData: ChartData = {
  vehicleStatus: [
    { name: 'Available', value: 88, color: '#10b981' },
    { name: 'On Trip', value: 42, color: '#3b82f6' },
    { name: 'In Shop', value: 12, color: '#f59e0b' },
    { name: 'Out of Order', value: 4, color: '#ef4444' },
  ],
  monthlyTrips: [
    { month: 'Jan', trips: 140, completed: 135 },
    { month: 'Feb', trips: 165, completed: 158 },
    { month: 'Mar', trips: 180, completed: 172 },
    { month: 'Apr', trips: 175, completed: 170 },
    { month: 'May', trips: 210, completed: 202 },
    { month: 'Jun', trips: 235, completed: 224 },
  ],
  fuelCostTrend: [
    { date: 'Jul 06', cost: 1200, consumption: 380 },
    { date: 'Jul 07', cost: 1450, consumption: 450 },
    { date: 'Jul 08', cost: 950, consumption: 310 },
    { date: 'Jul 09', cost: 1600, consumption: 510 },
    { date: 'Jul 10', cost: 1100, consumption: 360 },
    { date: 'Jul 11', cost: 1300, consumption: 410 },
    { date: 'Jul 12', cost: 1250, consumption: 395 },
  ],
  fleetUtilization: [
    { time: '08:00', percentage: 65 },
    { time: '10:00', percentage: 74 },
    { time: '12:00', percentage: 82 },
    { time: '14:00', percentage: 85 },
    { time: '16:00', percentage: 78 },
    { time: '18:00', percentage: 72 },
    { time: '20:00', percentage: 60 },
  ],
};

export function useDashboard() {
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [tripsRes, activitiesRes, notificationsRes] = await Promise.all([
        dashboardService.getTrips(),
        dashboardService.getActivities(),
        dashboardService.getNotifications(),
      ]);

      const mappedTrips = tripsRes.map((t: any): TripSummary => {
        let status: 'pending' | 'on_trip' | 'completed' | 'cancelled' | 'maintenance' = 'pending';
        const rawStatus = String(t.status).toLowerCase();
        if (rawStatus === 'dispatched' || rawStatus === 'on trip' || rawStatus === 'on_trip') {
          status = 'on_trip';
        } else if (rawStatus === 'completed') {
          status = 'completed';
        } else if (rawStatus === 'cancelled') {
          status = 'cancelled';
        }

        return {
          id: t.id ? `TRP-${t.id}` : 'TRP-UNKNOWN',
          vehicle: t.vehicle ?? 'Unknown Vehicle',
          driver: t.driver ?? 'Unknown Driver',
          source: t.source ?? 'Unknown Source',
          destination: t.destination ?? 'Unknown Destination',
          cargo: t.cargo ?? 'General Cargo',
          status,
          eta: status === 'completed' ? 'Arrived' : '2 hours',
        };
      });

      const mappedActivities = activitiesRes.map((a: any): Activity => {
        let type: 'vehicle_added' | 'trip_created' | 'maintenance_started' | 'driver_assigned' | 'fuel_logged' = 'trip_created';
        const rawDesc = String(a.description).toLowerCase();
        if (rawDesc.includes('vehicle')) type = 'vehicle_added';
        else if (rawDesc.includes('maintenance')) type = 'maintenance_started';
        else if (rawDesc.includes('driver')) type = 'driver_assigned';
        else if (rawDesc.includes('fuel')) type = 'fuel_logged';

        return {
          id: String(a.id),
          type,
          time: 'Just now',
          description: a.description,
          user: a.user ?? 'System',
        };
      });

      const mappedNotifications = notificationsRes.map((n: any): Notification => {
        let category: 'trips' | 'maintenance' | 'drivers' | 'vehicles' | 'system' = 'system';
        const rawTitle = String(n.title).toLowerCase();
        if (rawTitle.includes('trip')) category = 'trips';
        else if (rawTitle.includes('maintenance')) category = 'maintenance';
        else if (rawTitle.includes('driver')) category = 'drivers';
        else if (rawTitle.includes('fuel') || rawTitle.includes('vehicle')) category = 'vehicles';

        return {
          id: String(n.id),
          category,
          title: n.title,
          message: n.message,
          time: '5m ago',
          read: n.read ?? false,
        };
      });

      setTrips(mappedTrips);
      setActivities(mappedActivities);
      setNotifications(mappedNotifications);
      setChartData(mockChartData);
    } catch (err: any) {
      setError('Failed to fetch dashboard telemetry');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast?.success?.('All notifications marked as read');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return {
    trips,
    activities,
    notifications,
    chartData,
    isLoading,
    error,
    refreshDashboard: fetchDashboardData,
    markAllNotificationsAsRead,
    markNotificationAsRead,
  };
}

export default useDashboard;
