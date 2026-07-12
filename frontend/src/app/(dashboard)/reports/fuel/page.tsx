'use client';

import React from 'react';
import { useFuelAnalytics } from '@/hooks/useFuelAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  FuelAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';

export default function FuelReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useFuelAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing fuel metrics reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting fuel reports as ${format.toUpperCase()}...`);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Fuel Analytics"
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

      <FuelAnalytics data={data} />
    </div>
  );
}
