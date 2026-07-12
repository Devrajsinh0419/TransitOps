'use client';

import React from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { AuthSuccess } from '@/components/auth/AuthSuccess';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/ui/Button';
import { useForgotPassword } from '@/hooks/useForgotPassword';

export default function ForgotPasswordPage() {
  const { form, onSubmit, isLoading, error, isSuccess } = useForgotPassword();
  const { register, formState: { errors } } = form;

  if (isSuccess) {
    return (
      <AuthCard>
        <AuthSuccess
          title="Check your inbox"
          message="We have sent password recovery instructions to the specified email address if it is registered in our database."
          redirectUrl="/login"
          actionText="Back to Login"
        />
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Forgot Password"
        subtitle="Regain access to your TransitOps account by resetting your password"
      />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Email Address */}
        <FormField
          label="Email Address"
          required
          error={errors.email?.message}
        >
          <Input
            type="email"
            placeholder="name@company.com"
            disabled={isLoading}
            error={!!errors.email}
            {...register('email')}
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
          loadingText="Sending request..."
          disabled={isLoading}
          className="cursor-pointer font-bold mt-2"
        >
          Request Reset Link
        </Button>
      </form>

      <AuthFooter
        message="Remember your credentials?"
        linkText="Sign in instead"
        linkHref="/login"
      />
    </AuthCard>
  );
}
