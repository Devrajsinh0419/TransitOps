import React from 'react';
import { cn } from '@/lib/utils';

export interface PageDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function PageDescription({ children, className, ...props }: PageDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-muted-foreground leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export default PageDescription;
