'use client';

import React, { useState } from 'react';
import { Card } from '../cards/Card';
import { FormField } from '../forms/FormField';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

export interface DashboardFiltersProps {
  onApplyFilters?: (filters: any) => void;
  onResetFilters?: () => void;
}

export function DashboardFilters({ onApplyFilters, onResetFilters }: DashboardFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');

  const handleApply = () => {
    onApplyFilters?.({ region, vehicleType, status, department });
  };

  const handleReset = () => {
    setRegion('');
    setVehicleType('');
    setStatus('');
    setDepartment('');
    onResetFilters?.();
  };

  return (
    <Card className="select-none overflow-hidden">
      {/* Trigger bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 bg-muted/10 flex items-center justify-between cursor-pointer hover:bg-muted/20 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <span>Advanced Filter Panel</span>
        </div>
        <div className="text-muted-foreground">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>

      {/* Filter Options */}
      {isOpen && (
        <div className="p-4 border-t border-border/50 bg-card space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Region Selector */}
            <FormField label="Region" className="text-xs">
              <Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                options={[
                  { value: 'northeast', label: 'Northeast USA' },
                  { value: 'midwest', label: 'Midwest USA' },
                  { value: 'south', label: 'Southern Region' },
                  { value: 'west', label: 'West Coast' },
                ]}
                placeholder="All Regions"
              />
            </FormField>

            {/* 2. Vehicle Type Selector */}
            <FormField label="Vehicle Type" className="text-xs">
              <Select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                options={[
                  { value: 'heavy_truck', label: 'Heavy Duty Trucks' },
                  { value: 'delivery_van', label: 'Delivery Vans' },
                  { value: 'trailer', label: 'Trailers' },
                  { value: 'refrigerated', label: 'Refrigerated Cargo' },
                ]}
                placeholder="All Vehicle Types"
              />
            </FormField>

            {/* 3. Status Selector */}
            <FormField label="Status" className="text-xs">
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: 'available', label: 'Available' },
                  { value: 'on_trip', label: 'On Trip' },
                  { value: 'maintenance', label: 'In Maintenance' },
                  { value: 'out_of_order', label: 'Out of Order' },
                ]}
                placeholder="All Statuses"
              />
            </FormField>

            {/* 4. Department Selector */}
            <FormField label="Department" className="text-xs">
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={[
                  { value: 'logistics', label: 'Logistics Dispatch' },
                  { value: 'maintenance', label: 'Fleet Maintenance' },
                  { value: 'operations', label: 'Operations Admin' },
                  { value: 'finance', label: 'Finance & Fuel' },
                ]}
                placeholder="All Departments"
              />
            </FormField>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2.5 pt-2 border-t border-border/40">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              leftIcon={<RotateCcw className="h-3 w-3" />}
              className="cursor-pointer font-bold text-xs"
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="cursor-pointer font-bold text-xs"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default DashboardFilters;
