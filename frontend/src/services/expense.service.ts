import apiClient from './axios';
import { ExpenseRecord, ExpenseFilters } from '@/types/expense';

export const expenseService = {
  getExpenses: async (params?: Partial<ExpenseFilters>): Promise<{ results: ExpenseRecord[]; count: number }> => {
    const response = await apiClient.get('/expenses', { params });
    return response.data;
  },

  getExpense: async (id: string): Promise<ExpenseRecord> => {
    const response = await apiClient.get<ExpenseRecord>(`/expenses/${id}`);
    return response.data;
  },

  createExpense: async (data: Record<string, any>): Promise<ExpenseRecord> => {
    const response = await apiClient.post<ExpenseRecord>('/expenses', data);
    return response.data;
  },

  updateExpense: async (id: string, data: Record<string, any>): Promise<ExpenseRecord> => {
    const response = await apiClient.patch<ExpenseRecord>(`/expenses/${id}`, data);
    return response.data;
  },

  deleteExpense: async (id: string): Promise<void> => {
    await apiClient.delete(`/expenses/${id}`);
  },
};

export default expenseService;
