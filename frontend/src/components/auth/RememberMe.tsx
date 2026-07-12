'use client';

import React, { forwardRef } from 'react';
import { Checkbox } from '../forms/Checkbox';
import { FieldLabel } from '../forms/FieldLabel';

export interface RememberMeProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
}

export const RememberMe = forwardRef<HTMLInputElement, RememberMeProps>(
  ({ checked, onChange, id = 'remember-me', name = 'rememberMe' }, ref) => {
    return (
      <div className="flex items-center gap-2 select-none">
        <Checkbox
          ref={ref}
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
        <FieldLabel htmlFor={id} className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer select-none">
          Remember me
        </FieldLabel>
      </div>
    );
  }
);

RememberMe.displayName = 'RememberMe';
export default RememberMe;
