'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IconWrapper } from './IconWrapper';

export interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function QuickActionCard({ title, description, icon, onClick, className }: QuickActionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        'text-left bg-card border border-border/80 hover:border-primary/40 rounded-xl p-5 shadow-soft hover:shadow-medium flex items-start gap-4 transition-all duration-200 w-full group cursor-pointer relative overflow-hidden',
        className
      )}
    >
      <IconWrapper variant="primary" size="md" className="group-hover:scale-105 transition-transform shrink-0">
        {icon}
      </IconWrapper>
      
      <div className="flex-1 min-w-0 pr-4">
        <h4 className="font-semibold text-foreground text-sm tracking-tight truncate group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="absolute top-4 right-4 text-muted-foreground/45 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
        <ArrowUpRight className="h-4.5 w-4.5 stroke-[2.2]" />
      </div>
    </motion.button>
  );
}

export default QuickActionCard;
