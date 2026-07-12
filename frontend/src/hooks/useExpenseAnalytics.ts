'use client';

import { useState, useEffect } from 'react';
import { ExpenseAnalyticsReport, ReportFilters } from '@/types/reports';

export function useExpenseAnalytics(filters?: ReportFilters) {
  const [data, setData] = useState<ExpenseAnalyticsReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData({
        expensesByCategory: [
          { name: 'Fuel', value: 8420 },
          { name: 'Maintenance', value: 4250 },
          { name: 'Insurance', value: 2900 },
          { name: 'Tolls', value: 850 },
          { name: 'Miscellaneous', value: 420 },
        ],
        monthlyExpenses: [
          { name: 'Jan', value: 14200 },
          { name: 'Feb', value: 15100 },
          { name: 'Mar', value: 13900 },
          { name: 'Apr', value: 16200 },
          { name: 'May', value: 15800 },
          { name: 'Jun', value: 16840 },
        ],
        vehicleExpenses: [
          { name: 'TRK-108-B', value: 4500 },
          { name: 'TRK-491-A', value: 3100 },
          { name: 'VAN-102-X', value: 1200 },
        ],
        departmentExpenses: [
          { name: 'Heavy Logistics', value: 12500 },
          { name: 'Last Mile Delivery', value: 3200 },
          { name: 'Support & Shuttle', value: 1140 },
        ],
        cards: {
          highestExpense: { label: 'HIGHEST LOGGED COST', value: '$1,250.00', extra: 'Workshop repair ticket #102' },
          lowestExpense: { label: 'LOWEST LOGGED COST', value: '$12.50', extra: 'Highway toll gate transponder' },
          averageMonthlyExpense: { label: 'AVERAGE MONTHLY OUTFLOW', value: '$15,340.00', extra: 'Aggregated operating costs' },
          expenseDistribution: { label: 'TOP EXPENSE CATEGORY', value: 'Fuel refilling (50.1%)', extra: 'Followed by maintenance (25.2%)' },
        },
      });
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  return {
    data,
    isLoading,
    error,
  };
}

export default useExpenseAnalytics;
