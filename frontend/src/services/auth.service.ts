import apiClient from './axios';
import { User, LoginResponse } from '@/types/auth';

const useDemoAuth = process.env.NEXT_PUBLIC_USE_DEMO_AUTH === 'true';

export const authService = {
  login: async (credentials: Record<string, any>): Promise<LoginResponse> => {
    if (useDemoAuth) {
      const { login } = require('@/lib/demo-auth');
      return login(credentials);
    }
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    if (useDemoAuth) {
      const { logout } = require('@/lib/demo-auth');
      logout();
      return;
    }
    await apiClient.post('/auth/logout');
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    if (useDemoAuth) {
      return { message: 'Reset email sent.' };
    }
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (payload: Record<string, any>): Promise<{ message: string }> => {
    if (useDemoAuth) {
      return { message: 'Password reset successfully.' };
    }
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', payload);
    return response.data;
  },

  // Update user profile information
  updateProfile: async (profileData: Record<string, any>): Promise<any> => {
    if (useDemoAuth) {
      // In demo mode, simply echo back the data
      return profileData;
    }
    const response = await apiClient.put<any>('/auth/me', profileData);
    return response.data;
  },


  refreshToken: async (token: string): Promise<{ accessToken: string; refreshToken: string }> => {
    if (useDemoAuth) {
      return {
        accessToken: `demo-access-token-refreshed-${Date.now()}`,
        refreshToken: `demo-refresh-token-refreshed-${Date.now()}`,
      };
    }
    const response = await apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh-token', { refreshToken: token });
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    if (useDemoAuth) {
      return { message: 'Email verified successfully.' };
    }
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  },
};

export default authService;
