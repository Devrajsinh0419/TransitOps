import React from 'react';
import { AuthIllustration } from '@/components/auth/AuthIllustration';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-background relative overflow-hidden">
      {/* Left side: Brand Illustration (45% width on large screens, hidden on mobile/tablet) */}
      <div className="hidden lg:block lg:w-[45%] border-r border-border/80 h-screen sticky top-0">
        <AuthIllustration />
      </div>

      {/* Right side: Authentication forms viewport (55% width on large screens, full width on smaller screens) */}
      <div className="w-full lg:w-[55%] min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-zinc-50/50 dark:bg-zinc-950/20 relative">
        {/* Glow backdrop circles */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vh] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
