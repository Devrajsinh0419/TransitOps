import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface AuthFooterProps {
  message: string;
  linkText: string;
  linkHref: string;
  className?: string;
}

export function AuthFooter({ message, linkText, linkHref, className }: AuthFooterProps) {
  return (
    <div className={cn('text-center text-xs text-muted-foreground select-none', className)}>
      <span>{message} </span>
      <Link
        href={linkHref}
        className="font-bold text-primary hover:text-primary/90 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded px-1"
      >
        {linkText}
      </Link>
    </div>
  );
}

export default AuthFooter;
