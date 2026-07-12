import apiClient from './axios';
import { MaintenanceRecord } from '@/types/maintenance';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const maintenanceService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<MaintenanceRecord>> => {
    const response = await apiClient.get<PaginatedResponse<MaintenanceRecord>>('/maintenance', { params });
    return response.data;
  },

  getById: async (id: string): Promise<MaintenanceRecord> => {
    const response = await apiClient.get<MaintenanceRecord>(`/maintenance/${id}`);
    return response.data;
  },

  create: async (data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await apiClient.post<MaintenanceRecord>('/maintenance', data);
    return response.data;
  },

  update: async (id: string, data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await apiClient.patch<MaintenanceRecord>(`/maintenance/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/maintenance/${id}`);
  },
};
export default maintenanceService;
