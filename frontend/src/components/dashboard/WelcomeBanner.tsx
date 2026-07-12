'use client';

import React, { useState, useEffect } from 'react';
import { authStore } from '@/store/auth.store';
import { Sparkles, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function WelcomeBanner() {
  const [user, setUser] = useState(authStore.getState().user);

  useEffect(() => {
    const unsubscribe = authStore.subscribe((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  const userName = user?.name || 'Operations Manager';

  // Greeting based on current time
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border border-primary/25 bg-zinc-950 p-6 sm:p-8 text-white select-none shadow-premium"
    >
      {/* Telemetry wave path illustration in the background */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
        <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0 80 Q 25 10, 50 60 T 100 20 L 100 100 L 0 100 Z"
            fill="url(#wave-gradient)"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/20 border border-primary/30 text-primary-foreground">
            <Sparkles className="h-3 w-3" />
            <span>Operations Status</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {greeting}, <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">{userName}</span>
          </h2>
          <p className="text-xs text-zinc-300 max-w-md leading-relaxed">
            Today&apos;s fleet performance index looks healthy. Utilization is holding steady at{' '}
            <span className="text-emerald-400 font-bold">82.5%</span>. No severe delays or cargo bottlenecks reported.
          </p>
        </div>

        {/* Quick summary stats bubble */}
        <div className="flex gap-4 sm:gap-6 shrink-0">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 sm:p-4 min-w-[110px] sm:min-w-[125px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Fleet Status</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg sm:text-xl font-extrabold">Active</span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                <TrendingUp className="h-2.5 w-2.5" /> +2%
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">94 Drivers On Duty</p>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3 sm:p-4 min-w-[110px] sm:min-w-[125px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Trips</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-lg sm:text-xl font-extrabold">38</span>
              <span className="text-[10px] text-blue-400 font-bold flex items-center">
                <ArrowUpRight className="h-2.5 w-2.5" /> +4
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1">12 in maintenance</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WelcomeBanner;
