import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface SummaryItem {
  label: string;
  value: React.ReactNode;
}

export interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SummaryCard({ title, items, actions, footer, className }: SummaryCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
      </CardHeader>

      <CardBody className="p-0">
        <div className="divide-y divide-border/50">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-5 py-3 text-xs">
              <span className="font-semibold text-muted-foreground uppercase tracking-wider select-none">
                {item.label}
              </span>
              <span className="font-bold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default SummaryCard;
