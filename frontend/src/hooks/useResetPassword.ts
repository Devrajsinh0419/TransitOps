'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordInput } from '@/validation/reset-password.schema';
import { authService } from '@/services/auth.service';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export function useResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    if (!token) {
      const tokenErr = 'Invalid reset token. Please request another email link.';
      setError(tokenErr);
      toast.error('Token Error', {
        description: tokenErr,
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resetPassword({
        token,
        password: data.password,
      });
      setIsSuccess(true);
      toast.success('Password update complete!', {
        description: response.message || 'You can now log in using your new credentials.',
      });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to reset password.';
      setError(errMsg);
      toast.error('Reset Failed', {
        description: errMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading,
    error,
    isSuccess,
  };
}

export default useResetPassword;
