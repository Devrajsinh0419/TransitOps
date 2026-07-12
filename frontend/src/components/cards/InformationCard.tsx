import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface InfoField {
  label: string;
  value: React.ReactNode;
}

export interface InformationCardProps {
  title: string;
  fields: InfoField[];
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function InformationCard({ title, fields, actions, footer, className }: InformationCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
      </CardHeader>

      <CardBody>
        <div className="grid gap-4 grid-cols-2">
          {fields.map((field, idx) => (
            <div key={idx} className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest truncate">
                {field.label}
              </span>
              <span className="text-xs font-semibold text-foreground truncate">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default InformationCard;
