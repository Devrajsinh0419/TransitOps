'use client';

import React from 'react';
import { Wrench, CheckCircle, XCircle, UserPlus, PlayCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineNode {
  id: string;
  type: string;
  description: string;
  user: string;
  date: string;
}

interface MaintenanceTimelineProps {
  timeline: TimelineNode[];
}

export function MaintenanceTimeline({ timeline }: MaintenanceTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'created':
        return { icon: FileText, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' };
      case 'approved':
        return { icon: CheckCircle, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' };
      case 'technician_assigned':
        return { icon: UserPlus, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' };
      case 'started':
      case 'in_progress':
        return { icon: PlayCircle, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' };
      case 'completed':
        return { icon: CheckCircle, color: 'text-teal-500 bg-teal-500/10 border-teal-500/20' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
      default:
        return { icon: Wrench, color: 'text-muted-foreground bg-muted/10 border-muted/20' };
    }
  };

  return (
    <div className="flow-root select-none text-left">
      <ul role="list" className="-mb-8">
        {timeline.map((node, nodeIdx) => {
          const { icon: Icon, color } = getIcon(node.type);
          return (
            <li key={node.id}>
              <div className="relative pb-8">
                {nodeIdx !== timeline.length - 1 ? (
                  <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-border/40" aria-hidden="true" />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full border flex items-center justify-center ring-8 ring-background ${color}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-xs text-foreground font-bold">{node.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        Logged by <span className="font-semibold text-foreground">{node.user}</span>
                      </p>
                    </div>
                    <div className="text-right text-[10px] whitespace-nowrap text-muted-foreground font-semibold">
                      {node.date}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MaintenanceTimeline;
