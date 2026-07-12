import apiClient from './axios';
import { User, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: any): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (payload: any): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', payload);
    return response.data;
  },
};
export default authService;
