import React from 'react';
import { Truck, Shield, ShieldCheck, MapPin, Gauge } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fleet Tracking & Telematics',
    description: 'Real-time telemetry, location streams, and state indicators.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Safety & Compliance',
    description: 'Ensure safety protocols, certifications, and compliance metrics.',
  },
  {
    icon: Gauge,
    title: 'Performance & Optimization',
    description: 'Analyze operational routes, fuel usage, and logistics grids.',
  },
];

export function AuthIllustration() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full bg-zinc-950 p-12 overflow-hidden text-white select-none">
      {/* Decorative Glow Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      {/* Top Brand Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Truck className="h-4.5 w-4.5" />
        </div>
        <span className="text-base font-bold tracking-tight uppercase">TransitOps</span>
      </div>

      {/* Middle Tagline and Features list */}
      <div className="relative z-10 space-y-10 my-auto">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-primary">
            SaaS Fleet ERP
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-md">
            The control center for global logistics operations.
          </h1>
        </div>

        <div className="space-y-6 max-w-sm">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex gap-4 items-start">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-primary/80">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-zinc-100">{feat.title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer legalities */}
      <div className="relative z-10 text-[10px] text-zinc-500 font-semibold flex items-center justify-between">
        <span>© 2026 TransitOps, Inc. All rights reserved.</span>
        <div className="flex gap-4">
          <span className="hover:text-zinc-400 cursor-pointer">Terms</span>
          <span className="hover:text-zinc-400 cursor-pointer">Privacy</span>
        </div>
      </div>
    </div>
  );
}

export default AuthIllustration;
