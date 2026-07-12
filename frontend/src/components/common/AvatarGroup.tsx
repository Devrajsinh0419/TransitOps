import React from 'react';
import { cn } from '@/lib/utils';
import { User as UserIcon } from 'lucide-react';

export interface AvatarItem {
  src?: string;
  name: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: AvatarItem[];
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-6 w-6 text-[10px] -space-x-1.5',
  md: 'h-8.5 w-8.5 text-xs -space-x-2.5',
  lg: 'h-10 w-10 text-sm -space-x-3.5',
};

const itemSizes = {
  sm: 'h-6 w-6 border-[1.5px]',
  md: 'h-8.5 w-8.5 border-2',
  lg: 'h-10 w-10 border-2',
};

export function AvatarGroup({ avatars, max = 4, size = 'md', className, ...props }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div
      className={cn(
        'flex items-center isolate',
        size === 'sm' ? '-space-x-1.5' : size === 'md' ? '-space-x-2.5' : '-space-x-3.5',
        className
      )}
      {...props}
    >
      {visibleAvatars.map((avatar, idx) => (
        <div
          key={idx}
          className={cn(
            'relative inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground border-card overflow-hidden ring-offset-background transition-transform hover:-translate-y-0.5 hover:z-10 focus-visible:z-10 cursor-default select-none shrink-0',
            itemSizes[size]
          )}
          title={avatar.name}
        >
          {avatar.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar.src} alt={avatar.name} className="h-full w-full object-cover" />
          ) : (
            <UserIcon className={cn('shrink-0 text-muted-foreground/80', size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />
          )}
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            'relative inline-flex items-center justify-center rounded-full bg-secondary border-card overflow-hidden font-semibold text-secondary-foreground select-none shrink-0',
            itemSizes[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
