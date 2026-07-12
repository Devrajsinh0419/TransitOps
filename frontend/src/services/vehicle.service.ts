import apiClient from './axios';
import { Vehicle, VehicleFilters, VehicleDetails } from '@/types/vehicle';
import { PaginatedResponse } from '@/types/common';

export const vehicleService = {
  getVehicles: async (params?: Partial<VehicleFilters>): Promise<PaginatedResponse<Vehicle>> => {
    const response = await apiClient.get<PaginatedResponse<Vehicle>>('/vehicles', { params });
    return response.data;
  },

  getVehicle: async (id: string): Promise<VehicleDetails> => {
    const response = await apiClient.get<VehicleDetails>(`/vehicles/${id}`);
    return response.data;
  },

  createVehicle: async (data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.post<Vehicle>('/vehicles', data);
    return response.data;
  },

  updateVehicle: async (id: string, data: Partial<Vehicle>): Promise<Vehicle> => {
    const response = await apiClient.patch<Vehicle>(`/vehicles/${id}`, data);
    return response.data;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await apiClient.delete(`/vehicles/${id}`);
  },

  archiveVehicle: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.post<Vehicle>(`/vehicles/${id}/archive`);
    return response.data;
  },

  restoreVehicle: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.post<Vehicle>(`/vehicles/${id}/restore`);
    return response.data;
  },
};

export default vehicleService;
