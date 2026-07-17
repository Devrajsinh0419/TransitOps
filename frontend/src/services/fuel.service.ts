import apiClient from './axios';
import { FuelLog, FuelFilters } from '@/types/fuel';

export const fuelService = {
  getFuelLogs: async (params?: Partial<FuelFilters>): Promise<{ results: FuelLog[]; count: number }> => {
    const response = await apiClient.get('/fuel-entries', { params });
    return response.data;
  },

  getFuelLog: async (id: string): Promise<FuelLog> => {
    const response = await apiClient.get<FuelLog>(`/fuel-entries/${id}`);
    return response.data;
  },

  createFuelLog: async (data: Record<string, any>): Promise<FuelLog> => {
    const response = await apiClient.post<FuelLog>('/fuel-entries', data);
    return response.data;
  },

  updateFuelLog: async (id: string, data: Record<string, any>): Promise<FuelLog> => {
    const response = await apiClient.patch<FuelLog>(`/fuel-entries/${id}`, data);
    return response.data;
  },
};

export default fuelService;
