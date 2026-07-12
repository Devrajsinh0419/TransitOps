'use client';

import React from 'react';
import { TripAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { Compass, DollarSign, Calendar, MapPin, Activity, Watch } from 'lucide-react';
import { motion } from 'framer-motion';

interface TripAnalyticsProps {
  data: TripAnalyticsReport;
}

export function TripAnalytics({ data }: TripAnalyticsProps) {
  const cards = [
    { info: data.cards.longestTrip, icon: MapPin, color: 'text-primary bg-primary/10' },
    { info: data.cards.highestRevenueTrip, icon: DollarSign, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.completedTrips, icon: Activity, color: 'text-indigo-500 bg-indigo-500/10' },
    { info: data.cards.cancelledTrips, icon: Calendar, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.averageDuration, icon: Watch, color: 'text-amber-500 bg-amber-500/10' },
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
          title="Revenue Trend ($)"
          type="area"
          data={data.revenueTrend}
          dataKeys={['value']}
          colors={['#10b981']}
          description="Cumulative gross dispatch revenue per month"
        />

        <ChartCard
          title="Trips Per Month"
          type="line"
          data={data.tripsPerMonth}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Monthly dispatch trip volumes"
        />

        <ChartCard
          title="Trips by Route (Top 5)"
          type="horizontal-bar"
          data={data.tripsByRoute}
          dataKeys={['value']}
          colors={['#3b82f6']}
          description="Volume frequency mapped to road routes"
        />

        <ChartCard
          title="Distance Covered Trend (Miles)"
          type="bar"
          data={data.distanceCovered}
          dataKeys={['value']}
          colors={['#f59e0b']}
          description="Total miles driven across fleet roster"
        />
      </div>
    </div>
  );
}

export default TripAnalytics;
