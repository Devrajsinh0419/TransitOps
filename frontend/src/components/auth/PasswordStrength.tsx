'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PasswordStrengthProps {
  value: string;
}

interface Rule {
  label: string;
  test: (val: string) => boolean;
}

const rules: Rule[] = [
  { label: 'Minimum 8 characters', test: (val) => val.length >= 8 },
  { label: 'At least one uppercase letter', test: (val) => /[A-Z]/.test(val) },
  { label: 'At least one lowercase letter', test: (val) => /[a-z]/.test(val) },
  { label: 'At least one number', test: (val) => /[0-9]/.test(val) },
  { label: 'At least one special character', test: (val) => /[^A-Za-z0-9]/.test(val) },
];

export function PasswordStrength({ value = '' }: PasswordStrengthProps) {
  const metCount = rules.filter((rule) => rule.test(value)).length;
  
  // Calculate percentage of rules met
  const percentage = (metCount / rules.length) * 100;
  
  // Define bar color based on metCount
  let barColor = 'bg-border';
  let strengthText = 'Weak';
  if (value.length > 0) {
    if (metCount <= 2) {
      barColor = 'bg-rose-500';
      strengthText = 'Weak';
    } else if (metCount <= 4) {
      barColor = 'bg-amber-500';
      strengthText = 'Medium';
    } else {
      barColor = 'bg-emerald-500';
      strengthText = 'Strong';
    }
  }

  return (
    <div className="space-y-3.5 select-none w-full text-xs">
      {/* Visual Bar Indicator */}
      {value.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>Strength</span>
            <span className={cn(
              metCount <= 2 ? 'text-rose-500' : metCount <= 4 ? 'text-amber-500' : 'text-emerald-500'
            )}>
              {strengthText}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-300', barColor)}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Rules Checklist */}
      <div className="space-y-2">
        {rules.map((rule, idx) => {
          const isMet = rule.test(value);
          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-2 transition-colors',
                isMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
              )}
            >
              <div className={cn(
                'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                isMet ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-border/60 bg-muted/30'
              )}>
                {isMet ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5 text-muted-foreground/45" />}
              </div>
              <span className="text-[11px] font-medium leading-none">{rule.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PasswordStrength;
