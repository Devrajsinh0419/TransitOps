import React, { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, disabled, checked, ...props }, ref) => {
    return (
      <label
        className={cn(
          'flex items-start gap-2.5 select-none text-left',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <div className="relative flex items-center mt-0.5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-4 w-4 rounded border border-border bg-card transition-all flex items-center justify-center',
              'peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
              error ? 'border-destructive' : '',
              disabled ? 'bg-muted/40' : ''
            )}
          >
            <Check className="h-3 w-3 text-primary-foreground stroke-[3] hidden peer-checked:block" />
          </div>
        </div>
        
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && <span className="text-xs font-semibold text-foreground leading-none">{label}</span>}
            {description && <span className="text-[10px] text-muted-foreground leading-normal">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
