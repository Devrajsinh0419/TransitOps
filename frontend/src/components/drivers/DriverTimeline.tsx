'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { DriverActivity } from '@/types/driver';
import { FilePlus, Truck, CheckSquare, Edit3, UserCheck, HelpCircle } from 'lucide-react';

export interface DriverTimelineProps {
  activities: DriverActivity[];
}

const activityIcons: Record<string, { icon: React.ComponentType<any>; color: string }> = {
  registered: { icon: FilePlus, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  trip_assigned: { icon: Truck, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  trip_completed: { icon: CheckSquare, color: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/25' },
  license_updated: { icon: UserCheck, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  profile_edited: { icon: Edit3, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
};

export function DriverTimeline({ activities }: DriverTimelineProps) {
  return (
    <Card className="p-6 border-border/50 select-none text-left">
      <div className="border-b border-border/60 pb-3 mb-5">
        <h3 className="text-sm font-bold text-foreground">Driver Log & Activity Audit</h3>
        <p className="text-[10px] text-muted-foreground">Historical records of route dispatches and profile edits</p>
      </div>

      <div className="relative border-l border-border pl-6 space-y-6 ml-3">
        {activities.map((act) => {
          const config = activityIcons[act.type] || { icon: HelpCircle, color: 'bg-muted text-muted-foreground' };
          const Icon = config.icon;

          return (
            <div key={act.id} className="relative group">
              {/* Timeline marker */}
              <span className={`absolute -left-[35px] top-0.5 flex h-7 w-7 items-center justify-center rounded-full border bg-background shadow-sm ${config.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>

              {/* Event details */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {act.description}
                  </h4>
                  <span className="text-[10px] text-muted-foreground font-mono">{act.date}</span>
                </div>
                <p className="text-[10px] text-muted-foreground/80 font-semibold">
                  Triggered by: <span className="text-foreground">{act.user}</span>
                </p>
              </div>
            </div>
          );
        })}

        {activities.length === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-muted-foreground">No recent activities logged.</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default DriverTimeline;
