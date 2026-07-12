'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { FormField } from '../forms/FormField';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { Filter, RotateCcw } from 'lucide-react';
import { VehicleFilters as FiltersType } from '@/types/vehicle';

export interface VehicleFiltersProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function VehicleFilters({ filters, onChange, isOpen, onClose }: VehicleFiltersProps) {
  if (!isOpen) return null;

  const handleSelectChange = (key: keyof FiltersType, val: string) => {
    onChange({
      ...filters,
      [key]: val,
      page: 1, // reset page
    });
  };

  const handleReset = () => {
    onChange({
      ...filters,
      type: '',
      status: '',
      capacity: '',
      purchaseDateStart: '',
      purchaseDateEnd: '',
      page: 1,
    });
  };

  return (
    <Card className="p-4 border border-border bg-card/65 text-left space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <Filter className="h-3.5 w-3.5 text-primary" />
          <span>Advanced Registry Filter</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[10px] font-extrabold text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Clear Filter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* 1. Vehicle Type */}
        <FormField label="Vehicle Type" className="text-xs">
          <Select
            value={filters.type}
            onChange={(e) => handleSelectChange('type', e.target.value)}
            options={[
              { value: 'heavy_truck', label: 'Heavy Trucks' },
              { value: 'delivery_van', label: 'Delivery Vans' },
              { value: 'trailer', label: 'Trailers' },
              { value: 'refrigerated', label: 'Refrigerated' },
              { value: 'sedan', label: 'Sedans' },
              { value: 'suv', label: 'SUVs' },
            ]}
            placeholder="All Types"
          />
        </FormField>

        {/* 2. Status */}
        <FormField label="Status" className="text-xs">
          <Select
            value={filters.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
            options={[
              { value: 'available', label: 'Available' },
              { value: 'on_trip', label: 'On Trip' },
              { value: 'maintenance', label: 'In Maintenance' },
              { value: 'retired', label: 'Retired' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'disposed', label: 'Disposed' },
            ]}
            placeholder="All Statuses"
          />
        </FormField>

        {/* 3. Capacity threshold */}
        <FormField label="Min Capacity (kg)" className="text-xs">
          <Select
            value={filters.capacity}
            onChange={(e) => handleSelectChange('capacity', e.target.value)}
            options={[
              { value: '5000', label: '>= 5,000 kg' },
              { value: '10000', label: '>= 10,000 kg' },
              { value: '20000', label: '>= 20,000 kg' },
              { value: '50000', label: '>= 50,000 kg' },
            ]}
            placeholder="No Limit"
          />
        </FormField>

        {/* 4. Purchase Date Range */}
        <FormField label="Purchase Year Threshold" className="text-xs">
          <Select
            value={filters.purchaseDateStart || ''}
            onChange={(e) => handleSelectChange('purchaseDateStart', e.target.value)}
            options={[
              { value: '2024-01-01', label: 'Bought in 2024+' },
              { value: '2023-01-01', label: 'Bought in 2023+' },
              { value: '2022-01-01', label: 'Bought in 2022+' },
              { value: '2020-01-01', label: 'Bought in 2020+' },
            ]}
            placeholder="No Time Limit"
          />
        </FormField>
      </div>
    </Card>
  );
}

export default VehicleFilters;
