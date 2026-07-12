import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface DashboardCardProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, subtitle, actions, footer, children, className }: DashboardCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </CardHeader>
      
      <CardBody>{children}</CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default DashboardCard;
