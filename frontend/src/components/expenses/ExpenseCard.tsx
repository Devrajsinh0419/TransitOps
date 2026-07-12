'use client';

import React from 'react';
import { ExpenseRecord } from '@/types/expense';
import { ExpenseStatusBadge } from './ExpenseStatusBadge';
import { Button } from '../ui/Button';
import { Calendar, CreditCard, Tag, DollarSign, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ExpenseCardProps {
  expense: ExpenseRecord;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 hover:shadow-md hover:border-border transition-all select-none text-left">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-muted-foreground/80 tracking-wider">
          {expense.expenseId}
        </span>
        <ExpenseStatusBadge status={expense.status} />
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-extrabold text-foreground flex items-center gap-1 capitalize">
          <Tag className="h-4 w-4 text-primary" /> {expense.expenseType}
        </h4>
        <p className="text-[10px] text-muted-foreground leading-normal">
          Cost of <span className="font-semibold text-foreground">${expense.amount.toFixed(2)}</span> billed to{' '}
          <span className="font-semibold text-foreground">{expense.vendor}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Asset Info</span>
          {expense.vehicleRegistration ? (
            <span className="font-semibold text-foreground truncate block">{expense.vehicleRegistration}</span>
          ) : (
            <span className="italic">N/A</span>
          )}
          <span className="text-[9px] block truncate">{expense.invoiceNumber}</span>
        </div>
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Payment & Date</span>
          <span className="font-semibold text-foreground flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> {expense.paymentMethod}
          </span>
          <span className="text-[9px] block truncate flex items-center gap-1 mt-0.5">
            <Calendar className="h-3 w-3" /> {expense.date}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/20">
        <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
          Approved by: {expense.approvedBy || 'Pending Audit'}
        </span>
        <Link href={`/expenses/${expense.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-[10px] px-3 font-bold hover:bg-muted text-primary rounded-lg"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Audit Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ExpenseCard;
