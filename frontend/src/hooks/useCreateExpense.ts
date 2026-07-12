'use client';

import { useState } from 'react';
import { ExpenseRecord } from '@/types/expense';
import { activeExpenses } from './useExpenses';
import { activeVehicles } from './useVehicles';
import { ExpenseSchemaInput } from '@/validation/expense.schema';
import { toast } from 'sonner';

export function useCreateExpense() {
  const [isLoading, setIsLoading] = useState(false);

  const createExpense = async (data: ExpenseSchemaInput): Promise<boolean> => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const nextIdNumber = activeExpenses.length + 1;
        const expenseId = `EXP-2026-${String(nextIdNumber).padStart(4, '0')}`;
        const id = `exp-${Date.now()}`;

        // Get details of related assets
        const vehicle = data.vehicleId ? activeVehicles.find((v) => v.id === data.vehicleId) : undefined;
        
        const newExpense: ExpenseRecord = {
          id,
          expenseId,
          ...data,
          vehicleRegistration: vehicle?.registrationNumber,
          vehicleName: vehicle?.name,
          status: 'pending', // all new manual uploads enter PENDING audit approval
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        activeExpenses.unshift(newExpense);
        toast.success(`Expense ${expenseId} of $${data.amount} has been registered for approval.`);
        setIsLoading(false);
        resolve(true);
      }, 500);
    });
  };

  return {
    createExpense,
    isLoading,
  };
}

export default useCreateExpense;
