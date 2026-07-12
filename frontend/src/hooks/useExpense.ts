'use client';

import { useState, useEffect } from 'react';
import { ExpenseRecord } from '@/types/expense';
import { activeExpenses } from './useExpenses';

export function useExpense(id: string) {
  const [expense, setExpense] = useState<ExpenseRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const found = activeExpenses.find((e) => e.id === id || e.expenseId === id);
      if (found) {
        setExpense({ ...found });
      } else {
        setError('Expense record not found');
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  return {
    expense,
    isLoading,
    error,
  };
}

export default useExpense;
