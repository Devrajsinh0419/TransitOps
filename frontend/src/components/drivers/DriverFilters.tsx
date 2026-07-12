'use client';

import React from 'react';
import { Select } from '../forms/Select';
import { Button } from '../ui/Button';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { DriverFilters as FilterType } from '@/types/driver';

export interface DriverFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

export function DriverFilters({ filters, onChange }: DriverFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelectChange = (key: keyof FilterType, value: string) => {
    onChange({
      ...filters,
      [key]: value === 'all' ? '' : value,
      page: 1,
    });
  };

  const handleReset = () => {
    onChange({
      search: '',
      status: '',
      licenseCategory: '',
      availability: '',
      minSafetyScore: '',
      department: '',
      licenseExpiryRange: '',
      sortBy: 'newest',
      sortOrder: 'desc',
      page: 1,
      limit: 10,
    });
  };

  const hasActiveFilters =
    filters.status ||
    filters.licenseCategory ||
    filters.minSafetyScore ||
    filters.department ||
    filters.licenseExpiryRange ||
    filters.search;

  return (
    <div className="space-y-3 select-none">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`h-9 gap-2 border-border/60 rounded-lg text-xs font-semibold ${
            isOpen ? 'bg-muted text-foreground' : 'text-muted-foreground'
          }`}
          leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
        >
          Filters
          {hasActiveFilters ? (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {Object.values(filters).filter(v => v !== '' && v !== 'newest' && v !== 'desc' && typeof v === 'string').length}
            </span>
          ) : null}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 gap-1 text-xs text-muted-foreground hover:text-foreground font-semibold"
            leftIcon={<RotateCcw className="h-3 w-3" />}
          >
            Reset
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="p-4 border border-border/50 bg-card rounded-xl shadow-inner grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
          {/* Status filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Driver Status</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.status || 'all'}
              onChange={(e) => handleSelectChange('status', e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'available', label: 'Available' },
                { value: 'on_trip', label: 'On Trip' },
                { value: 'off_duty', label: 'Off Duty' },
                { value: 'suspended', label: 'Suspended' },
                { value: 'leave', label: 'On Leave' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>

          {/* License Category filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">License Type</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.licenseCategory || 'all'}
              onChange={(e) => handleSelectChange('licenseCategory', e.target.value)}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'Class A CDL', label: 'Class A CDL' },
                { value: 'Class B CDL', label: 'Class B CDL' },
                { value: 'Class C CDL', label: 'Class C CDL' },
                { value: 'Class D', label: 'Class D' },
                { value: 'Class M', label: 'Class M' },
              ]}
            />
          </div>

          {/* Department Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Department</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.department || 'all'}
              onChange={(e) => handleSelectChange('department', e.target.value)}
              options={[
                { value: 'all', label: 'All Departments' },
                { value: 'Heavy Logistics', label: 'Heavy Logistics' },
                { value: 'Last Mile Delivery', label: 'Last Mile Delivery' },
                { value: 'Refrigerated Transport', label: 'Refrigerated Transport' },
                { value: 'Hazardous Materials', label: 'Hazardous Materials' },
                { value: 'Support & Shuttle', label: 'Support & Shuttle' },
              ]}
            />
          </div>

          {/* Safety Score Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Min Safety Score</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.minSafetyScore || 'all'}
              onChange={(e) => handleSelectChange('minSafetyScore', e.target.value)}
              options={[
                { value: 'all', label: 'Any Score' },
                { value: '95', label: '95+ Excellent' },
                { value: '90', label: '90+ Good' },
                { value: '80', label: '80+ Satisfactory' },
                { value: '0', label: 'Show All' },
              ]}
            />
          </div>

          {/* License Expiry Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Compliance Alert</label>
            <Select
              className="h-9 text-xs border-border/60 rounded-lg"
              value={filters.licenseExpiryRange || 'all'}
              onChange={(e) => handleSelectChange('licenseExpiryRange', e.target.value)}
              options={[
                { value: 'all', label: 'All License States' },
                { value: 'valid', label: 'Valid Compliance' },
                { value: 'expiring_soon', label: 'Expiring Soon (60d)' },
                { value: 'expired', label: 'Expired License' },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DriverFilters;
