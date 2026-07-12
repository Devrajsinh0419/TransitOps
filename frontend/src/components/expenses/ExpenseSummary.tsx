'use client';

import React from 'react';
import { ExpenseSummary as IExpenseSummary } from '@/types/expense';
import { Landmark, Calendar, Award, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpenseSummaryProps {
  summary: IExpenseSummary;
}

export function ExpenseSummary({ summary }: ExpenseSummaryProps) {
  const cards = [
    {
      title: 'APPROVED SPEND (MONTH)',
      value: `$${summary.monthlyExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Audit cleared operating costs',
      icon: Landmark,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: "TODAY'S TRANSACTIONS",
      value: `$${summary.todayExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Cleared billing logged today',
      icon: Calendar,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'TOP EXPENDITURE CATEGORY',
      value: summary.topExpenseCategory,
      description: 'Highest cumulative cost sector',
      icon: Award,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'DAILY AVERAGE RUNRATE',
      value: `$${summary.averageDailyCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Approximated daily financial outflow',
      icon: Receipt,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 select-none text-left">
      {cards.map((card, idx) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="p-4 bg-card border border-border/50 rounded-2xl shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {card.title}
            </span>
            <div className="text-xl font-black text-foreground">{card.value}</div>
            <p className="text-[9px] text-muted-foreground">{card.description}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${card.color}`}>
            <card.icon className="h-5 w-5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default ExpenseSummary;
