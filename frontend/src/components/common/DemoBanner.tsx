'use client';

import React, { useState, useEffect } from 'react';
import { isDemoModeActive, switchDemoRole, resetDemoData, MOCK_DEMO_USERS } from '@/lib/demo';
import { UserRole } from '@/types/auth';
import { authStore } from '@/store/auth.store';
import { ShieldAlert, RefreshCw, Users, HelpCircle, ChevronDown, Check } from 'lucide-react';
import { Button } from '../ui/Button';

export function DemoBanner() {
  const [active, setActive] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('superadmin');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  useEffect(() => {
    setActive(isDemoModeActive());
    
    // Subscribe to auth role changes
    const unsubscribe = authStore.subscribe((state) => {
      if (state.user?.role) {
        setCurrentRole(state.user.role);
      }
    });
    return unsubscribe;
  }, []);

  if (!active) return null;

  const rolesList: UserRole[] = ['superadmin', 'admin', 'fleet_manager', 'dispatcher', 'driver', 'viewer'];

  const triggerTour = () => {
    setTourOpen(true);
  };

  return (
    <>
      {/* Floating Demo Control panel */}
      <div className="fixed bottom-4 right-4 z-[9999] select-none text-left">
        <div className="flex items-center gap-2 p-1.5 bg-card/90 backdrop-blur-md border border-primary/30 rounded-full shadow-2xl hover:border-primary/60 transition-all pl-4">
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-tight text-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>DEMO MODE ACTIVE</span>
          </div>

          <div className="h-4 w-px bg-border" />

          {/* Quick Actions */}
          <div className="flex items-center gap-1">
            {/* Role switch dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:text-foreground bg-muted/60 hover:bg-muted/80 rounded-full px-2.5 py-1 transition-all"
              >
                <Users className="h-3 w-3" />
                <span>{currentRole.replace('_', ' ')}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                  <div className="px-3 py-1.5 border-b border-border text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                    Switch User Role
                  </div>
                  {rolesList.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setDropdownOpen(false);
                        switchDemoRole(role);
                      }}
                      className="w-full px-3 py-2 text-left text-xs font-semibold hover:bg-muted transition-colors flex items-center justify-between text-foreground"
                    >
                      <span className="capitalize">{role.replace('_', ' ')}</span>
                      {currentRole === role && <Check className="h-3 w-3 text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset mock database */}
            <button
              onClick={resetDemoData}
              title="Reset Demo Data state"
              className="p-1 text-muted-foreground hover:text-amber-500 bg-muted/60 hover:bg-muted/80 rounded-full transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>

            {/* Quick Tour Guide */}
            <button
              onClick={triggerTour}
              title="Open Roster Tour Checklist"
              className="p-1 text-muted-foreground hover:text-primary bg-muted/60 hover:bg-muted/80 rounded-full transition-all"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Tour Overlay Modal */}
      {tourOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none">
          <div className="bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in-50 zoom-in-95 text-left">
            <div className="flex items-center gap-2 pb-2 border-b border-border/80">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-black uppercase tracking-wider text-foreground">TransitOps ERP Demo Guide</h3>
            </div>

            <div className="text-xs space-y-3 text-muted-foreground font-semibold leading-relaxed">
              <p>
                Welcome to the <strong>TransitOps</strong> live presentation deck! This demo system contains interactive modules fully operational on the client side:
              </p>
              
              <ul className="list-disc pl-5 space-y-1.5 text-[11px]">
                <li><strong>Live Dashboard</strong>: Realtime dispatch workflows and fleet KPIs.</li>
                <li><strong>Vehicles & Drivers</strong>: Roster directories with registration forms.</li>
                <li><strong>Trip dispatcher</strong>: Custom route planning with stage transitions (Draft → Validation → Dispatch → Complete).</li>
                <li><strong>Maintenance & Fuel</strong>: Interactive lifecycle logging and odometer updates.</li>
                <li><strong>Executive Reports</strong>: BI charts built on ApexCharts/ChartJS interfaces.</li>
                <li><strong>Administration</strong>: Role management, permission matrices, and visual toggles.</li>
              </ul>

              <p className="text-[10px] text-amber-500 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                💡 <strong>Tip for Judges:</strong> Use the floating role switcher at the bottom-right of the screen to change active session permissions on the fly.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                onClick={() => setTourOpen(false)}
                className="h-9 px-4 text-xs font-extrabold bg-primary hover:bg-primary/95 text-primary-foreground rounded-lg"
              >
                Let's Explore
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DemoBanner;
