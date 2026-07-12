'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Search, Plus, Filter, RotateCcw } from 'lucide-react';

interface UserToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  roleFilter: string;
  onRoleFilterChange: (val: string) => void;
  deptFilter: string;
  onDeptFilterChange: (val: string) => void;
  onAddClick: () => void;
}

export function UserToolbar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  deptFilter,
  onDeptFilterChange,
  onAddClick,
}: UserToolbarProps) {
  const handleClear = () => {
    onSearchChange('');
    onRoleFilterChange('');
    onDeptFilterChange('');
  };

  return (
    <div className="p-4 border border-border/50 bg-card rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 select-none text-left">
      <div className="flex-1 flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search operators..."
            className="h-10 w-full rounded-lg border border-border/60 bg-muted/10 pl-9 pr-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
        </div>

        {/* Role Filter */}
        <select
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
          className="h-10 w-full sm:w-40 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none cursor-pointer"
        >
          <option value="">All Access Roles</option>
          <option value="admin">Administrator</option>
          <option value="fleet_manager">Fleet Manager</option>
          <option value="safety_officer">Safety Officer</option>
          <option value="viewer">Viewer</option>
        </select>

        {/* Dept Filter */}
        <select
          value={deptFilter}
          onChange={(e) => onDeptFilterChange(e.target.value)}
          className="h-10 w-full sm:w-40 rounded-lg border border-border/60 bg-muted/10 px-3 text-xs font-semibold text-foreground focus:border-primary focus:outline-none cursor-pointer"
        >
          <option value="">All Departments</option>
          <option value="Operations">Operations</option>
          <option value="Logistics">Logistics</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Safety Compliance">Safety Compliance</option>
        </select>

        {/* Clear Filters */}
        {(search || roleFilter || deptFilter) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 text-[10px] font-bold rounded-lg text-rose-500 hover:bg-rose-500/5 px-2"
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <Button
        onClick={onAddClick}
        className="h-10 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg gap-1.5 px-4 shrink-0 shadow-sm"
        leftIcon={<Plus className="h-4 w-4" />}
      >
        Add Operator
      </Button>
    </div>
  );
}

export default UserToolbar;
