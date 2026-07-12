'use client';

import React from 'react';
import Link from 'next/link';
import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseSummary, ExpenseToolbar, ExpenseTable, ExpenseSkeleton } from '@/components/expenses';
import { Button } from '@/components/ui/Button';
import { Plus, Landmark } from 'lucide-react';

export default function ExpensesPage() {
  const {
    expenses,
    filters,
    setFilters,
    summary,
    isLoading,
    deleteLocalExpense,
    refetch,
  } = useExpenses();

  if (isLoading && expenses.length === 0) {
    return <ExpenseSkeleton />;
  }

  return (
    <div className="space-y-6 select-none text-left">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border/40 gap-3">
        <div className="space-y-1">
          <h1 className="text-lg font-black text-foreground flex items-center gap-2 uppercase tracking-tight">
            <Landmark className="h-5 w-5 text-primary" />
            Expense Auditing
          </h1>
          <p className="text-xs text-muted-foreground">
            Audit general operating costs, log roadside trip tolls, and check vehicle insurance invoices.
          </p>
        </div>

        <Link href="/expenses/new">
          <Button
            size="sm"
            className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5 shadow"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Log Expense
          </Button>
        </Link>
      </div>

      {/* Summary counters */}
      <ExpenseSummary summary={summary} />

      {/* Filters toolbar */}
      <ExpenseToolbar filters={filters} onChange={setFilters} onRefresh={refetch} />

      {/* Data table list */}
      {expenses.length === 0 ? (
        <div className="p-12 border border-dashed border-border/50 bg-card rounded-2xl flex flex-col items-center justify-center gap-2">
          <Landmark className="h-8 w-8 text-muted-foreground/60" />
          <h3 className="text-xs font-bold text-foreground">No expenses logged</h3>
          <p className="text-[10px] text-muted-foreground max-w-xs text-center">
            Try adjusting search queries or submit a new invoice for audit.
          </p>
        </div>
      ) : (
        <ExpenseTable expenses={expenses} onDelete={deleteLocalExpense} />
      )}
    </div>
  );
}
