import apiClient from './axios';
import { FuelLog, FuelFilters } from '@/types/fuel';
import { PaginatedResponse } from '@/types/common';

export const fuelService = {
  getFuelLogs: async (params?: FuelFilters): Promise<PaginatedResponse<FuelLog>> => {
    const response = await apiClient.get<PaginatedResponse<FuelLog>>('/fuel-logs', { params });
    return response.data;
  },

  getFuelLog: async (id: string): Promise<FuelLog> => {
    const response = await apiClient.get<FuelLog>(`/fuel-logs/${id}`);
    return response.data;
  },

  createFuelLog: async (data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await apiClient.post<FuelLog>('/fuel-logs', data);
    return response.data;
  },

  updateFuelLog: async (id: string, data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await apiClient.patch<FuelLog>(`/fuel-logs/${id}`, data);
    return response.data;
  },
};

export default fuelService;
