'use client';

import React from 'react';
import { useTripAnalytics } from '@/hooks/useTripAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  TripAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';

export default function TripReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useTripAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing trip analytical reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting trip reports as ${format.toUpperCase()}...`);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Trip Analytics"
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

      <TripAnalytics data={data} />
    </div>
  );
}
