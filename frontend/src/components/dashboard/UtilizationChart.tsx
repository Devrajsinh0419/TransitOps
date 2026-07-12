'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from '../cards/Card';

export interface UtilizationChartProps {
  data?: { time: string; percentage: number }[];
  isLoading?: boolean;
}

const defaultData = [
  { time: '08:00', percentage: 65 },
  { time: '10:00', percentage: 74 },
  { time: '12:00', percentage: 82 },
  { time: '14:00', percentage: 85 },
  { time: '16:00', percentage: 78 },
  { time: '18:00', percentage: 72 },
  { time: '20:00', percentage: 60 },
];

export function UtilizationChart({ data = defaultData, isLoading = false }: UtilizationChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return (
      <Card className="h-72 p-5 flex flex-col justify-between animate-pulse select-none">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="h-40 bg-muted/30 rounded-lg w-full"></div>
      </Card>
    );
  }

  return (
    <Card className="p-5 select-none h-72 flex flex-col justify-between">
      <div className="border-b border-border/60 pb-2">
        <h3 className="text-sm font-bold text-foreground">Active Utilization</h3>
        <p className="text-[10px] text-muted-foreground">Hourly dispatch utilization index (%)</p>
      </div>

      <div className="flex-1 min-h-0 pt-3 relative">
        <ResponsiveContainer width="100%" height="95%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border, #e5e7eb)" opacity={0.3} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px', fill: 'var(--color-muted-foreground, #6b7280)' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px', fill: 'var(--color-muted-foreground, #6b7280)' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card, #1c1917)',
                borderColor: 'var(--color-border, #292524)',
                borderRadius: '8px',
                fontSize: '11px',
                color: '#fff',
              }}
            />
            <Legend
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: '10px', paddingTop: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="percentage"
              name="Utilization (%)"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUtil)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default UtilizationChart;
