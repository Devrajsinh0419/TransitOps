import apiClient from './axios';
import {
  ExecutiveKPIs,
  FleetAnalyticsReport,
  TripAnalyticsReport,
  DriverAnalyticsReport,
  MaintenanceAnalyticsReport,
  FuelAnalyticsReport,
  ExpenseAnalyticsReport,
  ReportFilters,
  CustomReportConfig,
  CustomReport,
} from '@/types/reports';

export const reportService = {
  getExecutiveKPIs: async (filters?: ReportFilters): Promise<ExecutiveKPIs> => {
    const response = await apiClient.get<ExecutiveKPIs>('/reports/executive-kpis', { params: filters });
    return response.data;
  },

  getFleetAnalytics: async (filters?: ReportFilters): Promise<FleetAnalyticsReport> => {
    const response = await apiClient.get<FleetAnalyticsReport>('/reports/fleet', { params: filters });
    return response.data;
  },

  getTripAnalytics: async (filters?: ReportFilters): Promise<TripAnalyticsReport> => {
    const response = await apiClient.get<TripAnalyticsReport>('/reports/trips', { params: filters });
    return response.data;
  },

  getDriverAnalytics: async (filters?: ReportFilters): Promise<DriverAnalyticsReport> => {
    const response = await apiClient.get<DriverAnalyticsReport>('/reports/drivers', { params: filters });
    return response.data;
  },

  getMaintenanceAnalytics: async (filters?: ReportFilters): Promise<MaintenanceAnalyticsReport> => {
    const response = await apiClient.get<MaintenanceAnalyticsReport>('/reports/maintenance', { params: filters });
    return response.data;
  },

  getFuelAnalytics: async (filters?: ReportFilters): Promise<FuelAnalyticsReport> => {
    const response = await apiClient.get<FuelAnalyticsReport>('/reports/fuel', { params: filters });
    return response.data;
  },

  getExpenseAnalytics: async (filters?: ReportFilters): Promise<ExpenseAnalyticsReport> => {
    const response = await apiClient.get<ExpenseAnalyticsReport>('/reports/expenses', { params: filters });
    return response.data;
  },

  getCustomReport: async (config: CustomReportConfig): Promise<CustomReport> => {
    const response = await apiClient.post<CustomReport>('/reports/custom', config);
    return response.data;
  },

  exportCSV: async (reportName: string, filters?: ReportFilters): Promise<Blob> => {
    const response = await apiClient.get(`/reports/export/csv`, {
      params: { reportName, ...filters },
      responseType: 'blob',
    });
    return response.data;
  },

  exportExcel: async (reportName: string, filters?: ReportFilters): Promise<Blob> => {
    const response = await apiClient.get(`/reports/export/excel`, {
      params: { reportName, ...filters },
      responseType: 'blob',
    });
    return response.data;
  },
};

export default reportService;
