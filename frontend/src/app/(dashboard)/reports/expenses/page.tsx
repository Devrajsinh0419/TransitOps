'use client';

import React from 'react';
import { useExpenseAnalytics } from '@/hooks/useExpenseAnalytics';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  ExpenseAnalytics,
  AnalyticsSkeleton,
} from '@/components/reports';
import { toast } from 'sonner';

export default function ExpenseReportsPage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({});

  const { data, isLoading } = useExpenseAnalytics(filters);

  const handleRefresh = () => {
    toast.success('Refreshing operating expense reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    toast.success(`Exporting expense reports as ${format.toUpperCase()}...`);
  };

  if (isLoading || !data) {
    return <AnalyticsSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      <ReportHeader
        title="Expense Analytics"
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

      <ExpenseAnalytics data={data} />
    </div>
  );
}
