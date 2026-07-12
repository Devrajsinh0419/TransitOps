'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Input } from './Input';

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  className?: string;
}

export function Autocomplete({
  options,
  selectedValue,
  onChange,
  placeholder = 'Search or select...',
  disabled = false,
  error = false,
  success = false,
  className,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Set initial query based on selectedValue
  useEffect(() => {
    const matched = options.find((o) => o.value === selectedValue);
    setQuery(matched ? matched.label : '');
  }, [selectedValue, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset query text to match selected value
        const matched = options.find((o) => o.value === selectedValue);
        setQuery(matched ? matched.label : '');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedValue, options]);

  const handleSelect = (option: AutocompleteOption) => {
    onChange(option.value);
    setQuery(option.label);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const filteredOptions = query === ''
    ? options
    : options.filter((opt) =>
        opt.label.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div ref={containerRef} className={cn('relative w-full text-left select-none', className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        error={error}
        success={success}
        leftIcon={<Search className="h-4 w-4 text-muted-foreground" />}
        rightIcon={
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-transform duration-200 cursor-pointer',
              isOpen ? 'rotate-180' : ''
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
          />
        }
      />

      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-50 w-full mt-1.5 bg-popover text-popover-foreground border border-border rounded-lg shadow-premium overflow-hidden max-h-48 overflow-y-auto scrollbar-thin"
          >
            <div className="p-1 space-y-0.5">
              {filteredOptions.map((opt) => {
                const isSelected = selectedValue === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt)}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Autocomplete;
