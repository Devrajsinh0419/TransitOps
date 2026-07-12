import apiClient from './axios';
import { ExpenseRecord } from '@/types/expense';
import { PaginatedResponse, QueryParams } from '@/types/common';

export const expenseService = {
  getAll: async (params?: QueryParams): Promise<PaginatedResponse<ExpenseRecord>> => {
    const response = await apiClient.get<PaginatedResponse<ExpenseRecord>>('/expenses', { params });
    return response.data;
  },

  getById: async (id: string): Promise<ExpenseRecord> => {
    const response = await apiClient.get<ExpenseRecord>(`/expenses/${id}`);
    return response.data;
  },

  create: async (data: Partial<ExpenseRecord>): Promise<ExpenseRecord> => {
    const response = await apiClient.post<ExpenseRecord>('/expenses', data);
    return response.data;
  },

  update: async (id: string, data: Partial<ExpenseRecord>): Promise<ExpenseRecord> => {
    const response = await apiClient.patch<ExpenseRecord>(`/expenses/${id}`, data);
    return response.data;
  },

  approve: async (id: string): Promise<ExpenseRecord> => {
    const response = await apiClient.post<ExpenseRecord>(`/expenses/${id}/approve`);
    return response.data;
  },

  reject: async (id: string): Promise<ExpenseRecord> => {
    const response = await apiClient.post<ExpenseRecord>(`/expenses/${id}/reject`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/expenses/${id}`);
  },
};
export default expenseService;
