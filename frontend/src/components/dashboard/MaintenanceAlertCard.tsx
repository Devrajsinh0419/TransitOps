'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Badge } from '../badges/Badge';
import { AlertTriangle, Wrench, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MaintenanceAlert {
  id: string;
  vehicle: string;
  issue: string;
  priority: 'high' | 'medium' | 'low';
  status: string;
  daysRemaining: number;
}

export interface MaintenanceAlertCardProps {
  alerts?: MaintenanceAlert[];
  isLoading?: boolean;
}

const mockAlerts: MaintenanceAlert[] = [
  {
    id: 'm-1',
    vehicle: 'Volvo FH16 (TRK-491)',
    issue: 'Scheduled Brake Inspection',
    priority: 'high',
    status: 'Overdue',
    daysRemaining: -2,
  },
  {
    id: 'm-2',
    vehicle: 'Scania R500 (TRK-108)',
    issue: 'Engine Oil Change',
    priority: 'medium',
    status: 'Pending scheduled',
    daysRemaining: 4,
  },
  {
    id: 'm-3',
    vehicle: 'Mercedes Actros (TRK-552)',
    issue: 'Tire Rotation',
    priority: 'low',
    status: 'Upcoming',
    daysRemaining: 15,
  },
];

export function MaintenanceAlertCard({
  alerts = mockAlerts,
  isLoading = false,
}: MaintenanceAlertCardProps) {
  if (isLoading) {
    return (
      <Card className="p-5 select-none space-y-4 animate-pulse">
        <div className="h-4 w-28 bg-muted rounded"></div>
        <div className="space-y-2.5">
          <div className="h-12 bg-muted rounded-lg"></div>
          <div className="h-12 bg-muted rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 select-none space-y-4">
      <div className="border-b border-border/60 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">Maintenance Alerts</h3>
          <p className="text-[10px] text-muted-foreground">Vehicles requiring immediate shop scheduling</p>
        </div>
        <Wrench className="h-4.5 w-4.5 text-amber-500" />
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const isOverdue = alert.daysRemaining <= 0;
          return (
            <div
              key={alert.id}
              className="p-3 border border-border/80 bg-muted/15 rounded-xl flex items-start gap-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className={cn(
                'flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg border',
                alert.priority === 'high'
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                  : alert.priority === 'medium'
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                  : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
              )}>
                {alert.priority === 'high' ? <ShieldAlert className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-xs font-bold text-foreground truncate">{alert.vehicle}</h4>
                  <Badge
                    variant={
                      alert.priority === 'high'
                        ? 'danger'
                        : alert.priority === 'medium'
                        ? 'warning'
                        : 'info'
                    }
                    className="text-[9px] px-1.5 py-0"
                  >
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed truncate">
                  {alert.issue}
                </p>
                <div className="flex justify-between items-center pt-0.5 text-[9px] font-bold">
                  <span className={isOverdue ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'}>
                    {isOverdue
                      ? `Overdue by ${Math.abs(alert.daysRemaining)} days`
                      : `Due in ${alert.daysRemaining} days`}
                  </span>
                  <span className="text-muted-foreground/60">{alert.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default MaintenanceAlertCard;
