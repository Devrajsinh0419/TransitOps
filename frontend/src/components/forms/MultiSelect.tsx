'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  selectedValues = [],
  onChange,
  placeholder = 'Select options...',
  disabled = false,
  error = false,
  success = false,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  const selectedLabels = options.filter((opt) => selectedValues.includes(opt.value));

  return (
    <div ref={containerRef} className={cn('relative w-full text-left select-none', className)}>
      <div
        onClick={handleToggle}
        className={cn(
          'min-h-9.5 w-full flex items-center justify-between rounded-lg border bg-card px-3 py-1.5 text-sm gap-2 outline-none cursor-pointer transition-all shadow-soft',
          isOpen ? 'ring-2 ring-primary/20 border-primary' : '',
          error ? 'border-destructive' : 'border-border',
          success && !error ? 'border-emerald-500' : '',
          disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : ''
        )}
      >
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {selectedLabels.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selectedLabels.map((opt) => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-0.5 rounded-md border border-border shrink-0"
              >
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => handleRemove(opt.value, e)}
                  disabled={disabled}
                  className="hover:bg-muted hover:text-foreground text-muted-foreground/80 rounded transition-colors shrink-0 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200', isOpen ? 'rotate-180' : '')} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1.5 bg-popover text-popover-foreground border border-border rounded-lg shadow-premium overflow-hidden max-h-56 overflow-y-auto scrollbar-thin"
          >
            <div className="p-1 space-y-0.5">
              {options.map((opt) => {
                const isSelected = selectedValues.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors hover:bg-muted',
                      isSelected ? 'bg-muted/80 text-foreground' : ''
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary stroke-[2.5]" />}
                  </div>
                );
              })}
              {options.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  No options available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MultiSelect;
