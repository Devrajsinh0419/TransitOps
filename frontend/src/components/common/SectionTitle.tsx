import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle, className, ...props }: SectionTitleProps) {
  return (
    <div className={cn('space-y-1 mb-4', className)}>
      <h3 className="text-lg font-semibold tracking-tight text-foreground" {...props}>
        {title}
      </h3>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;
