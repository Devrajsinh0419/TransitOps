import apiClient from './axios';
import { User, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: Record<string, any>): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (payload: Record<string, any>): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', payload);
    return response.data;
  },

  refreshToken: async (token: string): Promise<{ accessToken: string; refreshToken: string }> => {
    const response = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh-token', { refreshToken: token });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  },
};

export default authService;
