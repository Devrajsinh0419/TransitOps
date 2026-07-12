'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, ForgotPasswordInput } from '@/validation/forgot-password.schema';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.forgotPassword(data.email);
      setIsSuccess(true);
      toast.success('Reset link dispatched!', {
        description: response.message || 'If an account exists, a link was sent to your email.',
      });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to request reset link.';
      setError(errMsg);
      toast.error('Request Failed', {
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

export default useForgotPassword;
