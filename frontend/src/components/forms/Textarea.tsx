import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  success?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, success, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full min-h-20 rounded-lg border bg-card p-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all shadow-soft resize-y',
          'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary',
          error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border',
          success && !error ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500' : '',
          disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : '',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
