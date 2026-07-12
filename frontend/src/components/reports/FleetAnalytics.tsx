'use client';

import React from 'react';
import { FleetAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { Truck, Compass, DollarSign, Calendar, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface FleetAnalyticsProps {
  data: FleetAnalyticsReport;
}

export function FleetAnalytics({ data }: FleetAnalyticsProps) {
  const cards = [
    { info: data.cards.mostUsedVehicle, icon: Compass, color: 'text-primary bg-primary/10' },
    { info: data.cards.leastUsedVehicle, icon: TrendingDown, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.highestCostVehicle, icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.newestVehicle, icon: Truck, color: 'text-indigo-500 bg-indigo-500/10' },
    { info: data.cards.oldestVehicle, icon: Calendar, color: 'text-amber-500 bg-amber-500/10' },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Cards list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
          title="Fleet Utilization Trend (%)"
          type="area"
          data={data.fleetUtilizationTrend}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Average fleet runtime active hours per month"
        />

        <ChartCard
          title="Vehicle Status Distribution"
          type="donut"
          data={data.vehicleStatusDistribution}
          dataKeys={['value']}
          colors={['#10b981', '#6366f1', '#f59e0b', '#ef4444']}
          description="Allocation status of active vehicles in inventory roster"
        />

        <ChartCard
          title="Vehicle Usage By Type (Hours)"
          type="bar"
          data={data.vehicleUsageByType}
          dataKeys={['value']}
          colors={['#3b82f6']}
          description="Runtime accumulation across truck models"
        />

        <ChartCard
          title="Vehicle Lifecycle Age (Year)"
          type="bar"
          data={data.vehicleLifecycle}
          dataKeys={['value']}
          colors={['#f59e0b']}
          description="Total active fleet grouped by purchase year"
        />
      </div>
    </div>
  );
}

export default FleetAnalytics;
