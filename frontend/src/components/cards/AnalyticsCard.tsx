import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  chartPlaceholder: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AnalyticsCard({
  title,
  subtitle,
  chartPlaceholder,
  actions,
  footer,
  className,
}: AnalyticsCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </CardHeader>

      <CardBody className="flex flex-col items-center justify-center min-h-48">
        {chartPlaceholder}
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default AnalyticsCard;
