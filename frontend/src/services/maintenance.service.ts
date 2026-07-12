import apiClient from './axios';
import { MaintenanceRecord, MaintenanceFilters } from '@/types/maintenance';
import { PaginatedResponse } from '@/types/common';

export const maintenanceService = {
  getMaintenance: async (params?: MaintenanceFilters): Promise<PaginatedResponse<MaintenanceRecord>> => {
    const response = await apiClient.get<PaginatedResponse<MaintenanceRecord>>('/maintenance', { params });
    return response.data;
  },

  getMaintenanceById: async (id: string): Promise<MaintenanceRecord> => {
    const response = await apiClient.get<MaintenanceRecord>(`/maintenance/${id}`);
    return response.data;
  },

  createMaintenance: async (data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await apiClient.post<MaintenanceRecord>('/maintenance', data);
    return response.data;
  },

  updateMaintenance: async (id: string, data: Partial<MaintenanceRecord>): Promise<MaintenanceRecord> => {
    const response = await apiClient.patch<MaintenanceRecord>(`/maintenance/${id}`, data);
    return response.data;
  },

  approveMaintenance: async (id: string): Promise<MaintenanceRecord> => {
    const response = await apiClient.post<MaintenanceRecord>(`/maintenance/${id}/approve`);
    return response.data;
  },

  completeMaintenance: async (id: string, data?: { odometerReading?: number }): Promise<MaintenanceRecord> => {
    const response = await apiClient.post<MaintenanceRecord>(`/maintenance/${id}/complete`, data);
    return response.data;
  },
};

export default maintenanceService;
