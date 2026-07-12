'use client';

import React from 'react';
import { SettingsHeader, SettingsSidebar } from '@/components/settings';
import { Info, ExternalLink, HelpCircle, ShieldCheck, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutSettingsPage() {
  const versionInfo = {
    appName: 'TransitOps ERP Suite',
    version: '2026.7.12',
    buildNumber: 'b1029-release-c86a',
    developer: 'TransitOps Product Engineering Team',
    license: 'Commercial Enterprise SaaS License',
  };

  return (
    <div className="space-y-6 select-none text-left">
      <SettingsHeader title="About App" />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <SettingsSidebar />

        {/* Content body */}
        <div className="flex-1 space-y-6">
          {/* Logo card */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4 text-center sm:text-left flex flex-col sm:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md">
              <span className="text-2xl font-black text-primary-foreground tracking-tighter">TO</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-black text-foreground">TransitOps ERP System</h2>
              <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
                Enterprise fleet management, real-time routing optimization, maintenance tracking, and analytics dashboards for transport logistics operators.
              </p>
            </div>
          </div>

          {/* Software details */}
          <div className="p-6 border border-border/50 bg-card rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-foreground pb-2 border-b border-border/30 flex items-center gap-1.5">
              <Info className="h-4 w-4 text-primary" />
              Software Roster Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Application Name</span>
                <p className="text-foreground">{versionInfo.appName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Roster Version</span>
                <p className="text-foreground">{versionInfo.version}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Build Code Identifier</span>
                <p className="text-foreground">{versionInfo.buildNumber}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Ownership License</span>
                <p className="text-foreground">{versionInfo.license}</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Designated Developer Org</span>
                <p className="text-foreground">{versionInfo.developer}</p>
              </div>
            </div>
          </div>

          {/* Resources links list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Documentation */}
            <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-2 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <div className="p-2 rounded-xl bg-primary/10 w-fit flex items-center justify-center">
                  <FileText className="h-4.5 w-4.5 text-primary" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-foreground pt-1">User Manuals</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">Operational guides, routing protocols, and setup keys.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[10px] font-bold mt-3 gap-1 w-full border-border/60"
                rightIcon={<ExternalLink className="h-3 w-3" />}
              >
                Open Documentation
              </Button>
            </div>

            {/* Support */}
            <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-2 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <div className="p-2 rounded-xl bg-amber-500/10 w-fit flex items-center justify-center">
                  <HelpCircle className="h-4.5 w-4.5 text-amber-500" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-foreground pt-1">Customer Support</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">Submit logistics tickets or query dispatcher setups.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[10px] font-bold mt-3 gap-1 w-full border-border/60"
                rightIcon={<ExternalLink className="h-3 w-3" />}
              >
                Contact Helpdesk
              </Button>
            </div>

            {/* Compliance */}
            <div className="p-5 border border-border/50 bg-card rounded-2xl space-y-2 flex flex-col justify-between h-full">
              <div className="space-y-1">
                <div className="p-2 rounded-xl bg-emerald-500/10 w-fit flex items-center justify-center">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider text-foreground pt-1">Audit Compliance</h4>
                <p className="text-[9px] text-muted-foreground leading-normal">GDPR, DOT compliance logs, and data security terms.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-[10px] font-bold mt-3 gap-1 w-full border-border/60"
                rightIcon={<ExternalLink className="h-3 w-3" />}
              >
                View Audits Info
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
