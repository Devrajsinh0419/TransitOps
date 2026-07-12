'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/cards/Card';
import {
  TripHeader,
  TripStatusBadge,
  TripTimeline,
  TripVehicleCard,
  TripDriverCard,
  TripRouteCard,
  TripFinancialCard,
  TripCargoCard,
  DispatchDialog,
  CompleteTripDialog,
  CancelTripDialog,
  SummarySkeleton,
} from '@/components/trips';
import { useTrip } from '@/hooks/useTrip';
import { useDispatchTrip } from '@/hooks/useDispatchTrip';
import { useCompleteTrip } from '@/hooks/useCompleteTrip';
import { useCancelTrip } from '@/hooks/useCancelTrip';
import {
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Navigation,
  FileText,
  DollarSign,
  Briefcase,
  Play,
  CheckSquare,
  XCircle,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { trip, isLoading, error, updateTripState } = useTrip(id);
  const { dispatchTrip, isLoading: isDispatching } = useDispatchTrip();
  const { completeTrip, isLoading: isCompleting } = useCompleteTrip();
  const { cancelTrip, isLoading: isCancelling } = useCancelTrip();

  const [activeTab, setActiveTab] = React.useState<'overview' | 'route' | 'vehicle' | 'driver' | 'timeline' | 'expenses' | 'documents'>('overview');

  // Dialog State
  const [activeDialog, setActiveDialog] = React.useState<'dispatch' | 'complete' | 'cancel' | null>(null);

  const handleConfirmDispatch = async () => {
    if (!trip) return;
    const success = await dispatchTrip(trip.id);
    if (success) {
      setActiveDialog(null);
      window.location.reload();
    }
  };

  const handleConfirmComplete = async (data: any) => {
    if (!trip) return;
    const success = await completeTrip(trip.id, data);
    if (success) {
      setActiveDialog(null);
      window.location.reload();
    }
  };

  const handleConfirmCancel = async (data: any) => {
    if (!trip) return;
    const success = await cancelTrip(trip.id, data);
    if (success) {
      setActiveDialog(null);
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <PageContainer className="space-y-6">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        <div className="h-10 w-64 bg-muted animate-pulse rounded" />
        <SummarySkeleton />
      </PageContainer>
    );
  }

  if (error || !trip) {
    return (
      <PageContainer className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-xs font-bold text-rose-500 mb-2">{error || 'Trip not found'}</p>
          <Link href="/trips">
            <Button variant="outline" size="sm" className="h-9 text-xs rounded-lg">
              Return to Directory
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6 select-none text-left">
      <TripHeader
        title={`Trip Manifest: ${trip.tripNumber}`}
        subtitle={trip.tripName}
        breadcrumbs={[
          { label: 'Trips', href: '/trips' },
          { label: trip.tripNumber },
        ]}
      />

      {/* Hero Quick Info Ribbon */}
      <div className="p-5 border border-border/50 bg-card rounded-2xl flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between shadow-sm">
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Workflow State</span>
            <div className="pt-0.5">
              <TripStatusBadge status={trip.status} />
            </div>
          </div>
          <span className="hidden sm:inline border-r border-border/60 h-6" />
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Registered By</span>
            <div className="text-foreground font-bold mt-0.5">{trip.createdBy}</div>
          </div>
          <span className="hidden sm:inline border-r border-border/60 h-6" />
          <div className="space-y-0.5">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">Cargo Payload</span>
            <div className="text-foreground font-bold mt-0.5">{trip.cargo.type} ({trip.cargo.weight.toLocaleString()} lbs)</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {trip.status === 'draft' && (
            <Button
              onClick={() => setActiveDialog('dispatch')}
              className="h-8 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg gap-1.5"
              leftIcon={<Play className="h-3.5 w-3.5" />}
            >
              Dispatch Trip
            </Button>
          )}

          {['dispatched', 'in_progress'].includes(trip.status) && (
            <Button
              onClick={() => setActiveDialog('complete')}
              className="h-8 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-1.5"
              leftIcon={<CheckSquare className="h-3.5 w-3.5" />}
            >
              Complete Trip
            </Button>
          )}

          {['draft', 'dispatched', 'in_progress'].includes(trip.status) && (
            <Button
              onClick={() => setActiveDialog('cancel')}
              variant="outline"
              className="h-8 text-[11px] font-bold border-rose-500/20 text-rose-600 bg-rose-500/5 hover:bg-rose-500/10 rounded-lg gap-1.5"
              leftIcon={<XCircle className="h-3.5 w-3.5" />}
            >
              Cancel
            </Button>
          )}

          <Link href={`/trips/${trip.id}/edit`}>
            <Button variant="outline" size="sm" className="h-8 text-[11px] rounded-lg border-border/60" leftIcon={<Edit2 className="h-3 w-3" />}>
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs list */}
      <div className="border-b border-border/40 flex overflow-x-auto gap-2 scrollbar-none">
        {(
          [
            { id: 'overview', label: 'Overview' },
            { id: 'route', label: 'Route Journey' },
            { id: 'vehicle', label: 'Assigned Vehicle' },
            { id: 'driver', label: 'Assigned Driver' },
            { id: 'timeline', label: 'Timeline Event Log' },
            { id: 'expenses', label: 'Expense Audits' },
            { id: 'documents', label: 'Trip Documents' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2 space-y-4">
              <Card className="p-4 border border-border/50 space-y-3">
                <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide border-b border-border/40 pb-2">Manifest Details</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{trip.description || 'No description recorded.'}</p>
                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Planned Distance</span>
                    <span className="font-extrabold text-foreground">{trip.route.plannedDistance} miles</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-muted-foreground uppercase font-bold">Estimated Time</span>
                    <span className="font-extrabold text-foreground">{trip.route.estimatedTime}</span>
                  </div>
                </div>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TripCargoCard cargo={trip.cargo} />
                <TripFinancialCard
                  expectedRevenue={trip.expectedRevenue}
                  estimatedFuelCost={trip.estimatedFuelCost}
                  estimatedToll={trip.estimatedToll}
                  estimatedExpenses={trip.estimatedExpenses}
                  actualRevenue={trip.actualRevenue}
                />
              </div>
            </div>

            <div className="space-y-4">
              <TripRouteCard route={trip.route} />
            </div>
          </div>
        )}

        {activeTab === 'route' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            <div className="lg:col-span-2">
              <TripRouteCard route={trip.route} />
            </div>
            <div>
              {/* Map Mockup */}
              <Card className="p-4 border border-border/50 h-full flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-foreground uppercase">GPS Navigation tracking</h4>
                  <p className="text-[10px] text-muted-foreground">Mock interface using Google Maps API</p>
                </div>
                <div className="my-6 aspect-video bg-muted/60 border border-border/40 rounded-xl flex items-center justify-center text-muted-foreground">
                  <div className="text-center p-4">
                    <Navigation className="h-6 w-6 mx-auto text-primary animate-pulse" />
                    <p className="text-[10px] font-bold text-foreground mt-2">Maps Display Container</p>
                    <p className="text-[9px] text-muted-foreground/80 mt-0.5">Route mapping {trip.route.source.split(',')[0]} ➜ {trip.route.destination.split(',')[0]}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'vehicle' && (
          <div className="max-w-xl animate-fade-in">
            <TripVehicleCard
              vehicle={{
                name: trip.vehicleName,
                registration: trip.vehicleRegistration,
                capacity: trip.vehicleCapacity,
                odometer: trip.vehicleOdometer,
                status: 'assigned',
              }}
              cargoWeight={trip.cargo.weight}
            />
          </div>
        )}

        {activeTab === 'driver' && (
          <div className="max-w-xl animate-fade-in">
            <TripDriverCard
              driver={{
                name: trip.driverName,
                avatarUrl: trip.driverAvatarUrl,
                phone: trip.driverPhone,
                licenseExpiry: trip.driverLicenseExpiry,
                safetyScore: trip.driverSafetyScore,
                status: 'assigned',
              }}
            />
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="max-w-2xl bg-card border border-border/50 rounded-2xl p-6 shadow-sm animate-fade-in">
            <h4 className="text-xs font-extrabold text-foreground uppercase border-b border-border/40 pb-2 mb-4">Trip Workflow Log</h4>
            <TripTimeline timeline={trip.timeline} />
          </div>
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-4 max-w-3xl animate-fade-in">
            <Card className="p-4 border border-border/50 space-y-3">
              <h4 className="text-xs font-extrabold text-foreground uppercase tracking-wide border-b border-border/40 pb-2">Registered Expense Records</h4>
              <div className="space-y-2">
                {trip.expenses.length > 0 ? (
                  trip.expenses.map((exp) => (
                    <div key={exp.id} className="flex items-center justify-between text-xs border-b border-border/10 pb-2 last:border-0 last:pb-0">
                      <div>
                        <div className="font-bold text-foreground">{exp.description}</div>
                        <div className="text-[10px] text-muted-foreground uppercase font-semibold">{exp.category} • {exp.date}</div>
                      </div>
                      <span className="font-extrabold text-rose-500">${exp.amount}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground py-2 italic">No expenses reported for this trip manifest yet.</p>
                )}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {[
              { title: 'Commercial Invoice', format: 'PDF Document', size: '2.4 MB' },
              { title: 'Delivery Receipt (Proof)', format: 'Image scan', size: '1.8 MB' },
              { title: 'Pre-Trip Inspection Check', format: 'Log sheet', size: '890 KB' },
            ].map((doc, idx) => (
              <Card key={idx} className="p-4 border border-border/50 bg-card hover:shadow-sm transition-all flex flex-col justify-between h-32">
                <div>
                  <h5 className="text-xs font-bold text-foreground">{doc.title}</h5>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{doc.format} • {doc.size}</p>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-lg mt-2 w-full justify-center">
                  Download File
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <DispatchDialog
        isOpen={activeDialog === 'dispatch'}
        onClose={() => setActiveDialog(null)}
        trip={trip}
        onConfirm={handleConfirmDispatch}
        isLoading={isDispatching}
      />

      <CompleteTripDialog
        isOpen={activeDialog === 'complete'}
        onClose={() => setActiveDialog(null)}
        trip={trip}
        onConfirm={handleConfirmComplete}
        isLoading={isCompleting}
      />

      <CancelTripDialog
        isOpen={activeDialog === 'cancel'}
        onClose={() => setActiveDialog(null)}
        trip={trip}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />
    </PageContainer>
  );
}
