'use client';

import React from 'react';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  CustomReportBuilder,
} from '@/components/reports';
import { toast } from 'sonner';

export default function CustomReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const handleRefresh = () => {
    toast.success('Refreshing custom reporting builder context...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting builder configurations as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Custom Reports"
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

      <CustomReportBuilder />
    </div>
  );
}
