import apiClient from './axios';
import { Driver } from '@/types/driver';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const driverService = {
  getDrivers: async (params?: QueryParams): Promise<PaginatedResponse<Driver>> => {
    const response = await apiClient.get<PaginatedResponse<Driver>>('/drivers', { params });
    return response.data;
  },

  getDriver: async (id: string): Promise<Driver> => {
    const response = await apiClient.get<Driver>(`/drivers/${id}`);
    return response.data;
  },

  createDriver: async (data: Partial<Driver>): Promise<Driver> => {
    const response = await apiClient.post<Driver>('/drivers', data);
    return response.data;
  },

  updateDriver: async (id: string, data: Partial<Driver>): Promise<Driver> => {
    const response = await apiClient.patch<Driver>(`/drivers/${id}`, data);
    return response.data;
  },

  deleteDriver: async (id: string): Promise<void> => {
    await apiClient.delete(`/drivers/${id}`);
  },

  suspendDriver: async (id: string): Promise<Driver> => {
    const response = await apiClient.post<Driver>(`/drivers/${id}/suspend`);
    return response.data;
  },

  activateDriver: async (id: string): Promise<Driver> => {
    const response = await apiClient.post<Driver>(`/drivers/${id}/activate`);
    return response.data;
  },
};

export default driverService;
