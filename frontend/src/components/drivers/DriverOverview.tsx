'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Driver } from '@/types/driver';
import { User, Phone, MapPin, HeartPulse, ShieldAlert, Award } from 'lucide-react';

export interface DriverOverviewProps {
  driver: Driver;
}

export function DriverOverview({ driver }: DriverOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 select-none text-left">
      {/* Col 1: Personal & contact */}
      <Card className="p-5 border-border/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <User className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold text-foreground">Contact & Credentials</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Gender / DOB</p>
            <p className="font-semibold text-foreground mt-0.5 capitalize">
              {driver.gender} • {driver.dob}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Phone Number</p>
            <p className="font-semibold text-foreground mt-0.5 flex items-center gap-1">
              <Phone className="h-3 w-3 text-muted-foreground" />
              {driver.phone}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Email Address</p>
            <p className="font-semibold text-foreground mt-0.5 truncate">{driver.email}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Physical Address</p>
            <p className="font-semibold text-foreground mt-0.5 flex items-start gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground mt-0.5 shrink-0" />
              <span>{driver.address}</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Col 2: Emergency Contact & Health Info */}
      <Card className="p-5 border-border/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <HeartPulse className="h-4 w-4 text-emerald-500" />
          <h3 className="text-xs font-bold text-foreground">Health & Emergency</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Blood Group</p>
            <p className="font-semibold text-foreground mt-0.5">{driver.bloodGroup}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Health Status</p>
            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 capitalize ${
              driver.healthStatus === 'fit'
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
            }`}>
              {driver.healthStatus === 'fit' ? 'Fit for Duty' : driver.healthStatus}
            </span>
          </div>
          <div className="pt-2 border-t border-border/40">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Emergency Contact</p>
            <p className="font-semibold text-foreground mt-0.5">{driver.emergencyContact}</p>
            <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{driver.emergencyPhone}</p>
          </div>
        </div>
      </Card>

      {/* Col 3: Experience & Administration */}
      <Card className="p-5 border-border/50 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Award className="h-4 w-4 text-amber-500" />
          <h3 className="text-xs font-bold text-foreground">Administrative Status</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Joining Date</p>
            <p className="font-semibold text-foreground mt-0.5">{driver.joiningDate}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Department</p>
            <p className="font-semibold text-foreground mt-0.5">{driver.department || 'N/A'}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Experience Value</p>
            <p className="font-semibold text-foreground mt-0.5">{driver.experienceYears} Years Commercial</p>
          </div>
          
          {driver.notes && (
            <div className="pt-2 border-t border-border/40">
              <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-zinc-400" />
                Administration Remarks
              </p>
              <p className="text-[10px] text-muted-foreground leading-relaxed mt-1 italic">{driver.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default DriverOverview;
