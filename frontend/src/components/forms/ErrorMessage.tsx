import React from 'react';
import { cn } from '@/lib/utils';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ children, className, ...props }: ErrorMessageProps) {
  if (!children) return null;

  return (
    <p
      className={cn('text-[11px] text-destructive font-medium leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export default ErrorMessage;
