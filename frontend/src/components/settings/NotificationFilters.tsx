'use client';

import React from 'react';
import { NotificationCategory, NotificationStatus } from '@/types/settings';
import { Filter, Bell } from 'lucide-react';

interface NotificationFiltersProps {
  status: NotificationStatus | 'all';
  onStatusChange: (status: NotificationStatus | 'all') => void;
  selectedCategories: NotificationCategory[];
  onToggleCategory: (cat: NotificationCategory) => void;
}

export function NotificationFilters({
  status,
  onStatusChange,
  selectedCategories,
  onToggleCategory,
}: NotificationFiltersProps) {
  const tabs: { label: string; value: NotificationStatus | 'all' }[] = [
    { label: 'Unread Alerts', value: 'unread' },
    { label: 'Read History', value: 'read' },
    { label: 'All Feeds', value: 'all' },
  ];

  const categories: { label: string; value: NotificationCategory }[] = [
    { label: 'Trips Alerts', value: 'trips' },
    { label: 'Maintenance Issues', value: 'maintenance' },
    { label: 'Driver Compliance', value: 'drivers' },
    { label: 'Fuel Logs', value: 'fuel' },
    { label: 'Expenses Outflow', value: 'expenses' },
    { label: 'System Audits', value: 'system' },
  ];

  return (
    <div className="p-5 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4 select-none text-left">
      <div className="flex justify-between items-center pb-2 border-b border-border/20">
        <h4 className="text-xs font-black uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <Filter className="h-4 w-4 text-primary" />
          Filter Notification Feeds
        </h4>
      </div>

      {/* Status tabs */}
      <div className="flex border-b border-border/30 gap-2">
        {tabs.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onStatusChange(tab.value)}
              className={`pb-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'border-b-2 border-primary text-primary font-extrabold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Category Checkboxes */}
      <div className="space-y-2">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">
          Filter by Event Category
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat.value);
            return (
              <label
                key={cat.value}
                className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-muted/30 transition-all"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleCategory(cat.value)}
                  className="rounded border-border/60 text-primary focus:ring-0 cursor-pointer h-3.5 w-3.5"
                />
                <span className="font-semibold text-foreground uppercase text-[10px]">{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotificationFilters;
