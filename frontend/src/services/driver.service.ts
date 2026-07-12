import apiClient from './axios';
import { Driver } from '@/types/driver';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const driverService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<Driver>> => {
    const response = await apiClient.get<PaginatedResponse<Driver>>('/drivers', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Driver> => {
    const response = await apiClient.get<Driver>(`/drivers/${id}`);
    return response.data;
  },

  create: async (data: Partial<Driver>): Promise<Driver> => {
    const response = await apiClient.post<Driver>('/drivers', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    const response = await apiClient.patch<Driver>(`/drivers/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/drivers/${id}`);
  },
};
export default driverService;
