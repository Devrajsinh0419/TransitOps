import apiClient from './axios';
import {
  Profile,
  User,
  Role,
  Permission,
  AppearanceSettings,
  FleetSettings,
  SecuritySettings,
} from '@/types/settings';

export const settingsService = {
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/settings/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
    const response = await apiClient.put<Profile>('/settings/profile', data);
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/settings/users');
    return response.data;
  },

  createUser: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.post<User>('/settings/users', data);
    return response.data;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/settings/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/settings/users/${id}`);
  },

  getRoles: async (): Promise<Role[]> => {
    const response = await apiClient.get<Role[]>('/settings/roles');
    return response.data;
  },

  getPermissions: async (): Promise<Permission[]> => {
    const response = await apiClient.get<Permission[]>('/settings/permissions');
    return response.data;
  },

  getAppearance: async (): Promise<AppearanceSettings> => {
    const response = await apiClient.get<AppearanceSettings>('/settings/appearance');
    return response.data;
  },

  updateAppearance: async (data: Partial<AppearanceSettings>): Promise<AppearanceSettings> => {
    const response = await apiClient.put<AppearanceSettings>('/settings/appearance', data);
    return response.data;
  },

  getFleetSettings: async (): Promise<FleetSettings> => {
    const response = await apiClient.get<FleetSettings>('/settings/fleet');
    return response.data;
  },

  updateFleetSettings: async (data: Partial<FleetSettings>): Promise<FleetSettings> => {
    const response = await apiClient.put<FleetSettings>('/settings/fleet', data);
    return response.data;
  },

  getSecuritySettings: async (): Promise<SecuritySettings> => {
    const response = await apiClient.get<SecuritySettings>('/settings/security');
    return response.data;
  },

  updateSecuritySettings: async (data: Partial<SecuritySettings>): Promise<SecuritySettings> => {
    const response = await apiClient.put<SecuritySettings>('/settings/security', data);
    return response.data;
  },

  changePassword: async (data: Record<string, string>): Promise<any> => {
    const response = await apiClient.post('/settings/change-password', data);
    return response.data;
  },
};

export default settingsService;
