'use client';

import React from 'react';
import { useMaintenanceAnalytics } from '@/hooks/useMaintenanceAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  MaintenanceAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';
import { downloadReport } from '@/lib/export';

export default function MaintenanceReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useMaintenanceAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing maintenance cost reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    downloadReport('maintenance', format, filters);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Maintenance Analytics"
        onRefresh={handleRefresh}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        onExport={handleExport}
      />

      <ReportFilters
        filters={filters}
        onChange={setFilters}
        onClear={() => setFilters({})}
        isOpen={showFilters}
      />

      <ReportTabs />

      <MaintenanceAnalytics data={data} />
    </div>
  );
}
