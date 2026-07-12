import React from 'react';
import { Loader2 } from 'lucide-react';

interface AppLoaderProps {
  message?: string;
  fullPage?: boolean;
}

export function AppLoader({ message = 'Loading TransitOps...', fullPage = false }: AppLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-6 ${
        fullPage ? 'fixed inset-0 z-50 bg-background/80 backdrop-blur-md' : 'w-full h-48'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-full bg-primary/20 blur-sm animate-pulse"></div>
        <Loader2 className="h-10 w-10 animate-spin text-primary relative" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-fade-in">{message}</p>
    </div>
  );
}
export default AppLoader;
