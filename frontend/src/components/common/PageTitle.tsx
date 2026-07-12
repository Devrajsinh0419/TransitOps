import React from 'react';
import { cn } from '@/lib/utils';

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function PageTitle({ children, className, ...props }: PageTitleProps) {
  return (
    <h1
      className={cn('text-2xl font-bold tracking-tight text-foreground sm:text-3xl', className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export default PageTitle;
