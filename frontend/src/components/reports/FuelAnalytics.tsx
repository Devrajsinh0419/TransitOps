'use client';

import React from 'react';
import { FuelAnalyticsReport } from '@/types/reports';
import { ChartCard } from './ChartCard';
import { Fuel, TrendingUp, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface FuelAnalyticsProps {
  data: FuelAnalyticsReport;
}

export function FuelAnalytics({ data }: FuelAnalyticsProps) {
  const cards = [
    { info: data.cards.highestFuelCost, icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10' },
    { info: data.cards.averageMileage, icon: TrendingUp, color: 'text-primary bg-primary/10' },
    { info: data.cards.mostEfficientVehicle, icon: Award, color: 'text-emerald-500 bg-emerald-500/10' },
    { info: data.cards.leastEfficientVehicle, icon: Fuel, color: 'text-amber-500 bg-amber-500/10' },
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
          title="Fuel Cost Trend ($)"
          type="area"
          data={data.fuelCostTrend}
          dataKeys={['value']}
          colors={['#3b82f6']}
          description="Total billing for refuels logged monthly"
        />

        <ChartCard
          title="Fuel Consumption (Liters)"
          type="bar"
          data={data.fuelConsumption}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Total gas volume filled monthly"
        />

        <ChartCard
          title="Average Fleet Mileage (mi/L)"
          type="line"
          data={data.mileageTrend}
          dataKeys={['value']}
          colors={['#10b981']}
          description="Mileage trend over date cycles"
        />

        <ChartCard
          title="Fuel Cost By Vehicle ($)"
          type="bar"
          data={data.fuelByVehicle}
          dataKeys={['value']}
          colors={['#ef4444']}
          description="Cumulative gasoline charges per tractor"
        />
      </div>
    </div>
  );
}

export default FuelAnalytics;
