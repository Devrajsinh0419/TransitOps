'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFuelLog } from '@/hooks/useFuelLog';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Fuel, Calendar, MapPin, DollarSign, User, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/helpers';

export default function FuelLogDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { log, isLoading, error } = useFuelLog(id);

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center text-xs font-semibold text-muted-foreground animate-pulse">
        Fetching refuel receipt details...
      </div>
    );
  }

  if (error || !log) {
    return (
      <div className="p-8 border border-dashed border-border/50 rounded-2xl text-center space-y-4 max-w-md mx-auto mt-12">
        <ShieldAlert className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">{error || 'Log not found'}</h3>
        <Button variant="outline" size="sm" onClick={() => router.push('/fuel')} className="h-9 rounded-lg">
          Back to Fuel Logs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none text-left max-w-4xl mx-auto">
      {/* Header breadcrumbs */}
      <div className="flex justify-between items-center pb-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Link href="/fuel" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-1.5">
            <Fuel className="h-5 w-5 text-primary" />
            {log.fuelLogId}
          </h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-500/10 text-emerald-500 border-emerald-500/25">
            <CheckCircle className="h-3 w-3" />
            Audited & Approved
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
          <Calendar className="h-3.5 w-3.5" /> Filed: {log.date}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Transaction Details Column */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Cost details */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Transaction Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Fuel Type</span>
                <span className="font-extrabold text-foreground uppercase">{log.fuelType}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Liters Filled</span>
                <span className="font-extrabold text-foreground">{log.quantity.toLocaleString('en-IN')} L</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Price per Liter</span>
                <span className="font-bold text-foreground">{formatCurrency(log.pricePerLiter)}/L</span>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50 text-right">
                <span className="text-[9px] font-black text-muted-foreground uppercase block">TOTAL BILLED</span>
                <span className="font-black text-foreground text-sm">{formatCurrency(log.totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Asset Assignment Summary */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Related Fleet Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Vehicle</span>
                <span className="font-extrabold text-foreground block">{log.vehicleRegistration}</span>
                <span className="text-[10px] text-muted-foreground">{log.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Driver</span>
                <span className="font-semibold text-foreground flex items-center gap-1 block mt-0.5">
                  <User className="h-3.5 w-3.5" /> {log.driverName}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Log Odometer (km)</span>
                <span className="font-extrabold text-foreground">{log.odometer.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Station and Invoice Details */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Receipt Verification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Refuel Station Location</span>
                <span className="font-semibold text-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {log.fuelStation}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Invoice / Receipt ID</span>
                <span className="font-extrabold text-foreground">{log.invoiceNumber}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Attachment Scan Column */}
        <div className="space-y-6">
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-primary" />
              Receipt Invoice Scan
            </h3>
            
            {/* Attachment preview placeholder */}
            <div className="border border-border/40 rounded-xl p-3 bg-muted/10 text-center space-y-3">
              <div className="h-48 border border-dashed border-border/60 bg-card rounded-lg flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
                  <FileText className="h-4 w-4 text-muted-foreground/60" /> fuel_receipt_sample.jpg
                </span>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-[10px] w-full rounded-lg font-bold">
                Download Original Scan
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
