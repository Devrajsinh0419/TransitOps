'use client';

import React from 'react';
import { FuelLog } from '@/types/fuel';
import { BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface FuelChartProps {
  logs: FuelLog[];
}

export function FuelChart({ logs }: FuelChartProps) {
  // Take last 7 logs and sort chronologically
  const chartData = [...logs]
    .slice(0, 7)
    .reverse();

  const maxCost = Math.max(...chartData.map((d) => d.totalCost), 1);

  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 select-none text-left">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs font-black text-foreground flex items-center gap-1.5 uppercase tracking-wider">
            <BarChart3 className="h-4 w-4 text-primary" />
            Refuel Costs Trend
          </h3>
          <p className="text-[10px] text-muted-foreground">Historical cost analytics for recent refilling transactions</p>
        </div>
        <div className="flex items-center gap-1 text-emerald-500 font-extrabold text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/15">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Active</span>
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-48 flex items-center justify-center border border-dashed border-border/50 rounded-xl bg-muted/5 text-muted-foreground text-xs font-semibold">
          No fuel log transaction history available
        </div>
      ) : (
        <div className="space-y-4">
          {/* SVG Bars Container */}
          <div className="flex items-end justify-between h-48 pt-6 px-2 border-b border-border/40">
            {chartData.map((d, idx) => {
              const heightPct = (d.totalCost / maxCost) * 100;
              return (
                <div key={d.id} className="flex flex-col items-center flex-1 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-8 bg-foreground text-background text-[9px] font-black py-0.5 px-1.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    ${d.totalCost.toFixed(2)}
                  </div>
                  
                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="w-8 sm:w-10 bg-primary/20 hover:bg-primary border border-primary/25 rounded-t-lg transition-colors cursor-pointer relative"
                  />
                  
                  {/* Label */}
                  <span className="text-[9px] font-bold text-muted-foreground mt-2 truncate w-14 text-center">
                    {d.vehicleRegistration}
                  </span>
                  <span className="text-[8px] text-muted-foreground/60">
                    {d.date.slice(5)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold px-1">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded bg-primary" /> Cost per fill (₹)
            </span>
            <span>Last 7 refuel logs</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FuelChart;
