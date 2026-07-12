import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  options: RadioOption[];
  selectedValue?: string;
  horizontal?: boolean;
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, options, selectedValue, horizontal = false, error, disabled, name, onChange, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex',
          horizontal ? 'flex-row flex-wrap gap-4' : 'flex-col gap-3',
          className
        )}
      >
        {options.map((opt) => {
          const isChecked = selectedValue === opt.value;
          const isDisabled = disabled;

          return (
            <label
              key={opt.value}
              className={cn(
                'flex items-start gap-2.5 select-none text-left',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <div className="relative flex items-center mt-0.5 shrink-0">
                <input
                  ref={ref}
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={onChange}
                  className="peer sr-only"
                  {...props}
                />
                <div
                  className={cn(
                    'h-4 w-4 rounded-full border border-border bg-card transition-all flex items-center justify-center',
                    'peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
                    error ? 'border-destructive' : '',
                    isDisabled ? 'bg-muted/40' : ''
                  )}
                >
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full bg-primary scale-0 transition-transform duration-200',
                      isChecked ? 'scale-100' : ''
                    )}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold text-foreground leading-none">{opt.label}</span>
                {opt.description && (
                  <span className="text-[10px] text-muted-foreground leading-normal">{opt.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
export default Radio;
