'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card } from '../cards/Card';

export interface TripsBarChartProps {
  data?: { month: string; trips: number; completed: number }[];
  isLoading?: boolean;
}

const defaultData = [
  { month: 'Jan', trips: 140, completed: 135 },
  { month: 'Feb', trips: 165, completed: 158 },
  { month: 'Mar', trips: 180, completed: 172 },
  { month: 'Apr', trips: 175, completed: 170 },
  { month: 'May', trips: 210, completed: 202 },
  { month: 'Jun', trips: 235, completed: 224 },
];

export function TripsBarChart({ data = defaultData, isLoading = false }: TripsBarChartProps) {
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
        <h3 className="text-sm font-bold text-foreground">Monthly Dispatch Trips</h3>
        <p className="text-[10px] text-muted-foreground">Trips dispatched vs successfully completed</p>
      </div>

      <div className="flex-1 min-h-0 pt-3 relative">
        <ResponsiveContainer width="100%" height="95%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border, #e5e7eb)" opacity={0.3} />
            <XAxis
              dataKey="month"
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
            <Bar dataKey="trips" name="Dispatched" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default TripsBarChart;
