import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { IconWrapper } from '../common/IconWrapper';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function FeatureCard({ title, description, icon, actions, footer, className }: FeatureCardProps) {
  return (
    <Card className={className}>
      <CardHeader actions={actions}>
        <div className="flex items-center gap-3">
          <IconWrapper size="sm" variant="primary">
            {icon}
          </IconWrapper>
          <h4 className="font-semibold text-foreground text-sm tracking-tight">{title}</h4>
        </div>
      </CardHeader>

      <CardBody>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </CardBody>

      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export default FeatureCard;
