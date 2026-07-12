import apiClient from './axios';
import { ExpenseRecord, ExpenseFilters } from '@/types/expense';
import { PaginatedResponse } from '@/types/common';

export const expenseService = {
  getExpenses: async (params?: ExpenseFilters): Promise<PaginatedResponse<ExpenseRecord>> => {
    const response = await apiClient.get<PaginatedResponse<ExpenseRecord>>('/expenses', { params });
    return response.data;
  },

  getExpense: async (id: string): Promise<ExpenseRecord> => {
    const response = await apiClient.get<ExpenseRecord>(`/expenses/${id}`);
    return response.data;
  },

  createExpense: async (data: Partial<ExpenseRecord>): Promise<ExpenseRecord> => {
    const response = await apiClient.post<ExpenseRecord>('/expenses', data);
    return response.data;
  },

  updateExpense: async (id: string, data: Partial<ExpenseRecord>): Promise<ExpenseRecord> => {
    const response = await apiClient.patch<ExpenseRecord>(`/expenses/${id}`, data);
    return response.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await apiClient.delete(`/expenses/${id}`);
  },
};

export default expenseService;
