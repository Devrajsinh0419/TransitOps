'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '@/components/layouts/PageContainer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/cards/Card';
import {
  DriverOverview,
  DriverPerformance,
  DriverDocuments,
  DriverTimeline,
  DriverStatusBadge,
  DriverAvatar,
  DriverSkeleton,
} from '@/components/drivers';
import { useDriver } from '@/hooks/useDriver';
import { useDrivers } from '@/hooks/useDrivers';
import { ArrowLeft, Edit3, ShieldAlert, BadgeAlert, Star } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function DriverDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const driverId = params.id as string;

  const { driver, performance, trips, activities, isLoading, error } = useDriver(driverId);
  const { suspendDriver, activateDriver, deleteLocalDriver } = useDrivers();

  const [activeTab, setActiveTab] = useState('overview');
  const [isUpdating, setIsUpdating] = useState(false);

  if (isLoading) {
    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground select-none">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-semibold">Loading Profile...</span>
        </div>
        <DriverSkeleton.Profile />
      </PageContainer>
    );
  }

  if (error || !driver) {
    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground select-none">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs font-semibold">Back</span>
        </div>
        <div className="text-center py-16 border border-dashed border-border rounded-2xl max-w-md mx-auto bg-card">
          <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-base font-extrabold text-foreground">Failed to Load Profile</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {error || 'Driver profile not found in directory.'}
          </p>
          <Button onClick={() => router.push('/drivers')} className="mt-5 text-xs font-bold px-4 h-9 rounded-lg">
            Back to Directory
          </Button>
        </div>
      </PageContainer>
    );
  }

  const getExpiryCountdown = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(driver.licenseExpiry);
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const diffDays = getExpiryCountdown();

  const handleToggleStatus = async () => {
    setIsUpdating(true);
    if (driver.status === 'suspended') {
      await activateDriver(driver.id);
    } else {
      await suspendDriver(driver.id);
    }
    setIsUpdating(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the profile of ${driver.name}? This action is permanent.`)) {
      deleteLocalDriver(driver.id);
      router.push('/drivers');
    }
  };

  return (
    <PageContainer className="space-y-6 select-none">
      {/* Header */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => router.push('/drivers')} className="h-8 w-8 border border-border/60 p-0 flex items-center justify-center">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-xs font-bold text-foreground">Driver Profile</span>
      </div>

      {/* Profile Hero Card */}
      <Card className="p-6 border-border/50 text-left bg-gradient-to-r from-card via-card to-muted/20">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left min-w-0">
            <DriverAvatar name={driver.name} avatarUrl={driver.avatarUrl} status={driver.status} size="xl" />
            <div className="space-y-1.5 min-w-0">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">{driver.name}</h2>
              <p className="text-xs text-muted-foreground font-mono font-bold">
                {driver.employeeId} • {driver.licenseCategory}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center pt-1">
                <DriverStatusBadge status={driver.status} />
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border border-border bg-card text-foreground">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                  {driver.safetyScore}% Safety Score
                </span>
                {diffDays <= 60 && (
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    diffDays < 0 
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    <BadgeAlert className="h-3 w-3" />
                    {diffDays < 0 ? 'License Expired' : `License Expiry: ${diffDays}d`}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/drivers/${driver.id}/edit`)}
              className="h-9 gap-1.5 text-xs font-semibold text-muted-foreground border-border/60 hover:text-foreground"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit Driver
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleStatus}
              disabled={isUpdating}
              className={cn(
                "h-9 gap-1.5 text-xs font-semibold border-border/60",
                driver.status === 'suspended'
                  ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700'
                  : 'text-orange-600 dark:text-orange-400 hover:text-orange-700'
              )}
            >
              {driver.status === 'suspended' ? 'Activate Driver' : 'Suspend Driver'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="h-9 gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 border-border/60 hover:bg-rose-50 dark:hover:bg-rose-950/20"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs navigation panel */}
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-6 h-10 w-full max-w-2xl bg-muted/40 border border-border/50 rounded-xl p-1 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'license', label: 'License' },
            { id: 'trips', label: 'Trips' },
            { id: 'performance', label: 'Performance' },
            { id: 'documents', label: 'Documents' },
            { id: 'activity', label: 'Activity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'text-[11px] font-bold rounded-lg py-1.5 transition-all cursor-pointer',
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <DriverOverview driver={driver} />
          </div>
        )}

        {/* Tab 2: License Details */}
        {activeTab === 'license' && (
          <div className="animate-fade-in">
            <Card className="p-5 border-border/50 text-left space-y-5">
              <div className="border-b border-border/60 pb-3 mb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Commercial Driver License (CDL)</h3>
                  <p className="text-[10px] text-muted-foreground">Compliance parameters and issuing authority registry</p>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-lg border ${
                  diffDays < 0 
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
                    : diffDays <= 60 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                }`}>
                  {diffDays < 0 ? 'EXPIRED' : diffDays <= 60 ? 'EXPIRING SOON' : 'COMPLIANT'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">License Number</p>
                  <p className="text-sm font-bold text-foreground mt-1 font-mono">{driver.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">License Category / Class</p>
                  <p className="text-sm font-bold text-foreground mt-1">{driver.licenseCategory}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Issuing Authority</p>
                  <p className="text-sm font-bold text-foreground mt-1">{driver.issuingAuthority}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Issue Date</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{driver.licenseIssueDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Expiration Date</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{driver.licenseExpiry}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">Renewal Reminder</p>
                  <p className="text-xs font-semibold text-muted-foreground mt-1 italic">
                    {diffDays < 0 ? 'Renew Immediately' : `Renewal alert active (${diffDays} days remaining)`}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 bg-muted/10 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-foreground">Compliance Verification</h4>
                  <p className="text-[10px] text-muted-foreground">The digital license scan matches state registry logs.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info('Accessing compliance database...')}
                  className="h-8 text-xs font-bold border-border/60"
                >
                  Re-validate CDL
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 3: Trip History */}
        {activeTab === 'trips' && (
          <div className="animate-fade-in">
            <Card className="p-5 border-border/50 text-left">
              <div className="border-b border-border/60 pb-3 mb-4">
                <h3 className="text-sm font-bold text-foreground">Assigned Trip Log</h3>
                <p className="text-[10px] text-muted-foreground">Historical list of logistics routes dispatched by this driver</p>
              </div>
              
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-border/50 bg-muted/20 text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                      <th className="py-2.5 px-3">Trip Code</th>
                      <th className="py-2.5 px-3">Vehicle</th>
                      <th className="py-2.5 px-3">Distance</th>
                      <th className="py-2.5 px-3">Cargo Description</th>
                      <th className="py-2.5 px-3">Revenue Value</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Dispatch Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 text-xs">
                    {trips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-muted/10 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-primary">{trip.tripCode}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-foreground bg-muted px-2 py-0.5 rounded border border-border/20">
                            {trip.vehicleName} ({trip.vehicleRegistration})
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-medium text-foreground">{trip.distance} mi</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{trip.cargo}</td>
                        <td className="py-2.5 px-3 font-mono text-foreground font-semibold">${trip.revenue.toLocaleString()}</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            Completed
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{trip.date}</td>
                      </tr>
                    ))}

                    {trips.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-muted-foreground italic">
                          No assigned trip logs found for this driver.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 4: Performance */}
        {activeTab === 'performance' && performance && (
          <div className="animate-fade-in">
            <DriverPerformance performance={performance} />
          </div>
        )}

        {/* Tab 5: Documents */}
        {activeTab === 'documents' && (
          <div className="animate-fade-in">
            <DriverDocuments driver={driver} />
          </div>
        )}

        {/* Tab 6: Activity Logs */}
        {activeTab === 'activity' && (
          <div className="animate-fade-in">
            <DriverTimeline activities={activities} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
