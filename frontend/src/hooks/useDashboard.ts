'use client';

import { useState, useEffect } from 'react';
import { TripSummary, Activity, Notification, ChartData } from '@/types/dashboard';
import { toast } from 'sonner';

const mockTrips: TripSummary[] = [
  {
    id: 'TRP-8902',
    vehicle: 'Volvo FH16 (TRK-491)',
    driver: 'John Doe',
    source: 'New York Port',
    destination: 'Chicago Logistics Hub',
    cargo: 'Electronic components',
    status: 'on_trip',
    eta: '5 hours',
  },
  {
    id: 'TRP-8903',
    vehicle: 'Scania R500 (TRK-108)',
    driver: 'Sarah Smith',
    source: 'Los Angeles Terminal',
    destination: 'Phoenix Warehouse',
    cargo: 'Medical supplies',
    status: 'on_trip',
    eta: '2 hours',
  },
  {
    id: 'TRP-8904',
    vehicle: 'Mercedes Actros (TRK-552)',
    driver: 'Michael Brown',
    source: 'Seattle Harbor',
    destination: 'Salt Lake Depot',
    cargo: 'Automotive parts',
    status: 'pending',
    eta: 'Pending Departure',
  },
  {
    id: 'TRP-8905',
    vehicle: 'DAF XF (TRK-301)',
    driver: 'Emma Davis',
    source: 'Houston Port',
    destination: 'Dallas Distribution',
    cargo: 'Retail merchandise',
    status: 'completed',
    eta: 'Arrived',
  },
];

const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'trip_created',
    time: '12 minutes ago',
    description: 'New trip TRP-8904 scheduled for Seattle to Salt Lake City.',
    user: 'Sarah Admin',
  },
  {
    id: 'act-2',
    type: 'driver_assigned',
    time: '45 minutes ago',
    description: 'Driver Michael Brown assigned to vehicle TRK-552.',
    user: 'David Dispatcher',
  },
  {
    id: 'act-3',
    type: 'fuel_logged',
    time: '2 hours ago',
    description: 'Fuel receipt of 350L ($480.00) logged for Volvo TRK-491.',
    user: 'John Doe',
  },
  {
    id: 'act-4',
    type: 'maintenance_started',
    time: '4 hours ago',
    description: 'Brake pad replacement started for Scania TRK-201.',
    user: 'Marcus Mechanic',
  },
  {
    id: 'act-5',
    type: 'vehicle_added',
    time: '1 day ago',
    description: 'New Freightliner Cascadia TRK-789 added to the fleet.',
    user: 'Sarah Admin',
  },
];

const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    category: 'maintenance',
    title: 'Critical Engine Failure Warning',
    message: 'Engine fault code SPN-102 reported on vehicle TRK-108 (Scania R500). Action required.',
    time: '5m ago',
    read: false,
  },
  {
    id: 'notif-2',
    category: 'trips',
    title: 'Trip Delay Alert',
    message: 'Trip TRP-8902 is running 45 minutes behind schedule due to traffic on I-80.',
    time: '20m ago',
    read: false,
  },
  {
    id: 'notif-3',
    category: 'drivers',
    title: 'License Expiration Warning',
    message: 'Driver Marcus Miller CDL expires in 12 days. Renew credentials to avoid violation.',
    time: '1h ago',
    read: false,
  },
  {
    id: 'notif-4',
    category: 'vehicles',
    title: 'Annual Inspection Due',
    message: 'Vehicle TRK-552 due for annual safety inspection by July 20, 2026.',
    time: '1d ago',
    read: true,
  },
  {
    id: 'notif-5',
    category: 'system',
    title: 'System Maintenance Scheduled',
    message: 'TransitOps ERP will undergo scheduled updates on Saturday from 02:00 to 04:00 UTC.',
    time: '2d ago',
    read: true,
  },
];

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

  const fetchDashboardData = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setTrips(mockTrips);
      setActivities(mockActivities);
      setNotifications(mockNotifications);
      setChartData(mockChartData);
      setIsLoading(false);
    }, 850);
    
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast?.success?.('All notifications marked as read'); // dynamic check
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
