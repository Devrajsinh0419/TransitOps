import React from 'react';
import Link from 'next/link';
import { Compass, MoveRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 animate-pulse">
        <Compass className="h-8 w-8 stroke-[2]" />
      </div>
      
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-2">404</h1>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-3">Page Not Found</h2>
      
      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved to another section. 
        Verify the URL route or navigate back.
      </p>

      <Link
        href="/dashboard"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] cursor-pointer"
      >
        Return to Dashboard
        <MoveRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
