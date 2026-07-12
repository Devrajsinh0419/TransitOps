import React from 'react';
import { PageContainer } from '@/components/layouts/PageContainer';
import { PageHeader } from '@/components/layouts/PageHeader';
import { Settings, Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="System Settings"
        description="Configure operational criteria, business hours, alerts, and system localization preferences"
      >
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer">
          <Save className="h-3.5 w-3.5" />
          Save Changes
        </button>
      </PageHeader>

      <div className="border border-border bg-card rounded-2xl p-6 shadow-soft max-w-3xl mx-auto">
        <div className="flex items-center gap-3 pb-4 border-b border-border/60 mb-5">
          <Settings className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground text-base">Settings Module Architecture</h3>
            <p className="text-xs text-muted-foreground">Boilerplate configurations for settings</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Available Options</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• General App Configurations</div>
                <div>• Theme preferences: Light, Dark, System</div>
                <div>• Alert Triggers (odometer levels, license expiration)</div>
                <div>• Localization (currency, metric/imperial units)</div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Relevant Stores & Constants</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• Store: <span className="text-foreground">uiStore</span></div>
                <div>• Constant: <span className="text-foreground">APP_CONFIG</span></div>
                <div>• Storage Keys: <span className="text-foreground">STORAGE_KEYS</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Hooks Implemented</h4>
              <div className="font-mono text-[10px] text-muted-foreground bg-muted p-2.5 rounded-lg space-y-1.5">
                <div>• useTheme (for switching theme state)</div>
                <div>• useLocalStorage (for local settings configuration)</div>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-xl p-4 flex flex-col justify-center items-center text-center">
              <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-full mb-2">
                Configure Layout
              </span>
              <p className="text-[11px] text-muted-foreground">
                In Step 2, connect tab toggles for General, Security, and Dispatch Settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
