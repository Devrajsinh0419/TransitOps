import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

export interface SettingsCardProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ title, description, actions, footer, children, className }: SettingsCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
        {description && <p className="text-xs text-muted-foreground mt-0.5 leading-normal">{description}</p>}
      </CardHeader>

      <CardBody className="space-y-4">
        {children}
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default SettingsCard;
