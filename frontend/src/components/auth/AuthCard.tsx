'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'w-full max-w-[420px] bg-card border border-border/80 rounded-2xl shadow-premium p-6 sm:p-8 space-y-6 select-none',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export default AuthCard;
