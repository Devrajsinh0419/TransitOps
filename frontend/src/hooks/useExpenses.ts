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
      const records: ExpenseRecord[] = response.data || [];
      setExpenses(records);

      const monthlyTotal = records
        .filter((e: ExpenseRecord) => e.status === 'approved')
        .reduce((sum: number, item: ExpenseRecord) => sum + (item.amount || 0), 0);

      const todayTotal = records
        .filter((e: ExpenseRecord) => e.date === new Date().toISOString().split('T')[0] && e.status === 'approved')
        .reduce((sum: number, item: ExpenseRecord) => sum + (item.amount || 0), 0);

      const categoryCounts: Record<string, number> = {};
      records.forEach((item: ExpenseRecord) => {
        if (item.status === 'approved') {
          categoryCounts[item.expenseType] = (categoryCounts[item.expenseType] || 0) + (item.amount || 0);
        }
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
      setError('Failed to fetch expenses');
      toast.error('Sync Error', { description: 'Could not fetch expense ledger.' });
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
