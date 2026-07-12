import apiClient from './axios';
import { ReportConfig } from '@/types/report';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const reportService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<ReportConfig>> => {
    const response = await apiClient.get<PaginatedResponse<ReportConfig>>('/reports', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ReportConfig> => {
    const response = await apiClient.get<ReportConfig>(`/reports/${id}`);
    return response.data;
  },

  create: async (data: Partial<ReportConfig>): Promise<ReportConfig> => {
    const response = await apiClient.post<ReportConfig>('/reports', data);
    return response.data;
  },

  generate: async (id: string): Promise<ReportConfig> => {
    const response = await apiClient.post<ReportConfig>(`/reports/${id}/generate`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/reports/${id}`);
  },
};
export default reportService;
