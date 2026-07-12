'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { ActivityItem } from './ActivityItem';
import { Activity } from '@/types/dashboard';

export interface RecentActivityProps {
  activities: Activity[];
  isLoading?: boolean;
}

export function RecentActivity({ activities, isLoading = false }: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card className="p-5 select-none space-y-4 animate-pulse">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="space-y-3">
          <div className="h-10 bg-muted rounded-lg"></div>
          <div className="h-10 bg-muted rounded-lg"></div>
          <div className="h-10 bg-muted rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 select-none space-y-4">
      <div className="border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
        <p className="text-[10px] text-muted-foreground">Live log of dispatch and maintenance events</p>
      </div>

      {activities.length === 0 ? (
        <div className="py-8 text-center text-xs text-muted-foreground/60 font-semibold">
          No activities recorded today.
        </div>
      ) : (
        <div className="pt-2 flex flex-col">
          {activities.map((act, idx) => (
            <ActivityItem
              key={act.id}
              activity={act}
              isLast={idx === activities.length - 1}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default RecentActivity;
