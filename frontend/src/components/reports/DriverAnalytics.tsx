'use client';

import React from 'react';
import { DriverAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { User, Activity, AlertTriangle, ShieldCheck, Map } from 'lucide-react';
import { motion } from 'framer-motion';

interface DriverAnalyticsProps {
  data: DriverAnalyticsReport;
}

export function DriverAnalytics({ data }: DriverAnalyticsProps) {
  const cards = [
    { info: data.cards.topDriver, icon: ShieldCheck, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.lowestSafetyScore, icon: AlertTriangle, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.driversOnDuty, icon: Activity, color: 'text-primary bg-primary/10' },
    { info: data.cards.driversOffDuty, icon: User, color: 'text-muted-foreground bg-muted/10' },
    { info: data.cards.licenseExpiringSoon, icon: Map, color: 'text-amber-500 bg-amber-500/10' },
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
          title="Safety Score Ranking (Top Drivers)"
          type="radar"
          data={data.driverPerformance}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Driver performance index based on speed compliance, harsh braking, and route timing"
        />

        <ChartCard
          title="Trips Completed by Operator"
          type="bar"
          data={data.tripsCompleted}
          dataKeys={['value']}
          colors={['#10b981']}
          description="Total dispatches resolved successfully"
        />

        <ChartCard
          title="Safety Classification Distribution"
          type="pie"
          data={data.safetyScore}
          dataKeys={['value']}
          colors={['#10b981', '#3b82f6', '#f59e0b', '#ef4444']}
          description="Overall driver rating segmentation"
        />

        <ChartCard
          title="Driver License Status Audit"
          type="donut"
          data={data.licenseStatus}
          dataKeys={['value']}
          colors={['#10b981', '#f59e0b', '#ef4444']}
          description="Valid CDL records versus expiring scans"
        />
      </div>
    </div>
  );
}

export default DriverAnalytics;
