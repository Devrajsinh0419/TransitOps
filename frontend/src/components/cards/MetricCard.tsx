import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface MetricCardProps {
  title: string;
  metric: string | number;
  subtext?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, metric, subtext, actions, footer, className }: MetricCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      </CardHeader>

      <CardBody>
        <span className="text-3xl font-extrabold tracking-tight text-foreground block">
          {metric}
        </span>
        {subtext && (
          <span className="text-xs text-muted-foreground mt-1.5 block leading-normal">
            {subtext}
          </span>
        )}
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default MetricCard;
