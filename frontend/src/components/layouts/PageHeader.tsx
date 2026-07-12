import React from 'react';
import { Breadcrumb } from '../navigation/Breadcrumb';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode; // For action buttons
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 pb-6 border-b border-border/60 mb-6 animate-fade-in">
      <Breadcrumb />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
        {children && <div className="flex items-center gap-3.5 self-start md:self-center">{children}</div>}
      </div>
    </div>
  );
}
export default PageHeader;
