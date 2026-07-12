'use client';

import React from 'react';
import { Truck, CheckCircle2, Navigation, Wrench, Users, UserCheck, Activity, Gauge } from 'lucide-react';
import { StatCard } from './StatCard';
import { DashboardStats as StatsType } from '@/types/dashboard';

export interface DashboardStatsProps {
  stats: StatsType | null;
  isLoading?: boolean;
}

export function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  // Fallback defaults if stats are not provided
  const data = stats || {
    totalVehicles: 0,
    availableVehicles: 0,
    vehiclesOnTrip: 0,
    vehiclesInMaintenance: 0,
    totalDrivers: 0,
    driversOnDuty: 0,
    activeTrips: 0,
    fleetUtilization: 0,
  };

  const cardsList = [
    {
      title: 'Total Vehicles',
      value: data.totalVehicles,
      icon: Truck,
      trend: 4,
      trendDirection: 'up' as const,
      sparkline: [136, 138, 140, 139, 142, 141, 142],
    },
    {
      title: 'Available Vehicles',
      value: data.availableVehicles,
      icon: CheckCircle2,
      trend: 2,
      trendDirection: 'up' as const,
      sparkline: [80, 84, 86, 85, 87, 86, 88],
    },
    {
      title: 'Vehicles On Trip',
      value: data.vehiclesOnTrip,
      icon: Navigation,
      trend: 8,
      trendDirection: 'up' as const,
      sparkline: [35, 38, 40, 42, 38, 41, 42],
    },
    {
      title: 'In Maintenance',
      value: data.vehiclesInMaintenance,
      icon: Wrench,
      trend: 10,
      trendDirection: 'down' as const,
      sparkline: [15, 14, 13, 14, 12, 13, 12],
    },
    {
      title: 'Total Drivers',
      value: data.totalDrivers,
      icon: Users,
      trend: 1,
      trendDirection: 'up' as const,
      sparkline: [154, 154, 155, 155, 156, 156, 156],
    },
    {
      title: 'Drivers On Duty',
      value: data.driversOnDuty,
      icon: UserCheck,
      trend: 3,
      trendDirection: 'up' as const,
      sparkline: [88, 90, 92, 91, 93, 92, 94],
    },
    {
      title: 'Active Trips',
      value: data.activeTrips,
      icon: Activity,
      trend: 5,
      trendDirection: 'up' as const,
      sparkline: [30, 32, 35, 34, 38, 36, 38],
    },
    {
      title: 'Fleet Utilization',
      value: `${data.fleetUtilization}%`,
      icon: Gauge,
      trend: 1.5,
      trendDirection: 'up' as const,
      sparkline: [80.5, 81, 82, 81.5, 83, 82.2, 82.5],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cardsList.map((card, idx) => (
        <StatCard
          key={idx}
          title={card.title}
          value={card.value}
          icon={card.icon}
          trend={card.trend}
          trendDirection={card.trendDirection}
          sparklineData={card.sparkline}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default DashboardStats;
