import React from 'react';
import { Card, CardBody, CardFooter } from './Card';
import { StatusDot } from '../common/StatusDot';
import { Mail, Shield, User as UserIcon } from 'lucide-react';

export interface ProfileCardProps {
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
  status?: 'success' | 'error' | 'warning' | 'info' | 'gray';
  statusLabel?: string;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function ProfileCard({
  name,
  role,
  email,
  avatarUrl,
  status = 'success',
  statusLabel = 'Active',
  actions,
  footer,
  className,
}: ProfileCardProps) {
  return (
    <Card className={className}>
      <CardBody className="flex flex-col items-center text-center p-6">
        <div className="relative mb-4">
          <div className="h-16 w-16 rounded-full bg-muted border border-border text-muted-foreground flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
            ) : (
              <UserIcon className="h-7 w-7 text-muted-foreground/80" />
            )}
          </div>
          <div className="absolute bottom-0.5 right-0.5 bg-card rounded-full p-0.5 border border-border">
            <StatusDot variant={status} pulse={status === 'success'} />
          </div>
        </div>

        <h4 className="font-bold text-foreground text-base tracking-tight">{name}</h4>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
          <Shield className="h-3 w-3 text-muted-foreground/60" />
          {role.replace('_', ' ')}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3 truncate w-full justify-center">
          <Mail className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
          <span className="truncate">{email}</span>
        </div>

        {actions && <div className="mt-5 w-full flex items-center gap-2 justify-center">{actions}</div>}
      </CardBody>

      {footer ? (
        <CardFooter>{footer}</CardFooter>
      ) : (
        <CardFooter>
          <span className="text-muted-foreground font-semibold uppercase tracking-wider text-[9px]">Duty Status</span>
          <span className="text-foreground font-bold text-[10px]">{statusLabel}</span>
        </CardFooter>
      )}
    </Card>
  );
}

export default ProfileCard;
