import React from 'react';
import { cn } from '@/lib/utils';
import { RequiredIndicator } from './RequiredIndicator';

export interface FieldLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export function FieldLabel({ children, required, disabled, className, ...props }: FieldLabelProps) {
  if (!children) return null;

  return (
    <label
      className={cn(
        'text-xs font-semibold text-foreground tracking-tight select-none',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      {...props}
    >
      {children}
      {required && <RequiredIndicator />}
    </label>
  );
}

export default FieldLabel;
