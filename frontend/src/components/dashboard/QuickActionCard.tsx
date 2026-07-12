'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../cards/Card';
import { cn } from '@/lib/utils';

export interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  onClick,
  className,
  iconClassName,
}: QuickActionCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'p-4 select-none hover:shadow-md hover:border-primary/40 cursor-pointer transition-all duration-300 group flex items-start gap-4',
        className
      )}
    >
      <div className={cn(
        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform duration-300',
        iconClassName
      )}>
        <Icon className="h-5.5 w-5.5" />
      </div>
      <div className="space-y-1 text-left min-w-0">
        <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
          {title}
        </h4>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default QuickActionCard;
