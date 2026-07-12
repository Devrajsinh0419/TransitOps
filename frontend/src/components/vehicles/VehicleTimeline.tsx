'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { PlusCircle, Navigation, Wrench, Droplet, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineEvent {
  id: string;
  type: 'registered' | 'trip' | 'shop' | 'fuel' | 'status_change';
  description: string;
  user: string;
  date: string;
}

export interface VehicleTimelineProps {
  vehicleId: string;
}

const mockEvents: Record<string, TimelineEvent[]> = {
  'veh-1': [
    { id: 'ev-1', type: 'registered', description: 'Vehicle added to active registry', user: 'Admin Logistics', date: '2024-01-15 08:30' },
    { id: 'ev-2', type: 'fuel', description: 'Fuel Refill: 150 gallons logged', user: 'Marcus Miller', date: '2024-06-10 14:15' },
    { id: 'ev-3', type: 'trip', description: 'Trip completed: Houston Depot → Chicago Hub', user: 'Marcus Miller', date: '2024-07-02 18:22' },
    { id: 'ev-4', type: 'shop', description: 'Scheduled Brake Inspection Completed', user: 'Dallas Shop Main', date: '2024-07-08 11:00' },
  ],
  'veh-2': [
    { id: 'ev-5', type: 'registered', description: 'Vehicle added to active registry', user: 'Admin Logistics', date: '2023-05-10 09:12' },
    { id: 'ev-6', type: 'trip', description: 'Route Dispatched: Local Delivery Chicago East', user: 'David Richardson', date: '2024-07-11 07:00' },
  ],
  'veh-3': [
    { id: 'ev-7', type: 'registered', description: 'Vehicle added to active registry', user: 'Admin Logistics', date: '2022-09-20 10:00' },
    { id: 'ev-8', type: 'shop', description: 'Engine diagnostics run: Oil leak detected', user: 'Dallas Shop Main', date: '2024-07-12 09:45' },
  ],
};

const icons = {
  registered: PlusCircle,
  trip: Navigation,
  shop: Wrench,
  fuel: Droplet,
  status_change: CheckCircle,
};

const colors = {
  registered: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  trip: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  shop: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  fuel: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
  status_change: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
};

export function VehicleTimeline({ vehicleId }: VehicleTimelineProps) {
  const events = mockEvents[vehicleId] || [
    { id: 'ev-def', type: 'registered', description: 'Vehicle registered in fleet inventory', user: 'System Auto', date: '2024-01-01' },
  ];

  return (
    <Card className="p-5 select-none space-y-4 text-left">
      <div className="border-b border-border/60 pb-3">
        <h3 className="text-sm font-bold text-foreground">Operational History</h3>
        <p className="text-[10px] text-muted-foreground">Historical records, shop tickets, and driver logs</p>
      </div>

      <div className="pt-2 flex flex-col relative">
        {events.map((event, idx) => {
          const Icon = icons[event.type] || CheckCircle;
          const isLast = idx === events.length - 1;

          return (
            <div key={event.id} className="relative flex gap-4 group">
              {/* Vertical connector line */}
              {!isLast && (
                <span
                  className="absolute left-4 top-8 bottom-[-16px] w-[1px] bg-border/60 group-hover:bg-border transition-colors"
                  aria-hidden="true"
                />
              )}

              {/* Icon symbol */}
              <div className={cn(
                'relative z-10 flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border shadow-soft',
                colors[event.type] || colors.status_change
              )}>
                <Icon className="h-4 w-4" />
              </div>

              {/* Event details text */}
              <div className="space-y-1 pb-5 min-w-0 flex-1">
                <div className="flex justify-between items-baseline gap-2">
                  <p className="text-[11px] font-bold text-foreground truncate">{event.description}</p>
                  <span className="text-[9px] font-semibold text-muted-foreground/60 shrink-0 uppercase">
                    {event.date}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium leading-none">
                  Logged by <span className="text-foreground/80 font-bold">{event.user}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default VehicleTimeline;
