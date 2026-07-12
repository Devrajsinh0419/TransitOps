'use client';

import React from 'react';
import { useDriverAnalytics } from '@/hooks/useDriverAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  DriverAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';

export default function DriverReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useDriverAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing driver safety reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting driver reports as ${format.toUpperCase()}...`);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Driver Analytics"
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

      <DriverAnalytics data={data} />
    </div>
  );
}
