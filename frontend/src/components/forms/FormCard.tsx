import React from 'react';
import { cn } from '@/lib/utils';
import { ContentContainer } from '../common/ContentContainer';

export interface FormCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FormCard({ children, className, ...props }: FormCardProps) {
  return (
    <ContentContainer className={cn('max-w-3xl mx-auto shadow-medium border-border/60', className)} {...props}>
      {children}
    </ContentContainer>
  );
}

export default FormCard;
