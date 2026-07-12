'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  position = 'right',
  size = 'md',
  children,
  footer,
}: DrawerProps) {
  // Lock scroll on background when drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isRight = position === 'right';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex overflow-hidden select-none">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
          />

          {/* Drawer Sheet Body */}
          <motion.div
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={cn(
              'absolute top-0 bottom-0 flex flex-col w-full bg-card border-border shadow-premium',
              isRight ? 'right-0 border-l' : 'left-0 border-r',
              sizeStyles[size]
            )}
          >
            {/* Header section */}
            <div className="flex items-center justify-between p-5 border-b border-border/60">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-base font-bold text-foreground tracking-tight truncate">{title}</h3>
                {description && <p className="text-xs text-muted-foreground mt-0.5 leading-normal truncate">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-popover text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Content section */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
              {children}
            </div>

            {/* Footer section */}
            {footer && (
              <div className="p-4 border-t border-border/60 bg-muted/10 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
