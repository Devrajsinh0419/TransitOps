'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMaintenanceDetails } from '@/hooks/useMaintenanceDetails';
import { MaintenanceStatusBadge, MaintenancePriorityBadge, MaintenanceTimeline, MaintenanceDialog } from '@/components/maintenance';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Edit2, Calendar, Wrench, ShieldAlert, DollarSign, User, Activity } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/helpers';

export default function MaintenanceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const {
    record,
    isLoading,
    error,
    approve,
    start,
    complete,
    cancel,
    refetch,
  } = useMaintenanceDetails(id);

  const [dialogType, setDialogType] = React.useState<'approve' | 'start' | 'complete' | 'cancel' | null>(null);
  const [dialogLoading, setDialogLoading] = React.useState(false);

  if (isLoading) {
    return (
      <div className="h-60 flex items-center justify-center text-xs font-semibold text-muted-foreground animate-pulse">
        Loading maintenance order audit files...
      </div>
    );
  }

  if (error || !record) {
    return (
      <div className="p-8 border border-dashed border-border/50 rounded-2xl text-center space-y-4 max-w-md mx-auto mt-12">
        <ShieldAlert className="h-8 w-8 text-rose-500 mx-auto" />
        <h3 className="text-sm font-bold text-foreground">{error || 'Ticket not found'}</h3>
        <Button variant="outline" size="sm" onClick={() => router.push('/maintenance')} className="h-9 rounded-lg">
          Back to Maintenance
        </Button>
      </div>
    );
  }

  const handleDialogConfirm = async (formData?: any) => {
    setDialogLoading(true);
    let success = false;
    
    if (dialogType === 'approve') success = await approve();
    else if (dialogType === 'start') success = await start();
    else if (dialogType === 'complete') success = await complete();
    else if (dialogType === 'cancel') success = await cancel();

    setDialogLoading(false);
    setDialogType(null);
    if (success) {
      refetch();
    }
  };

  return (
    <div className="space-y-6 select-none text-left">
      {/* Header breadcrumb bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border/40 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link href="/maintenance" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-lg font-black text-foreground uppercase tracking-tight">
              {record.maintenanceId}
            </h1>
            <MaintenanceStatusBadge status={record.status} />
            <MaintenancePriorityBadge priority={record.priority} />
          </div>
          <p className="text-xs text-muted-foreground">{record.issueTitle}</p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link href={`/maintenance/${record.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs font-semibold rounded-lg gap-1.5 border-border/60"
              leftIcon={<Edit2 className="h-3.5 w-3.5" />}
            >
              Edit Ticket
            </Button>
          </Link>

          {/* Workflow state buttons */}
          {record.status === 'pending' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDialogType('approve')}
              className="h-9 text-xs font-extrabold rounded-lg px-4"
            >
              Approve Order
            </Button>
          )}

          {record.status === 'approved' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setDialogType('start')}
              className="h-9 text-xs font-extrabold rounded-lg px-4"
            >
              Start Service
            </Button>
          )}

          {record.status === 'in_progress' && (
            <Button
              variant="success"
              size="sm"
              onClick={() => setDialogType('complete')}
              className="h-9 text-xs font-extrabold rounded-lg px-4"
            >
              Complete Service
            </Button>
          )}

          {['pending', 'approved', 'in_progress'].includes(record.status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDialogType('cancel')}
              className="h-9 text-xs font-bold text-rose-500 hover:bg-rose-500/5 rounded-lg"
            >
              Cancel Ticket
            </Button>
          )}
        </div>
      </div>

      {/* Main grids layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column info cards */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Summary Details */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Service Work Order Specs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Problem Description</span>
                <p className="text-foreground leading-relaxed font-medium bg-muted/10 p-3 rounded-lg border border-border/30">
                  {record.description}
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Service Type</span>
                    <span className="font-extrabold text-foreground uppercase">{record.type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Est. Duration</span>
                    <span className="font-extrabold text-foreground">{record.estimatedDuration}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Workshop / Shop</span>
                    <span className="font-extrabold text-foreground">{record.workshop}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">Technician Assigned</span>
                    <span className="font-extrabold text-foreground flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> {record.technicianName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle summary card */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Assigned Vehicle Lifecycle Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Registration</span>
                <span className="font-extrabold text-foreground">{record.vehicleRegistration}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Model Name</span>
                <span className="font-semibold text-foreground truncate block">{record.vehicleName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Odometer at Checkin</span>
                <span className="font-extrabold text-foreground">{record.vehicleOdometer.toLocaleString('en-IN')} km</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Current Status</span>
                <span className="font-bold text-primary uppercase">{record.vehicleStatus}</span>
              </div>
            </div>
          </div>

          {/* Financial cost audit */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30">
              Work Order Financial Auditing
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Est. Cost</span>
                <span className="font-semibold text-muted-foreground">{formatCurrency(record.estimatedCost)}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Labour Cost</span>
                <span className="font-semibold text-foreground">{formatCurrency(record.labourCost)}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Parts Cost</span>
                <span className="font-semibold text-foreground">{formatCurrency(record.partsCost)}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase block">Tax</span>
                <span className="font-semibold text-foreground">{formatCurrency(record.tax)}</span>
              </div>
              <div className="bg-muted/30 p-2.5 rounded-xl border border-border/50 text-right">
                <span className="text-[9px] font-black text-muted-foreground uppercase block">TOTAL AMOUNT</span>
                <span className="font-black text-foreground text-sm">{formatCurrency(record.totalCost)}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right column timeline audit log */}
        <div className="space-y-6">
          <div className="p-6 border border-border/50 bg-card rounded-2xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
              <Activity className="h-4 w-4 text-primary" />
              Ticket Audit Timeline
            </h3>
            <MaintenanceTimeline timeline={record.timeline} />
          </div>
        </div>

      </div>

      {/* Confirmation Workflow Modals */}
      <MaintenanceDialog
        isOpen={!!dialogType}
        onClose={() => setDialogType(null)}
        type={dialogType}
        onConfirm={handleDialogConfirm}
        isLoading={dialogLoading}
        vehicleRegistration={record.vehicleRegistration}
      />
    </div>
  );
}
