import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  success?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, success, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full h-9.5 rounded-lg border bg-card pl-3 pr-9 text-sm text-foreground outline-none transition-all shadow-soft appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary',
            error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border',
            success && !error ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500' : '',
            disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : '',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 pointer-events-none text-muted-foreground">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
