'use client';

import React from 'react';
import { MaintenanceAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { Wrench, CheckCircle, Clock, Calendar, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

interface MaintenanceAnalyticsProps {
  data: MaintenanceAnalyticsReport;
}

export function MaintenanceAnalytics({ data }: MaintenanceAnalyticsProps) {
  const cards = [
    { info: data.cards.highestMaintenanceVehicle, icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.openRequests, icon: Clock, color: 'text-primary bg-primary/10' },
    { info: data.cards.completedServices, icon: CheckCircle, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.upcomingServices, icon: Calendar, color: 'text-amber-500 bg-amber-500/10' },
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
          title="Maintenance Expenses Trend ($)"
          type="area"
          data={data.maintenanceTrend}
          dataKeys={['value']}
          colors={['#ef4444']}
          description="Cumulative monthly expenditure on repairs"
        />

        <ChartCard
          title="Workshop Downtime Analysis (Hours)"
          type="bar"
          data={data.downtimeAnalysis}
          dataKeys={['value']}
          colors={['#f59e0b']}
          description="Total hours vehicle was sidelined in shop by service type"
        />

        <ChartCard
          title="Maintenance Cost Distribution"
          type="pie"
          data={data.maintenanceCost}
          dataKeys={['value']}
          colors={['#ef4444', '#f59e0b', '#3b82f6']}
          description="Split of emergency shop fees vs routine checklists"
        />

        <ChartCard
          title="Maintenance Tickets Frequency"
          type="line"
          data={data.maintenanceFrequency}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Service requests opened per month"
        />
      </div>
    </div>
  );
}

export default MaintenanceAnalytics;
