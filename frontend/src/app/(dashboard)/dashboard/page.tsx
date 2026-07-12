import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { LayoutDashboard, FileText, Settings, Users, Compass, Truck } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard Hub"
        description="System overview, active operations tracker, and analytical insights"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Module overview blueprints */}
        <div className="border border-border bg-card rounded-xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Fleet Logistics</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Manage vehicles, track odometer readings, monitor fuel logs, and inspect maintenance schedules.
          </p>
          <div className="text-[10px] font-mono text-muted-foreground bg-muted p-2 rounded-lg space-y-1">
            <div>• Path: <Link href="/vehicles" className="text-primary hover:underline">/vehicles</Link>, <Link href="/fuel" className="text-primary hover:underline">/fuel</Link></div>
            <div>• Service: <span className="text-foreground">vehicleService</span></div>
          </div>
        </div>

        <div className="border border-border bg-card rounded-xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Human Resources</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Oversee drivers, duty statuses, license expiration alerts, and assign vehicles.
          </p>
          <div className="text-[10px] font-mono text-muted-foreground bg-muted p-2 rounded-lg space-y-1">
            <div>• Path: <Link href="/drivers" className="text-primary hover:underline">/drivers</Link></div>
            <div>• Service: <span className="text-foreground">driverService</span></div>
          </div>
        </div>

        <div className="border border-border bg-card rounded-xl p-5 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-foreground">Dispatch & Trips</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Track route progress, origin-destination details, departure timings, and statuses.
          </p>
          <div className="text-[10px] font-mono text-muted-foreground bg-muted p-2 rounded-lg space-y-1">
            <div>• Path: <Link href="/trips" className="text-primary hover:underline">/trips</Link></div>
            <div>• Service: <span className="text-foreground">tripService</span></div>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-dashed border-border bg-card/45 rounded-xl p-6 text-center max-w-xl mx-auto">
        <LayoutDashboard className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <h4 className="font-medium text-foreground text-sm">Dashboard Architectural Blueprint</h4>
        <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
          Use TanStack Query to fetch aggregate metrics for these modules. Connect to the dashboard API endpoints in Step 2.
        </p>
      </div>
    </PageContainer>
  );
}
