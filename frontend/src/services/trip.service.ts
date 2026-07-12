import apiClient from './axios';
import { Trip } from '@/types/trip';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const tripService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<Trip>> => {
    const response = await apiClient.get<PaginatedResponse<Trip>>('/trips', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Trip> => {
    const response = await apiClient.get<Trip>(`/trips/${id}`);
    return response.data;
  },

  create: async (data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.post<Trip>('/trips', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Trip>): Promise<Trip> => {
    const response = await apiClient.patch<Trip>(`/trips/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/trips/${id}`);
  },
};
export default tripService;
