'use client';

import React from 'react';
import { TripTimeline as TimelineEventType } from '@/types/trip';
import {
  FileText,
  Truck,
  UserCheck,
  Send,
  Navigation,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
} from 'lucide-react';

interface TripTimelineProps {
  timeline: TimelineEventType[];
}

export function TripTimeline({ timeline }: TripTimelineProps) {
  const getIcon = (type: TimelineEventType['type']) => {
    switch (type) {
      case 'created':
        return <FileText className="h-4 w-4" />;
      case 'vehicle_assigned':
        return <Truck className="h-4 w-4" />;
      case 'driver_assigned':
        return <UserCheck className="h-4 w-4" />;
      case 'dispatched':
        return <Send className="h-4 w-4" />;
      case 'started':
        return <Navigation className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      case 'delayed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getColor = (type: TimelineEventType['type']) => {
    switch (type) {
      case 'created':
        return 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
      case 'vehicle_assigned':
        return 'text-sky-500 bg-sky-500/10 border-sky-500/20';
      case 'driver_assigned':
        return 'text-teal-500 bg-teal-500/10 border-teal-500/20';
      case 'dispatched':
        return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
      case 'started':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'completed':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'cancelled':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'delayed':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-200';
    }
  };

  if (!timeline || timeline.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground select-none">
        No workflow history has been recorded yet.
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l border-border/80 ml-3 py-1.5 space-y-5 text-left select-none">
      {timeline.map((event, index) => (
        <div key={event.id || index} className="relative group">
          {/* Node bubble */}
          <span
            className={`absolute -left-[35px] top-0.5 flex h-7.5 w-7.5 items-center justify-center rounded-full border shadow-sm transition-transform duration-200 group-hover:scale-105 ${getColor(
              event.type
            )}`}
          >
            {getIcon(event.type)}
          </span>

          <div className="space-y-1 pl-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h5 className="text-xs font-bold text-foreground tracking-tight leading-tight">
                {event.description}
              </h5>
              <time className="text-[9px] text-muted-foreground font-semibold font-mono whitespace-nowrap bg-muted/40 px-1.5 py-0.5 rounded border border-border/20">
                {event.date}
              </time>
            </div>
            <p className="text-[10px] text-muted-foreground leading-none font-medium">
              Triggered by <span className="font-semibold text-foreground">{event.user}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TripTimeline;
