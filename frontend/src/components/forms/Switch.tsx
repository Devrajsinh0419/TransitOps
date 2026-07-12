'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  checked?: boolean;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, checked = false, disabled, onChange, ...props }, ref) => {
    const isDisabled = disabled;

    return (
      <label
        className={cn(
          'flex items-start gap-3 select-none text-left',
          isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <div className="relative flex items-center mt-0.5 shrink-0">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={isDisabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'h-5 w-9 rounded-full bg-border transition-colors duration-200 relative flex items-center px-0.5',
              checked ? 'bg-primary' : '',
              isDisabled ? 'opacity-50' : ''
            )}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="h-4 w-4 rounded-full bg-card shadow-soft"
              style={{
                marginLeft: checked ? 'auto' : '0px',
              }}
            />
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

Switch.displayName = 'Switch';
export default Switch;
