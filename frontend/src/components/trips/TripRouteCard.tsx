'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Navigation, MapPin, Eye, ArrowRight } from 'lucide-react';

interface TripRouteCardProps {
  route: {
    source: string;
    destination: string;
    plannedDistance: number;
    estimatedTime: string;
    intermediateStops?: string[];
    gpsLocation?: string;
  } | null;
}

export function TripRouteCard({ route }: TripRouteCardProps) {
  if (!route) {
    return (
      <Card className="p-5 border border-dashed border-border/70 flex flex-col items-center justify-center min-h-[140px] text-center select-none bg-muted/5">
        <Navigation className="h-6 w-6 text-muted-foreground/50 mb-1.5" />
        <p className="text-xs font-semibold text-muted-foreground">No route information yet</p>
        <p className="text-[10px] text-muted-foreground/60 max-w-[200px] mt-0.5 font-semibold">Enter trip origin and cargo drop locations.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 border border-border/50 bg-card select-none text-left space-y-3 shadow-inner hover:shadow-sm transition-all">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
          <Navigation className="h-4.5 w-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-extrabold text-foreground">Route Details</h4>
          <p className="text-[10px] text-muted-foreground">Estimate: {route.estimatedTime} ({route.plannedDistance} mi)</p>
        </div>
      </div>

      <div className="space-y-2.5 relative pl-4 border-l border-border/70 ml-1.5 text-xs">
        <div className="relative">
          <span className="absolute -left-[21px] top-0.5 h-3.5 w-3.5 rounded-full border bg-background border-primary flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Source Origin</div>
          <div className="font-extrabold text-foreground mt-0.5 leading-tight">{route.source}</div>
        </div>

        <div className="relative pt-1">
          <span className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border bg-background border-emerald-500 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <div className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Cargo Destination</div>
          <div className="font-extrabold text-foreground mt-0.5 leading-tight">{route.destination}</div>
        </div>
      </div>

      {route.gpsLocation && (
        <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground font-semibold">Active Tracker</span>
          <span className="font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 px-1.5 py-0.5 rounded border border-indigo-200/50">
            {route.gpsLocation}
          </span>
        </div>
      )}
    </Card>
  );
}

export default TripRouteCard;
