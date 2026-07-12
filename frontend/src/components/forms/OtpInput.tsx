'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  className?: string;
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error = false,
  success = false,
  className,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Sync state if value changes from outside
  useEffect(() => {
    const valDigits = value.split('').slice(0, length);
    const newDigits = [...valDigits, ...Array(length - valDigits.length).fill('')];
    setDigits(newDigits);
  }, [value, length]);

  const handleChange = (index: number, val: string) => {
    const newDigits = [...digits];
    // Keep only the last character entered
    const inputVal = val.slice(-1);
    newDigits[index] = inputVal;
    setDigits(newDigits);
    onChange(newDigits.join(''));

    // Move focus to next input if filled
    if (inputVal && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={cn('flex items-center gap-2 select-none justify-center', className)}>
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            disabled={disabled}
            value={digits[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              'h-11 w-11 rounded-lg border bg-card text-center text-base font-bold text-foreground outline-none transition-all shadow-soft',
              'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary/20 focus:border-primary',
              error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : 'border-border',
              success && !error ? 'border-emerald-500 focus:ring-emerald-500/20 focus:border-emerald-500' : '',
              disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : ''
            )}
          />
        ))}
    </div>
  );
}

export default OtpInput;
