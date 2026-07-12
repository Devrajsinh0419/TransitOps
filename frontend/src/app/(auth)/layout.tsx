import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Decorative premium background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-zinc-200/40 dark:bg-zinc-900/40 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-zinc-200/40 dark:bg-zinc-900/40 blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        <div className="bg-card border border-border shadow-premium rounded-2xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
