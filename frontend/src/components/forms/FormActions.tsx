import React from 'react';
import { cn } from '@/lib/utils';

export interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormActions({ children, className, ...props }: FormActionsProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-6 border-t border-border/80 mt-6 w-full select-none',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default FormActions;
