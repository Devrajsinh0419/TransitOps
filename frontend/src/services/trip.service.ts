import apiClient from './axios';
import { Trip } from '@/types/trip';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const tripService = {
  getTrips: async (params?: QueryParams): Promise<PaginatedResponse<Trip>> => {
    const response = await apiClient.get<PaginatedResponse<Trip>>('/trips', { params });
    return response.data;
  },

  getTrip: async (id: string): Promise<Trip> => {
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    return response.data;
  },

  createTrip: async (data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.post<Trip>('/trips', data);
    return response.data;
  },

  updateTrip: async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.patch<Trip>(`/trips/${id}`, data);
    return response.data;
  },

  deleteTrip: async (id: string): Promise<void> => {
    await apiClient.delete(`/trips/${id}`);
  },

  dispatchTrip: async (id: string): Promise<Trip> => {
    const response = await apiClient.post<Trip>(`/trips/${id}/dispatch`);
    return response.data;
  },

  completeTrip: async (id: string, data: { finalOdometer: number; actualDistance: number; fuelConsumed: number; actualRevenue: number; notes?: string }): Promise<Trip> => {
    const response = await apiClient.post<Trip>(`/trips/${id}/complete`, data);
    return response.data;
  },

  cancelTrip: async (id: string, data: { cancellationReason: string; cancellationNotes?: string }): Promise<Trip> => {
    const response = await apiClient.post<Trip>(`/trips/${id}/cancel`, data);
    return response.data;
  },
};

export default tripService;
