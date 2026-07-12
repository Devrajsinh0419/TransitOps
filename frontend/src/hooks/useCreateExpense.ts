'use client';

import { useState } from 'react';
import { ExpenseSchemaInput } from '@/validation/expense.schema';
import { expenseService } from '@/services/expense.service';
import { toast } from 'sonner';

export function useCreateExpense() {
  const [isLoading, setIsLoading] = useState(false);

  const createExpense = async (data: ExpenseSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    try {
      await expenseService.createExpense(data);
      toast.success(`Expense record submitted successfully`);
      return true;
    } catch (err: any) {
      const msg = err.response?.data?.detail || 'Failed to submit expense';
      toast.error('Failed to save expense', { description: msg });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createExpense,
    isLoading,
  };
}

export default useCreateExpense;
