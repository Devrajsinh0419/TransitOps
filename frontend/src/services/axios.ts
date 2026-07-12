import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { STORAGE_KEYS } from '@/lib/constants';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request Interceptor: Attach JWT Bearer Token if it exists
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (token && config.headers) {
        // Remove quotes if present from JSON.stringify storage
        const cleanToken = token.replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${cleanToken}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Catch authorization and token expiration failures
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // Check if error is 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      console.warn('Unauthorized request - session may have expired.');
      
      // Placeholder: Handle token refresh logic or redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        
        // In a real application, you might attempt to call a refresh token endpoint here
        // or redirect to the login screen:
        // window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
