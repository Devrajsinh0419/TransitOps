'use client';

import React from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthSuccess } from '@/components/auth/AuthSuccess';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { PasswordStrength } from '@/components/auth/PasswordStrength';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { useResetPassword } from '@/hooks/useResetPassword';

export default function ResetPasswordPage() {
  const { form, onSubmit, isLoading, error, isSuccess } = useResetPassword();
  const { register, watch, formState: { errors } } = form;

  const newPasswordValue = watch('password') || '';

  if (isSuccess) {
    return (
      <AuthCard>
        <AuthSuccess
          title="Password Updated"
          message="Your new password has been successfully configured. You can now use it to sign in."
          redirectUrl="/login"
          actionText="Proceed to Sign In"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Reset Password"
        subtitle="Configure a secure new password for your TransitOps account"
      />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* New Password */}
        <FormField
          label="New Password"
          required
          error={errors.password?.message}
        >
          <PasswordInput
            placeholder="••••••••"
            disabled={isLoading}
            error={!!errors.password}
            {...register('password')}
          />
        </FormField>

        {/* Password Strength Checklist */}
        <div className="py-1">
          <PasswordStrength value={newPasswordValue} />
        </div>

        {/* Confirm Password */}
        <FormField
          label="Confirm Password"
          required
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            placeholder="••••••••"
            disabled={isLoading}
            error={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
        </FormField>

        {/* Error message card if request failed */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium text-left">
            {error}
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          isLoading={isLoading}
          loadingText="Updating password..."
          disabled={isLoading}
          className="cursor-pointer font-bold mt-2"
        >
          Update Password
        </Button>
      </form>

      <AuthFooter
        message="Want to cancel password update?"
        linkText="Sign in instead"
        linkHref="/login"
      />
    </AuthCard>
  );
}
