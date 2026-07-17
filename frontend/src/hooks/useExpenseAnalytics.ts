'use client';

import { useState, useEffect } from 'react';
import { ExpenseAnalyticsReport, ReportFilters } from '@/types/reports';
import { reportService } from '@/services/report.service';
import { toast } from 'sonner';

export function useExpenseAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<ExpenseAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await reportService.getExpenseAnalytics(filters);
        setData(response);
      } catch (e: any) {
        const detail = e?.response?.data?.detail || 'Could not fetch operating expense analytics.';
        setError(detail);
        toast.error('Sync Error', { description: detail });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [filters]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useExpenseAnalytics;
