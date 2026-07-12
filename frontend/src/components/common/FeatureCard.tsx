import React from 'react';
import { cn } from '@/lib/utils';
import { IconWrapper } from './IconWrapper';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'border border-border/80 bg-card rounded-xl p-5 shadow-soft flex flex-col gap-4 select-none',
        className
      )}
    >
      <IconWrapper variant="primary" size="md" className="shrink-0">
        {icon}
      </IconWrapper>
      <div className="space-y-1">
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
