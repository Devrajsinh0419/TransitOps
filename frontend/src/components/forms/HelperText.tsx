import React from 'react';
import { cn } from '@/lib/utils';

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  success?: boolean;
}

export function HelperText({ children, success, className, ...props }: HelperTextProps) {
  if (!children) return null;

  return (
    <p
      className={cn(
        'text-[11px] text-muted-foreground leading-relaxed',
        success ? 'text-emerald-600 dark:text-emerald-400 font-medium' : '',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export default HelperText;
