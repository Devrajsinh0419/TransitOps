'use client';

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, success, loading, leftIcon, rightIcon, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isSearch = type === 'search';
    
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const isDisabled = disabled || loading;

    return (
      <div className="relative w-full flex items-center">
        {/* Left Icon (e.g. Search icon for search input) */}
        {isSearch && !leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="h-4.5 w-4.5" />
          </div>
        )}
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          disabled={isDisabled}
          className={cn(
            'w-full h-9.5 rounded-lg border bg-card px-3 text-sm text-foreground placeholder-muted-foreground outline-none transition-all shadow-soft',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary',
            isSearch || leftIcon ? 'pl-9.5' : '',
            isPassword || rightIcon || loading ? 'pr-9.5' : '',
            error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border',
            success && !error ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500' : '',
            isDisabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : '',
            className
          )}
          {...props}
        />

        {/* Right loading spinner or password visibility toggle */}
        {loading ? (
          <div className="absolute right-3 flex items-center text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isDisabled}
            className="absolute right-3 flex items-center justify-center p-0.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer select-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : rightIcon ? (
          <div className="absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
