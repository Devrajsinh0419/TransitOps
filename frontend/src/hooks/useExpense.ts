'use client';

import { useState, useEffect } from 'react';
import { ExpenseRecord } from '@/types/expense';
import { expenseService } from '@/services/expense.service';

export function useExpense(id: string) {
  const [expense, setExpense] = useState<ExpenseRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchExpense = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await expenseService.getExpense(id);
        setExpense(data);
      } catch (err: any) {
        setError('Expense record not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchExpense();
  }, [id]);

  return {
    expense,
    isLoading,
    error,
  };
}

export default useExpense;
