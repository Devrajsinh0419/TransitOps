'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { DriverPerformance as PerformanceType } from '@/types/driver';
import { formatDistance } from '@/lib/helpers';
import  {ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Star, CheckCircle, Navigation, Fuel, AlertOctagon, TrendingUp } from 'lucide-react';

export interface DriverPerformanceProps {
  performance: PerformanceType;
}

const mockChartData = {
  monthlyTrips: [
    { month: 'Jan', trips: 18 },
    { month: 'Feb', trips: 22 },
    { month: 'Mar', trips: 25 },
    { month: 'Apr', trips: 20 },
    { month: 'May', trips: 28 },
    { month: 'Jun', trips: 31 },
  ],
  safetyTrend: [
    { month: 'Jan', score: 95 },
    { month: 'Feb', score: 96 },
    { month: 'Mar', score: 94 },
    { month: 'Apr', score: 97 },
    { month: 'May', score: 98 },
    { month: 'Jun', score: 98 },
  ],
};

export function DriverPerformance({ performance }: DriverPerformanceProps) {
  const getScoreColor = (score: number) => {
    if (score < 80) return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
    if (score < 90) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
  };

  const statCards = [
    {
      label: 'Safety Score',
      value: `${performance.safetyScore}%`,
      icon: Star,
      color: getScoreColor(performance.safetyScore),
      description: 'Overall driving compliance score',
    },
    {
      label: 'Trips Completed',
      value: performance.tripsCompleted,
      icon: CheckCircle,
      color: 'text-primary bg-primary/10 border-primary/20',
      description: 'Successful route dispatches',
    },
    {
      label: 'Distance Driven',
      value: formatDistance(performance.distanceDriven),
      icon: Navigation,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      description: 'Odometer mileage recorded',
    },
    {
      label: 'Fuel Efficiency',
      value: performance.fuelEfficiency ? `${performance.fuelEfficiency} MPG` : 'N/A',
      icon: Fuel,
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
      description: 'Average fuel consumption',
    },
    {
      label: 'Reported Incidents',
      value: performance.incidentsCount,
      icon: AlertOctagon,
      color: performance.incidentsCount > 0 
        ? 'text-rose-500 bg-rose-500/10 border-rose-500/20' 
        : 'text-zinc-500 bg-muted border-border/50',
      description: 'Safety warnings / accidents',
    },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Stat cards deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Card key={idx} className="p-4 flex flex-col justify-between border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{card.label}</span>
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${card.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <h3 className="text-lg font-extrabold text-foreground tracking-tight">{card.value}</h3>
                <p className="text-[9px] text-muted-foreground font-semibold mt-0.5 leading-none">{card.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recharts Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Monthly Trips */}
        <Card className="p-5 border-border/50">
          <div className="border-b border-border/60 pb-3 mb-4">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              Monthly Trip Distribution
            </h3>
          </div>
          <div className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData.monthlyTrips} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="trips" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={32} name="Trips Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Graph 2: Safety Trend */}
        <Card className="p-5 border-border/50">
          <div className="border-b border-border/60 pb-3 mb-4">
            <h3 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Star className="h-4 w-4 text-emerald-500 fill-current" />
              Safety Score Trend
            </h3>
          </div>
          <div className="h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData.safetyTrend} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="safetyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.3)" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#safetyGrad)" name="Safety Score (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DriverPerformance;
