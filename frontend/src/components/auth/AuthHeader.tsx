import React from 'react';
import { AuthLogo } from './AuthLogo';

export interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function AuthHeader({ title, subtitle, showLogo = true }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-4 select-none">
      {showLogo && <AuthLogo />}
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">{subtitle}</p>}
      </div>
    </div>
  );
}

export default AuthHeader;
