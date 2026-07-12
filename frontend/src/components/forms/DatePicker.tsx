import React, { forwardRef } from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
  success?: boolean;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, error, success, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        <input
          ref={ref}
          type="date"
          disabled={disabled}
          className={cn(
            'w-full h-9.5 rounded-lg border bg-card pl-3 pr-9 text-sm text-foreground outline-none transition-all shadow-soft cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary',
            error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border',
            success && !error ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500' : '',
            disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : '',
            className
          )}
          {...props}
        />
        <div className="absolute right-3 pointer-events-none text-muted-foreground select-none">
          <Calendar className="h-4.5 w-4.5" />
        </div>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
export default DatePicker;
