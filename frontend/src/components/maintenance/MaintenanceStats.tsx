'use client';

import React from 'react';
import { MaintenanceRecord } from '@/types/maintenance';
import { Wrench, Clock, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MaintenanceStatsProps {
  records: MaintenanceRecord[];
}

export function MaintenanceStats({ records }: MaintenanceStatsProps) {
  // Calculations
  const totalCost = records.reduce((sum, r) => sum + (r.totalCost || 0), 0);
  const activeOrders = records.filter((r) => ['pending', 'approved', 'in_progress'].includes(r.status)).length;
  const completedServices = records.filter((r) => r.status === 'completed').length;
  const averageCost = records.length > 0 ? parseFloat((totalCost / records.length).toFixed(2)) : 0;

  const statItems = [
    {
      title: 'TOTAL EXPENDITURES',
      value: `$${totalCost.toLocaleString()}`,
      description: 'Cumulative fleet maintenance billing',
      icon: DollarSign,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'ACTIVE WORK ORDERS',
      value: activeOrders.toString(),
      description: 'Scheduled, approved or in-shop tasks',
      icon: Wrench,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'COMPLETED SERVICES',
      value: completedServices.toString(),
      description: 'Successfully resolved inspection logs',
      icon: CheckCircle2,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'AVERAGE TICKET COST',
      value: `$${averageCost.toLocaleString()}`,
      description: 'Average expense per work order ticket',
      icon: Clock,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, idx) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="p-4 bg-card border border-border/50 rounded-2xl shadow-sm flex items-center justify-between"
        >
          <div className="space-y-1">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
              {stat.title}
            </span>
            <div className="text-xl font-black text-foreground">{stat.value}</div>
            <p className="text-[9px] text-muted-foreground">{stat.description}</p>
          </div>
          <div className={`p-2.5 rounded-xl border ${stat.color}`}>
            <stat.icon className="h-5 w-5" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MaintenanceStats;
