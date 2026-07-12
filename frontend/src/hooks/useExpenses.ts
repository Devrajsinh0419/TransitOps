'use client';

import { useState, useEffect } from 'react';
import { ExpenseRecord, ExpenseSummary, ExpenseFilters } from '@/types/expense';
import { expenseService } from '@/services/expense.service';
import { toast } from 'sonner';

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({
    search: '',
    vehicleId: '',
    expenseType: '',
    status: '',
    page: 1,
    limit: 10,
  });
  const [summary, setSummary] = useState<ExpenseSummary>({
    monthlyExpenses: 0,
    todayExpenses: 0,
    topExpenseCategory: 'Fuel',
    averageDailyCost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await expenseService.getExpenses(filters);
      // DRF DefaultRouter returns { count, next, previous, results }
      const records: ExpenseRecord[] = (response as any).results ?? (response as any).data ?? [];
      setExpenses(records);

      const monthlyTotal = records
        .filter((e) => (e.status as string) === 'approved' || (e.status as string) === 'Approved')
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      const today = new Date().toISOString().split('T')[0];
      const todayTotal = records
        .filter(
          (e) =>
            e.date === today &&
            ((e.status as string) === 'approved' || (e.status as string) === 'Approved')
        )
        .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

      const categoryCounts: Record<string, number> = {};
      records.forEach((item) => {
        const cat = item.expenseType || 'miscellaneous';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + (Number(item.amount) || 0);
      });
      let topCategory = 'Miscellaneous';
      let maxAmount = 0;
      Object.entries(categoryCounts).forEach(([cat, amt]) => {
        if (amt > maxAmount) {
          maxAmount = amt;
          topCategory = cat.charAt(0).toUpperCase() + cat.slice(1);
        }
      });

      const averageDaily = records.length > 0 ? parseFloat((monthlyTotal / 30).toFixed(2)) : 0;

      setSummary({
        monthlyExpenses: parseFloat(monthlyTotal.toFixed(2)),
        todayExpenses: parseFloat(todayTotal.toFixed(2)),
        topExpenseCategory: topCategory,
        averageDailyCost: averageDaily,
      });
    } catch (e: any) {
      const detail = e?.response?.data?.detail || 'Could not fetch expense ledger.';
      setError(detail);
      toast.error('Sync Error', { description: detail });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const deleteLocalExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      toast.success('Expense record deleted successfully');
      fetchExpenses();
    } catch (e: any) {
      toast.error('Failed to delete expense');
    }
  };

  return {
    expenses,
    filters,
    setFilters,
    summary,
    isLoading,
    error,
    deleteLocalExpense,
    refetch: fetchExpenses,
  };
}

export default useExpenses;
