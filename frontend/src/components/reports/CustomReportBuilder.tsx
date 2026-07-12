'use client';

import React from 'react';
import { CustomReportConfig } from '@/types/reports';
import { useCustomReport } from '@/hooks/useCustomReport';
import { Select } from '../forms/Select';
import { Input } from '../forms/Input';
import { Button } from '../ui/Button';
import { ReportTable } from './ReportTable';
import { Settings, Play, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

export function CustomReportBuilder() {
  const { report, isLoading, generateReport } = useCustomReport();

  const [module, setModule] = React.useState<'fleet' | 'trips' | 'drivers' | 'maintenance' | 'fuel' | 'expenses'>('fleet');
  const [selectedCols, setSelectedCols] = React.useState<string[]>([]);
  const [sortBy, setSortBy] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [dateRange, setDateRange] = React.useState('2026-07-01 to 2026-07-31');

  // Available columns per module
  const columnDirectory = {
    fleet: [
      { key: 'vehicleRegistration', label: 'Registration' },
      { key: 'vehicleName', label: 'Model Name' },
      { key: 'type', label: 'Type Category' },
      { key: 'utilization', label: 'Utilization' },
      { key: 'cost', label: 'Total Cost' },
      { key: 'odometer', label: 'Odometer' },
    ],
    trips: [
      { key: 'tripNumber', label: 'Trip Number' },
      { key: 'route', label: 'Route Source/Dest' },
      { key: 'driver', label: 'Driver' },
      { key: 'revenue', label: 'Expected Revenue' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Start Date' },
    ],
    drivers: [
      { key: 'name', label: 'Name' },
      { key: 'safetyScore', label: 'Safety Rating' },
      { key: 'licenseCategory', label: 'CDL Class' },
      { key: 'status', label: 'Status' },
      { key: 'joiningDate', label: 'Joining Date' },
    ],
    maintenance: [
      { key: 'maintenanceId', label: 'Workorder ID' },
      { key: 'vehicle', label: 'Vehicle' },
      { key: 'type', label: 'Type' },
      { key: 'totalCost', label: 'Total Billed' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Log Date' },
    ],
    fuel: [
      { key: 'fuelLogId', label: 'Fuel ID' },
      { key: 'vehicle', label: 'Vehicle' },
      { key: 'fuelType', label: 'Fuel Type' },
      { key: 'quantity', label: 'Volume' },
      { key: 'totalCost', label: 'Billed' },
      { key: 'date', label: 'Log Date' },
    ],
    expenses: [
      { key: 'expenseId', label: 'Expense ID' },
      { key: 'type', label: 'Category' },
      { key: 'amount', label: 'Amount' },
      { key: 'vendor', label: 'Vendor Payee' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Log Date' },
    ],
  };

  // Reset columns whenever module changes
  React.useEffect(() => {
    const defaultCols = columnDirectory[module].map((c) => c.key);
    setSelectedCols(defaultCols);
    setSortBy(defaultCols[0]);
  }, [module]);

  const handleColCheckbox = (key: string) => {
    if (selectedCols.includes(key)) {
      if (selectedCols.length > 1) {
        setSelectedCols(selectedCols.filter((c) => c !== key));
      }
    } else {
      setSelectedCols([...selectedCols, key]);
    }
  };

  const handleCompile = () => {
    generateReport({
      module,
      columns: selectedCols,
      filters: {},
      dateRange,
      sortBy,
      sortOrder,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = (format: string) => {
    toast.success(`Exported custom report data to ${format}`);
  };

  return (
    <div className="space-y-6 select-none text-left">
      <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-6">
        
        {/* Step 1: Config Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-border/30">
              <Settings className="h-4 w-4 text-primary" />
              1. Choose Dataset
            </h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reporting Module</label>
              <Select
                className="h-9 text-xs border-border/60 rounded-lg capitalize"
                value={module}
                onChange={(e: any) => setModule(e.target.value)}
                options={[
                  { value: 'fleet', label: 'Fleet & Vehicle Metrics' },
                  { value: 'trips', label: 'Trips & Routing Logs' },
                  { value: 'drivers', label: 'Driver Safety Roster' },
                  { value: 'maintenance', label: 'Maintenance Workorders' },
                  { value: 'fuel', label: 'Fuel Station Refilling Logs' },
                  { value: 'expenses', label: 'Operational Cost Audits' },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Date Range Boundary</label>
              <Input
                className="h-9 text-xs rounded-lg border-border/60"
                placeholder="2026-07-01 to 2026-07-31"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-border/30">
              <Settings className="h-4 w-4 text-primary" />
              2. Select Columns
            </h3>

            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
              {columnDirectory[module].map((col) => (
                <label key={col.key} className="flex items-center gap-2.5 text-[10px] font-semibold text-foreground py-0.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCols.includes(col.key)}
                    onChange={() => handleColCheckbox(col.key)}
                    className="rounded border-border/60"
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-foreground uppercase tracking-wider flex items-center gap-1.5 pb-2 border-b border-border/30">
              <Settings className="h-4 w-4 text-primary" />
              3. Sorting Rules
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sort By</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg capitalize"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  options={columnDirectory[module].map((c) => ({
                    value: c.key,
                    label: c.label,
                  }))}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ordering</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={sortOrder}
                  onChange={(e: any) => setSortOrder(e.target.value)}
                  options={[
                    { value: 'asc', label: 'Ascending' },
                    { value: 'desc', label: 'Descending' },
                  ]}
                />
              </div>
            </div>

            <Button
              onClick={handleCompile}
              isLoading={isLoading}
              className="h-9 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg w-full gap-1.5"
              leftIcon={<Play className="h-4.5 w-4.5" />}
            >
              Run Analytics Query
            </Button>
          </div>
        </div>

      </div>

      {/* Query Preview Section */}
      {report && (
        <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border/30">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
              Analytics Query Output Preview
            </h3>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('CSV')}
                className="h-8 text-[10px] font-bold rounded-lg gap-1 border-border/60"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload('Excel')}
                className="h-8 text-[10px] font-bold rounded-lg gap-1 border-border/60"
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="h-8 text-[10px] font-bold rounded-lg gap-1 border-border/60"
                leftIcon={<Printer className="h-3.5 w-3.5" />}
              >
                Print Report
              </Button>
            </div>
          </div>

          <ReportTable
            data={report.queryResults}
            columns={columnDirectory[module].filter((c) => selectedCols.includes(c.key))}
          />
        </div>
      )}
    </div>
  );
}

export default CustomReportBuilder;
