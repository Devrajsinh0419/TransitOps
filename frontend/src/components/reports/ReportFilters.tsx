'use client';

import React from 'react';
import { ReportFilters as IReportFilters } from '@/types/reports';
import { Select } from '../forms/Select';
import { Input } from '../forms/Input';
import { Button } from '../ui/Button';
import { X, Check } from 'lucide-react';
import { activeVehicles } from '@/hooks/useVehicles';
import { activeDrivers } from '@/hooks/useDrivers';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportFiltersProps {
  filters: IReportFilters;
  onChange: (filters: IReportFilters) => void;
  onClear: () => void;
  isOpen: boolean;
}

export function ReportFilters({ filters, onChange, onClear, isOpen }: ReportFiltersProps) {
  const [localFilters, setLocalFilters] = React.useState<IReportFilters>({ ...filters });

  React.useEffect(() => {
    setLocalFilters({ ...filters });
  }, [filters]);

  const handleApply = () => {
    onChange(localFilters);
  };

  const handleFieldChange = (key: keyof IReportFilters, value: any) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getActiveChipsCount = () => {
    return Object.values(filters).filter((val) => val !== undefined && val !== '').length;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden w-full select-none text-left"
        >
          <div className="p-5 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4 my-2">
            <div className="flex items-center justify-between pb-2 border-b border-border/30">
              <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
                Advanced Query Filter hold
              </h3>
              {getActiveChipsCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClear}
                  className="h-7 text-[10px] px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/5 rounded-md font-extrabold"
                  leftIcon={<X className="h-3 w-3" />}
                >
                  Clear All ({getActiveChipsCount()})
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {/* Search query */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">General Keyword</label>
                <Input
                  className="h-9 text-xs rounded-lg border-border/60"
                  placeholder="Query names, descriptions..."
                  value={localFilters.search || ''}
                  onChange={(e) => handleFieldChange('search', e.target.value)}
                />
              </div>

              {/* Vehicle select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Vehicle</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.vehicleId || ''}
                  onChange={(e) => handleFieldChange('vehicleId', e.target.value)}
                  options={[
                    { value: '', label: 'All Fleet Vehicles' },
                    ...activeVehicles.map((v) => ({
                      value: v.id,
                      label: `${v.registrationNumber} - ${v.name}`,
                    })),
                  ]}
                />
              </div>

              {/* Driver select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned Driver</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.driverId || ''}
                  onChange={(e) => handleFieldChange('driverId', e.target.value)}
                  options={[
                    { value: '', label: 'All Fleet Drivers' },
                    ...activeDrivers.map((d) => ({
                      value: d.id,
                      label: d.name,
                    })),
                  ]}
                />
              </div>

              {/* Vehicle classification */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Vehicle Type</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.vehicleType || ''}
                  onChange={(e) => handleFieldChange('vehicleType', e.target.value)}
                  options={[
                    { value: '', label: 'All Classes' },
                    { value: 'heavy', label: 'Heavy Haulage Trucks' },
                    { value: 'van', label: 'Delivery Vans' },
                    { value: 'shuttle', label: 'Support & Shuttles' },
                  ]}
                />
              </div>

              {/* Trip status */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Trip Status</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.tripStatus || ''}
                  onChange={(e) => handleFieldChange('tripStatus', e.target.value)}
                  options={[
                    { value: '', label: 'All States' },
                    { value: 'draft', label: 'Draft' },
                    { value: 'dispatch', label: 'Dispatched' },
                    { value: 'in_progress', label: 'In Transit' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                />
              </div>

              {/* Maintenance status */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Maintenance State</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.maintenanceStatus || ''}
                  onChange={(e) => handleFieldChange('maintenanceStatus', e.target.value)}
                  options={[
                    { value: '', label: 'All States' },
                    { value: 'pending', label: 'Pending Review' },
                    { value: 'approved', label: 'Approved Order' },
                    { value: 'in_progress', label: 'In Shop (Service)' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                />
              </div>

              {/* Fuel Type select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fuel Classification</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.fuelType || ''}
                  onChange={(e) => handleFieldChange('fuelType', e.target.value)}
                  options={[
                    { value: '', label: 'All Fuel Types' },
                    { value: 'Diesel Premium', label: 'Diesel Premium' },
                    { value: 'Regular Unleaded', label: 'Regular Unleaded' },
                  ]}
                />
              </div>

              {/* Expense Type select */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expense Type</label>
                <Select
                  className="h-9 text-xs border-border/60 rounded-lg"
                  value={localFilters.expenseType || ''}
                  onChange={(e) => handleFieldChange('expenseType', e.target.value)}
                  options={[
                    { value: '', label: 'All Expense Types' },
                    { value: 'fuel', label: 'Fuel Refills' },
                    { value: 'maintenance', label: 'Vehicle Maintenance' },
                    { value: 'insurance', label: 'Insurance' },
                    { value: 'toll', label: 'Tolls' },
                  ]}
                />
              </div>

            </div>

            {/* Filter chips overview */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/20">
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                {Object.entries(filters).map(([key, val]) => {
                  if (val === undefined || val === '') return null;
                  return (
                    <span key={key} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-muted text-foreground border border-border/40 rounded-full">
                      <span className="opacity-60">{key}:</span> {val}
                    </span>
                  );
                })}
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={handleApply}
                className="h-9 text-xs font-extrabold rounded-lg gap-1 px-4 self-end ml-auto"
                leftIcon={<Check className="h-4 w-4" />}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReportFilters;
