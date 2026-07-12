'use client';

import React from 'react';
import { useFleetAnalytics } from '@/hooks/useFleetAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  FleetAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';

export default function FleetReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useFleetAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing fleet analytical reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting fleet reports as ${format.toUpperCase()}...`);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Fleet Analytics"
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

      <FleetAnalytics data={data} />
    </div>
  );
}
