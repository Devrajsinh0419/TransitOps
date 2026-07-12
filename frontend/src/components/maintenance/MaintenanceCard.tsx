'use client';

import React from 'react';
import { MaintenanceRecord } from '@/types/maintenance';
import { MaintenanceStatusBadge } from './MaintenanceStatusBadge';
import { MaintenancePriorityBadge } from './MaintenancePriorityBadge';
import { Button } from '../ui/Button';
import { Calendar, Wrench, DollarSign, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

interface MaintenanceCardProps {
  record: MaintenanceRecord;
}

export function MaintenanceCard({ record }: MaintenanceCardProps) {
  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 hover:shadow-md hover:border-border transition-all select-none text-left">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-muted-foreground/80 tracking-wider">
          {record.maintenanceId}
        </span>
        <MaintenanceStatusBadge status={record.status} />
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-extrabold text-foreground line-clamp-1">{record.issueTitle}</h4>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          {record.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/30 text-[10px] text-muted-foreground">
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Vehicle</span>
          <span className="font-semibold text-foreground truncate block">{record.vehicleRegistration}</span>
          <span className="text-[9px] block truncate">{record.vehicleName}</span>
        </div>
        <div>
          <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Technician</span>
          <span className="font-semibold text-foreground flex items-center gap-1">
            <User className="h-3 w-3" /> {record.technicianName}
          </span>
          <span className="text-[9px] block truncate">{record.workshop}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/20">
        <div className="flex items-center text-foreground font-black text-xs">
          <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{record.totalCost.toLocaleString()}</span>
        </div>
        <Link href={`/maintenance/${record.id}`}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-[10px] px-3 font-bold hover:bg-muted text-primary rounded-lg"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MaintenanceCard;
