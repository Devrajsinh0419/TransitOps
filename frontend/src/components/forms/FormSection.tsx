import React from 'react';
import { cn } from '@/lib/utils';
import { SectionTitle } from '../common/SectionTitle';
import { Separator } from '../common/Separator';

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children, className, ...props }: FormSectionProps) {
  return (
    <section className={cn('space-y-4 py-4 first:pt-0 last:pb-0', className)} {...props}>
      <div className="flex flex-col gap-1">
        <SectionTitle title={title} className="mb-0" />
        {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      <Separator />
      <div className="grid gap-5 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

export default FormSection;
