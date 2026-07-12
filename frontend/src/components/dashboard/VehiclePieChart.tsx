'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Card } from '../cards/Card';
import { ChartWrapper } from '../charts/ChartWrapper';

export interface VehiclePieChartProps {
  data?: { name: string; value: number; color: string }[];
  isLoading?: boolean;
}

const defaultData = [
  { name: 'Available', value: 88, color: '#10b981' },
  { name: 'On Trip', value: 42, color: '#3b82f6' },
  { name: 'In Shop', value: 12, color: '#f59e0b' },
  { name: 'Out of Order', value: 4, color: '#ef4444' },
];

export function VehiclePieChart({ data = defaultData, isLoading = false }: VehiclePieChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) {
    return (
      <Card className="h-72 p-5 flex flex-col justify-between animate-pulse select-none">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="h-40 w-40 rounded-full bg-muted mx-auto"></div>
        <div className="h-4 w-44 bg-muted rounded mx-auto"></div>
      </Card>
    );
  }

  return (
    <Card className="p-5 select-none h-72 flex flex-col justify-between">
      <div className="border-b border-border/60 pb-2">
        <h3 className="text-sm font-bold text-foreground">Vehicle Status</h3>
        <p className="text-[10px] text-muted-foreground">Proportion of vehicle fleet statuses</p>
      </div>

      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={65}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
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
              wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default VehiclePieChart;
