'use client';

import React from 'react';
import { SavedReport } from '@/types/reports';
import { Pin, Calendar, Bell, ExternalLink, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

export function SavedReports() {
  const [saved, setSaved] = React.useState<SavedReport[]>([
    { id: '1', name: 'Weekly Operational Cost Breakdown', type: 'Cost Audit', createdAt: '2026-07-11', createdBy: 'System Auto', pinned: true, favorite: true },
    { id: '2', name: 'Driver Safety Incident Log', type: 'Safety', createdAt: '2026-07-09', createdBy: 'Sarah Jenkins', pinned: true, favorite: false },
    { id: '3', name: 'Monthly Refueling Volume Ledger', type: 'Fuel Analytics', createdAt: '2026-07-06', createdBy: 'Sarah Jenkins', pinned: false, favorite: true },
  ]);

  const handleTogglePin = (id: string) => {
    setSaved(saved.map((item) => (item.id === id ? { ...item, pinned: !item.pinned } : item)));
    toast.success('Report pin status updated');
  };

  const handleScheduleToggle = (name: string) => {
    toast.success(`Configured automated cron scheduler for: ${name}`);
  };

  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 select-none text-left">
      <div className="space-y-0.5 pb-2 border-b border-border/30">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
          Pinned & Favorite Invoices
        </h3>
        <p className="text-[10px] text-muted-foreground">Configured reporting hooks and scheduled crons</p>
      </div>

      <div className="space-y-3">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-muted/10 border border-border/40 hover:border-border/80 rounded-xl flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <Star className="h-4 w-4 fill-current" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 hover:underline cursor-pointer">
                  {item.name}
                  {item.pinned && <Pin className="h-3 w-3 text-primary rotate-45" />}
                </h4>
                <p className="text-[9px] text-muted-foreground">
                  Saved Category: <span className="font-semibold text-foreground uppercase">{item.type}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTogglePin(item.id)}
                className={`h-7 w-7 p-0 rounded-lg ${
                  item.pinned ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                title={item.pinned ? 'Unpin' : 'Pin to top'}
              >
                <Pin className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleScheduleToggle(item.name)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground rounded-lg"
                title="Schedule Report"
              >
                <Bell className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedReports;
