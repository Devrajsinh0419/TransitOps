import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Compass, Plus, RefreshCw } from 'lucide-react';

export default function TripsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Trips & Dispatching"
        description="Monitor route progress, origin-destination details, departure timings, and statuses"
      >
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer">
          <RefreshCw className="h-3.5 w-3.5" />
          Sync
        </button>
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          Create Trip
        </button>
      </PageHeader>

      <div className="border border-border bg-card rounded-2xl p-6 shadow-soft max-w-3xl mx-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
          <Compass className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground text-base">Trips Module Architecture</h3>
            <p className="text-xs text-muted-foreground">Boilerplate configuration and interfaces for this module</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Service Operations</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• tripService.getAll(params)</div>
                <div>• tripService.getById(id)</div>
                <div>• tripService.create(data)</div>
                <div>• tripService.update(id, data)</div>
                <div>• tripService.delete(id)</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">TypeScript Interfaces</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Type: <span className="text-foreground">Trip</span></div>
                <div>• Status: <span className="text-foreground">TripStatus</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Target Hooks</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• usePagination (table pagination state)</div>
                <div>• useDebounce (searching filter inputs)</div>
                <div>• useQuery (TanStack state manager)</div>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                Ready for Step 2
              </span>
              <p className="text-[11px] text-muted-foreground">
                Import components like Tables, Badges, SearchInput and connect TanStack Query.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
