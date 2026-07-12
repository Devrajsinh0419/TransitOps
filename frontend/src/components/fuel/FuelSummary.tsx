'use client';

import React from 'react';
import { FuelSummary as IFuelSummary } from '@/types/fuel';
import { Fuel, DollarSign, TrendingUp, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

interface FuelSummaryProps {
  summary: IFuelSummary;
}

export function FuelSummary({ summary }: FuelSummaryProps) {
  const cards = [
    {
      title: 'TOTAL FUEL SPEND',
      value: `$${summary.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      description: 'Total billing for refuels',
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'TOTAL VOLUME FILLED',
      value: `${summary.totalLiters.toLocaleString()} Liters`,
      description: 'Aggregated fuel volume loaded',
      icon: Fuel,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'AVERAGE FUEL PRICE',
      value: `$${summary.averageFuelCost.toFixed(2)}/L`,
      description: 'Average market cost per liter',
      icon: TrendingUp,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'AVERAGE EFFICIENCY RATIO',
      value: `${summary.averageMileage} mi/L`,
      description: 'Approximated distance-to-fuel efficiency',
      icon: Compass,
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

export default FuelSummary;
