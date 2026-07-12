import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Bell, CheckSquare } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Notifications Center"
        description="Monitor system logs, dispatch issues, vehicle warnings, and maintenance alerts"
      >
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer">
          <CheckSquare className="h-3.5 w-3.5" />
          Mark All Read
        </button>
      </PageHeader>

      <div className="border border-border bg-card rounded-2xl p-6 shadow-soft max-w-3xl mx-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
          <Bell className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground text-base">Notifications Module Architecture</h3>
            <p className="text-xs text-muted-foreground">Boilerplate configurations for system alerts</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Notice Types</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Odometer limit warnings</div>
                <div>• License expiration date notices</div>
                <div>• Trip scheduling delay warnings</div>
                <div>• Expense approval requests</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Active Store Listeners</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Store: <span className="text-foreground">uiStore</span></div>
                <div>• Action: <span className="text-foreground">Sonner Toasts (ToastProvider)</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Implementation</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Connect WebSockets or polling hooks</div>
                <div>• Display badges for unread messages</div>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                Real-Time Ready
              </span>
              <p className="text-[11px] text-muted-foreground">
                In Step 2, subscribe to SSE or socket channels to display notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
