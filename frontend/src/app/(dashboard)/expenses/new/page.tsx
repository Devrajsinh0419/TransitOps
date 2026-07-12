'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCreateExpense } from '@/hooks/useCreateExpense';
import { ExpenseForm } from '@/components/expenses';
import { Landmark } from 'lucide-react';

export default function NewExpensePage() {
  const router = useRouter();
  const { createExpense, isLoading } = useCreateExpense();

  const handleFormSubmit = async (data: any) => {
    const success = await createExpense(data);
    if (success) {
      router.push('/expenses');
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="pb-4 border-b border-border/40">
        <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
          <Landmark className="h-5 w-5 text-primary" />
          Submit Operating Expense
        </h1>
        <p className="text-xs text-muted-foreground">
          Log general fleet expenses, toll receipts, or parking invoices for administrator audit.
        </p>
      </div>

      <ExpenseForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}
