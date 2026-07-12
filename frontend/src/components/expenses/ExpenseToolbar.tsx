'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Select } from '../forms/Select';
import { Input } from '../forms/Input';
import { Download, RefreshCw, Search, SlidersHorizontal } from 'lucide-react';
import { ExpenseFilters } from '@/types/expense';

interface ExpenseToolbarProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  onRefresh: () => void;
}

export function ExpenseToolbar({ filters, onChange, onRefresh }: ExpenseToolbarProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, search: e.target.value, page: 1 });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, expenseType: e.target.value, page: 1 });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, status: e.target.value, page: 1 });
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const csvContent =
        'data:text/csv;charset=utf-8,Expense ID,Type,Vehicle Registration,Amount,Payment Method,Vendor,Invoice Number,Status,Date\n' +
        'EXP-2026-0001,maintenance,TRK-108-B,1250.00,Fleet Card,Dallas Fleet Hub,INV-MNT-99120,approved,2026-07-12\n' +
        'EXP-2026-0002,fuel,TRK-491-A,186.00,Fleet Card,Shell Highway 10 North,INV-F-99881,approved,2026-07-02';
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `expenses_log_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <div className="space-y-3 select-none">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9 h-9 text-xs rounded-lg border-border/60"
            placeholder="Search expense ID, vendor, category, registration..."
            value={filters.search || ''}
            onChange={handleSearchChange}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`h-9 text-xs font-semibold rounded-lg gap-1.5 border-border/60 ${
              showAdvanced ? 'bg-muted/80 text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
          >
            Filters
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="h-9 border-border/60 text-xs font-semibold text-muted-foreground hover:text-foreground"
            isLoading={isExporting}
            leftIcon={<Download className="h-3.5 w-3.5" />}
          >
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-9 w-9 border-border/60 text-muted-foreground hover:text-foreground p-0 flex items-center justify-center"
            aria-label="Refresh Expenses"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Advanced Filters Drawer */}
      {showAdvanced && (
        <div className="p-4 border border-border/50 bg-card rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expense Type Category</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg capitalize"
              value={filters.expenseType || ''}
              onChange={handleTypeChange}
              options={[
                { value: '', label: 'All Categories' },
                { value: 'fuel', label: 'Fuel Refills' },
                { value: 'maintenance', label: 'Vehicle Maintenance' },
                { value: 'insurance', label: 'Insurance Premiums' },
                { value: 'toll', label: 'Road Toll fees' },
                { value: 'parking', label: 'Vehicle Parking' },
                { value: 'repairs', label: 'Emergency Repairs' },
                { value: 'registration', label: 'State Registrations' },
                { value: 'miscellaneous', label: 'Miscellaneous Costs' },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Audit Status</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.status || ''}
              onChange={handleStatusChange}
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'pending', label: 'Pending Audit' },
                { value: 'approved', label: 'Approved & Cleared' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>

          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange({ search: '', vehicleId: '', expenseType: '', status: '', page: 1, limit: 10 })}
              className="h-9 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/5 rounded-lg w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseToolbar;
