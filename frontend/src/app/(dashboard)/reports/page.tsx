'use client';

import React from 'react';
import { useExecutiveKPIs } from '@/hooks/useExecutiveKPIs';
import { ReportFilters as IReportFilters } from '@/types/reports';
import {
  ReportHeader,
  ReportFilters,
  ReportTabs,
  ExecutiveKPICard,
  ChartCard,
  RecentReports,
  SavedReports,
  AnalyticsSkeleton,
} from '@/components/reports';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Truck, Users, ArrowUpRight, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { downloadReport } from '@/lib/export';

export default function ReportsHomePage() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState<IReportFilters>({
    dateRange: '2026-07-01 to 2026-07-31',
    search: '',
  });

  const { kpis, isLoading, error } = useExecutiveKPIs(filters);

  const handleRefresh = () => {
    toast.success('Compiling latest operational reports...');
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    downloadReport('executive', format, filters);
  };

  const handleClearFilters = () => {
    setFilters({ dateRange: '2026-07-01 to 2026-07-31', search: '' });
    toast.info('Query filter bounds reset');
  };

  if (isLoading || !kpis) {
    return <AnalyticsSkeleton />;
  }

  // Define KPI Cards layout grid
  const kpiList = [
    kpis.totalFleet,
    kpis.fleetUtilization,
    kpis.vehicleAvailability,
    kpis.tripsCompleted,
    kpis.tripsActive,
    kpis.driverPerformance,
    kpis.maintenanceCost,
    kpis.fuelCost,
    kpis.operationalCost,
    kpis.revenue,
    kpis.profit,
  ];

  // Top performers mock widgets
  const topVehicles = [
    { registration: 'VAN-102-X', name: 'Ford Transit Van', utilization: '92.4%', safety: '96/100' },
    { registration: 'TRK-491-A', name: 'Volvo FH16 Tractor', utilization: '88.1%', safety: '98/100' },
    { registration: 'TRK-108-B', name: 'Scania R500 Truck', utilization: '76.5%', safety: '94/100' },
  ];

  const topDrivers = [
    { name: 'Marcus Miller', score: 98, trips: 24, status: 'Available' },
    { name: 'Sarah Connor', score: 96, trips: 12, status: 'On Trip' },
    { name: 'David Richardson', score: 94, trips: 18, status: 'Off Duty' },
  ];

  return (
    <div className="space-y-6 select-none text-left">
      {/* Executive Header */}
      <ReportHeader
        title="Executive Summary"
        onRefresh={handleRefresh}
        onToggleFilters={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
        onExport={handleExport}
      />

      {/* Advanced Filters Panel */}
      <ReportFilters
        filters={filters}
        onChange={setFilters}
        onClear={handleClearFilters}
        isOpen={showFilters}
      />

      {/* Tabs navigation */}
      <ReportTabs />

      {/* executive KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {kpiList.map((kpi) => (
          <ExecutiveKPICard key={kpi.title} data={kpi} />
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Revenue vs Operating Expenses ($)"
          type="line"
          data={[
            { name: 'Jan', revenue: 18000, cost: 14200 },
            { name: 'Feb', revenue: 20000, cost: 15100 },
            { name: 'Mar', revenue: 21500, cost: 13900 },
            { name: 'Apr', revenue: 22000, cost: 16200 },
            { name: 'May', revenue: 23500, cost: 15800 },
            { name: 'Jun', revenue: 24800, cost: 16840 },
          ]}
          dataKeys={['revenue', 'cost']}
          colors={['#10b981', '#ef4444']}
          description="Month-on-month comparison of gross trip revenue vs operational costs"
        />

        <ChartCard
          title="Fleet Utilization Trend (%)"
          type="area"
          data={[
            { name: 'Jan', value: 72 },
            { name: 'Feb', value: 75 },
            { name: 'Mar', value: 78 },
            { name: 'Apr', value: 80 },
            { name: 'May', value: 82 },
            { name: 'Jun', value: 84.2 },
          ]}
          dataKeys={['value']}
          colors={['#6366f1']}
          description="Overall active run percentage across vehicle roster"
        />
      </div>

      {/* Top lists & Recent Reports Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Vehicles Widget */}
        <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-primary" />
            Top Active Vehicles
          </h3>
          <div className="space-y-3 text-xs">
            {topVehicles.map((v) => (
              <div key={v.registration} className="flex justify-between items-center py-1 border-b border-border/10 last:border-0">
                <div>
                  <div className="font-extrabold text-foreground">{v.registration}</div>
                  <div className="text-[10px] text-muted-foreground">{v.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-foreground">{v.utilization}</div>
                  <div className="text-[9px] text-muted-foreground">Safety: {v.safety}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Drivers Widget */}
        <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            Top Safety Operators
          </h3>
          <div className="space-y-3 text-xs">
            {topDrivers.map((d) => (
              <div key={d.name} className="flex justify-between items-center py-1 border-b border-border/10 last:border-0">
                <div>
                  <div className="font-extrabold text-foreground">{d.name}</div>
                  <div className="text-[10px] text-muted-foreground">{d.trips} completed runs</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-500">{d.score}/100</div>
                  <div className="text-[9px] text-muted-foreground">{d.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Alerts Widget */}
        <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-rose-500" />
            Maintenance Warnings
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-1">
              <h4 className="font-bold text-rose-500 uppercase text-[10px]">Robert Vance License Suspended</h4>
              <p className="text-[9px] text-muted-foreground">Driver Robert Vance is suspended. Needs license scans verification.</p>
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1">
              <h4 className="font-bold text-amber-500 uppercase text-[10px]">Amanda Sterling Expiry Date</h4>
              <p className="text-[9px] text-muted-foreground">Class A CDL license expiring soon on July 30, 2026.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bookmarks & Recent Analytic runs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentReports />
        <SavedReports />
      </div>
    </div>
  );
}
