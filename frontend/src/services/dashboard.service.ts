import apiClient from './axios';
import { DashboardStats, FleetSummary, TripSummary, Activity, Notification } from '@/types/dashboard';

export const dashboardService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  getFleetOverview: async (): Promise<FleetSummary> => {
    const response = await apiClient.get<FleetSummary>('/dashboard/fleet-overview');
    return response.data;
  },

  getTrips: async (): Promise<TripSummary[]> => {
    const response = await apiClient.get<TripSummary[]>('/dashboard/trips');
    return response.data;
  },

  getActivities: async (): Promise<Activity[]> => {
    const response = await apiClient.get<Activity[]>('/dashboard/activities');
    return response.data;
  },

  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/dashboard/notifications');
    return response.data;
  },
};

export default dashboardService;
