import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const TableContainer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('w-full overflow-x-auto bg-card border border-border/80 rounded-xl shadow-soft scrollbar-thin select-none', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TableContainer.displayName = 'TableContainer';

export const Table = forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn('w-full border-collapse text-left text-sm text-foreground', className)}
        {...props}
      />
    );
  }
);
Table.displayName = 'Table';

export const THead = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn('bg-muted/40 border-b border-border/70 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none', className)}
        {...props}
      />
    );
  }
);
THead.displayName = 'THead';

export const TBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn('divide-y divide-border/60', className)} {...props} />
    );
  }
);
TBody.displayName = 'TBody';

export const TR = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn('transition-colors hover:bg-muted/30 focus-within:bg-muted/30', className)}
        {...props}
      />
    );
  }
);
TR.displayName = 'TR';

export const TH = forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn('h-11 px-5 align-middle font-bold text-muted-foreground [&:has([role=checkbox])]:pr-0', className)}
        {...props}
      />
    );
  }
);
TH.displayName = 'TH';

export const TD = forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('p-5 align-middle [&:has([role=checkbox])]:pr-0 text-xs font-medium text-foreground', className)}
        {...props}
      />
    );
  }
);
TD.displayName = 'TD';
