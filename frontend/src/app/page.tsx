import React from 'react';
import Link from 'next/link';
import { Route, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      {/* Premium ambient light fields */}
      <div className="absolute top-[-30%] right-[-10%] w-[70%] h-[60%] rounded-full bg-zinc-900/40 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-zinc-900/30 blur-[150px] pointer-events-none"></div>

      {/* Header bar */}
      <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-950 shadow-soft">
            <Route className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Transit<span className="text-zinc-400 font-medium">Ops</span>
          </span>
        </div>
        <Link
          href="/login"
          className="text-xs font-semibold text-zinc-300 hover:text-zinc-100 border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 px-4.5 py-2 rounded-lg transition-all"
        >
          Sign In
        </Link>
      </header>

      {/* Main hero section */}
      <main className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center justify-center py-20 flex-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase bg-zinc-900 border border-zinc-800 rounded-full mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
          Enterprise Fleet Management
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Streamlining Logistics and<br />
          <span className="text-zinc-400 font-semibold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            Fleet Operations
          </span>
        </h1>
        
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mb-10 leading-relaxed">
          TransitOps is a modern Fleet & Transport Management ERP designed to monitor fuel logs, route scheduling, repairs compliance, and operator roster tracking.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xs sm:max-w-none">
          <Link
            href="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-200 transition-all shadow-lg shadow-white/5 cursor-pointer"
          >
            Launch Platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Feature pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-24">
          <div className="border border-zinc-900 bg-zinc-950/50 rounded-xl p-5 text-left">
            <Shield className="h-5 w-5 text-zinc-400 mb-3" />
            <h3 className="text-sm font-bold mb-1.5">Compliance Ready</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Automate maintenance schedules and operator license expiry verification.</p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950/50 rounded-xl p-5 text-left">
            <Zap className="h-5 w-5 text-zinc-400 mb-3" />
            <h3 className="text-sm font-bold mb-1.5">Instant Dispatch</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Schedule, dispatch, and track trips across your transport network.</p>
          </div>
          <div className="border border-zinc-900 bg-zinc-950/50 rounded-xl p-5 text-left">
            <TrendingUp className="h-5 w-5 text-zinc-400 mb-3" />
            <h3 className="text-sm font-bold mb-1.5">Analytical Audits</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">Monitor fuel logging and operational expenses with detailed export summaries.</p>
          </div>
        </div>
      </main>

      {/* Footer bar */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 border-t border-zinc-900 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] text-zinc-600">
          © {new Date().getFullYear()} TransitOps Inc. All rights reserved.
        </span>
        <div className="flex gap-6 text-[10px] text-zinc-500">
          <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}
