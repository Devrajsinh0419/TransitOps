import { BaseEntity } from './common';

export type ReportType = 'fleet_utilization' | 'fuel_consumption' | 'financial_summary' | 'driver_performance';
export type ExportFormat = 'pdf' | 'csv' | 'xlsx';

export interface ReportConfig extends BaseEntity {
  name: string;
  type: ReportType;
  dateRangeStart: string;
  dateRangeEnd: string;
  format: ExportFormat;
  generatedBy: string;
  fileUrl?: string;
  status: 'pending' | 'ready' | 'failed';
}
