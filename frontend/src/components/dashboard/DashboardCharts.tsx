'use client';

import React from 'react';
import { VehiclePieChart } from './VehiclePieChart';
import { TripsBarChart } from './TripsBarChart';
import { FuelLineChart } from './FuelLineChart';
import { UtilizationChart } from './UtilizationChart';
import { ChartData } from '@/types/dashboard';

export interface DashboardChartsProps {
  chartData: ChartData | null;
  isLoading?: boolean;
}

export function DashboardCharts({ chartData, isLoading = false }: DashboardChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 1. Vehicle status Pie chart */}
      <VehiclePieChart
        data={chartData?.vehicleStatus}
        isLoading={isLoading}
      />

      {/* 2. Monthly Trips Bar chart */}
      <TripsBarChart
        data={chartData?.monthlyTrips}
        isLoading={isLoading}
      />

      {/* 3. Fuel Spend Trend Line chart */}
      <FuelLineChart
        data={chartData?.fuelCostTrend}
        isLoading={isLoading}
      />

      {/* 4. Active Fleet Utilization Area chart */}
      <UtilizationChart
        data={chartData?.fleetUtilization}
        isLoading={isLoading}
      />
    </div>
  );
}

export default DashboardCharts;
