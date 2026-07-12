import apiClient from './axios';
import { FuelLog } from '@/types/fuel';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const fuelService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<FuelLog>> => {
    const response = await apiClient.get<PaginatedResponse<FuelLog>>('/fuel', { params });
    return response.data;
  },

  getById: async (id: string): Promise<FuelLog> => {
    const response = await apiClient.get<FuelLog>(`/fuel/${id}`);
    return response.data;
  },

  create: async (data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await apiClient.post<FuelLog>('/fuel', data);
    return response.data;
  },

  update: async (id: string, data: Partial<FuelLog>): Promise<FuelLog> => {
    const response = await apiClient.patch<FuelLog>(`/fuel/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/fuel/${id}`);
  },
};
export default fuelService;
