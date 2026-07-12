'use client';

import React, { forwardRef } from 'react';
import { Input, InputProps } from '../forms/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  label?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        type="password"
        className={className}
        {...props}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
