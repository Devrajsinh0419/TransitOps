import React from 'react';
import { cn } from '@/lib/utils';
import { FieldLabel } from './FieldLabel';
import { HelperText } from './HelperText';
import { ErrorMessage } from './ErrorMessage';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  description?: string;
  error?: string;
  success?: string;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export function FormField({
  label,
  description,
  error,
  success,
  required,
  disabled,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
      {label && (
        <FieldLabel required={required} disabled={disabled}>
          {label}
        </FieldLabel>
      )}
      
      <div className="relative w-full">
        {children}
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && success && <HelperText success>{success}</HelperText>}
      {!error && !success && description && <HelperText>{description}</HelperText>}
    </div>
  );
}

export default FormField;
