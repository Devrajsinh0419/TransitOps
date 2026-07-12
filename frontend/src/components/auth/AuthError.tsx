import React from 'react';
import { AlertCircle, WifiOff, ShieldAlert, KeyRound, ServerCrash } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AuthErrorType =
  | 'invalid_credentials'
  | 'expired_session'
  | 'network_error'
  | 'server_unavailable'
  | 'generic';

export interface AuthErrorProps {
  type?: AuthErrorType;
  message?: string;
  className?: string;
}

const errorConfig = {
  invalid_credentials: {
    title: 'Invalid Credentials',
    description: 'The email address or password you entered is incorrect.',
    icon: KeyRound,
  },
  expired_session: {
    title: 'Session Expired',
    description: 'Your authentication session has expired. Please sign in again.',
    icon: ShieldAlert,
  },
  network_error: {
    title: 'Network Error',
    description: 'Unable to connect. Please check your internet connection status.',
    icon: WifiOff,
  },
  server_unavailable: {
    title: 'Server Unavailable',
    description: 'Our servers are currently experiencing issues. Please try again later.',
    icon: ServerCrash,
  },
  generic: {
    title: 'Authentication Error',
    description: 'An unexpected authentication error occurred. Please try again.',
    icon: AlertCircle,
  },
};

export function AuthError({ type = 'generic', message, className }: AuthErrorProps) {
  const config = errorConfig[type];
  const Icon = config.icon;
  const displayTitle = config.title;
  const displayDescription = message || config.description;

  return (
    <div
      className={cn(
        'flex items-start gap-3.5 p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 dark:bg-rose-950/15 text-rose-700 dark:text-rose-400 select-none animate-scale-in',
        className
      )}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1 text-left min-w-0 flex-1">
        <h4 className="text-xs font-bold leading-normal tracking-tight">{displayTitle}</h4>
        <p className="text-[10px] opacity-90 leading-relaxed font-medium">{displayDescription}</p>
      </div>
    </div>
  );
}

export default AuthError;
