'use client';

import React from 'react';
import { ExpenseAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { Landmark, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExpenseAnalyticsProps {
  data: ExpenseAnalyticsReport;
}

export function ExpenseAnalytics({ data }: ExpenseAnalyticsProps) {
  const cards = [
    { info: data.cards.highestExpense, icon: TrendingUp, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.lowestExpense, icon: TrendingDown, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.averageMonthlyExpense, icon: Landmark, color: 'text-primary bg-primary/10' },
    { info: data.cards.expenseDistribution, icon: HelpCircle, color: 'text-amber-500 bg-amber-500/10' },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Cards list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            key={card.info.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-4 bg-card border border-border/50 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-wider">
                {card.info.label}
              </span>
              <div className={`p-1.5 rounded-lg ${card.color}`}>
                <card.icon className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className="space-y-0.5">
              <div className="text-sm font-black text-foreground">{card.info.value}</div>
              <p className="text-[9px] text-muted-foreground">{card.info.extra}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Monthly Operating Expenses ($)"
          type="area"
          data={data.monthlyExpenses}
          dataKeys={['value']}
          colors={['#10b981']}
          description="Aggregated corporate spend compiled month-over-month"
        />

        <ChartCard
          title="Expenses By Category ($)"
          type="pie"
          data={data.expensesByCategory}
          dataKeys={['value']}
          colors={['#6366f1', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']}
          description="Distribution across maintenance, fuel, insurance, and tolls"
        />

        <ChartCard
          title="Expense Distribution by Vehicle ($)"
          type="bar"
          data={data.vehicleExpenses}
          dataKeys={['value']}
          colors={['#f59e0b']}
          description="Accumulative charges linked directly to specific tractor registrations"
        />

        <ChartCard
          title="Corporate Department Allocations ($)"
          type="donut"
          data={data.departmentExpenses}
          dataKeys={['value']}
          colors={['#3b82f6', '#10b981', '#6366f1']}
          description="Billing division across company branches"
        />
      </div>
    </div>
  );
}

export default ExpenseAnalytics;
