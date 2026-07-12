'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { RememberMe } from '@/components/auth/RememberMe';
import { SocialLoginPlaceholder } from '@/components/auth/SocialLoginPlaceholder';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { Button } from '@/components/ui/Button';
import { useLogin } from '@/hooks/useLogin';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  
  const { form, onSubmit, isLoading, error, isSuccess } = useLogin();
  const { register, formState: { errors } } = form;

  // Upon successful login, redirect to dashboard or requested page
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push(redirect);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router, redirect]);

  return (
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
          disabled={isLoading || isSuccess}
          error={!!errors.email}
          {...register('email')}
        />
      </FormField>

      {/* Password */}
      <FormField
        label="Password"
        required
        error={errors.password?.message}
      >
        <PasswordInput
          placeholder="••••••••"
          disabled={isLoading || isSuccess}
          error={!!errors.password}
          {...register('password')}
        />
      </FormField>

      {/* Remember Me & Forgot Password link */}
      <div className="flex items-center justify-between py-1">
        <RememberMe
          disabled={isLoading || isSuccess}
          {...register('rememberMe')}
        />
        <Link
          href="/forgot-password"
          className="text-xs font-semibold text-primary hover:text-primary/90 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 rounded px-1"
        >
          Forgot password?
        </Link>
      </div>

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
        loadingText="Authenticating..."
        disabled={isLoading || isSuccess}
        className="cursor-pointer font-bold mt-2"
      >
        {isSuccess ? 'Redirecting...' : 'Sign In'}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader
        title="Sign in to TransitOps"
        subtitle="Access your fleet operations control center"
      />

      <Suspense fallback={
        <div className="flex items-center justify-center p-6">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <LoginForm />
      </Suspense>

      <SocialLoginPlaceholder />

      <AuthFooter
        message="New to TransitOps?"
        linkText="Contact administration for credentials"
        linkHref="#"
      />
    </AuthCard>
  );
}

