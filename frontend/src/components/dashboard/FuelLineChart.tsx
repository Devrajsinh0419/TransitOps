'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from '../cards/Card';

export interface FuelLineChartProps {
  data?: { date: string; cost: number; consumption: number }[];
  isLoading?: boolean;
}

const defaultData = [
  { date: 'Jul 06', cost: 1200, consumption: 380 },
  { date: 'Jul 07', cost: 1450, consumption: 450 },
  { date: 'Jul 08', cost: 950, consumption: 310 },
  { date: 'Jul 09', cost: 1600, consumption: 510 },
  { date: 'Jul 10', cost: 1100, consumption: 360 },
  { date: 'Jul 11', cost: 1300, consumption: 410 },
  { date: 'Jul 12', cost: 1250, consumption: 395 },
];

export function FuelLineChart({ data = defaultData, isLoading = false }: FuelLineChartProps) {
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
        <h3 className="text-sm font-bold text-foreground">Fuel Spend Trend</h3>
        <p className="text-[10px] text-muted-foreground">Daily fuel costs (₹) vs consumption (L)</p>
      </div>

      <div className="flex-1 min-h-0 pt-3 relative">
        <ResponsiveContainer width="100%" height="95%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border, #e5e7eb)" opacity={0.3} />
            <XAxis
              dataKey="date"
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
            <Line
              type="monotone"
              dataKey="cost"
              name="Spend (₹)"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="consumption"
              name="Volume (L)"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default FuelLineChart;
