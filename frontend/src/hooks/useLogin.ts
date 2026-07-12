'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/validation/login.schema';
import { authService } from '@/services/auth.service';
import { authStore } from '@/store/auth.store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);
    authStore.setLoading(true);
    authStore.setError(null);

    try {
      // Execute login API request
      const response = await authService.login(data);
      
      // Update session storage
      authStore.setSession(response.user, response.accessToken, response.refreshToken);
      setIsSuccess(true);
      toast.success('Successfully logged in!', {
        description: `Welcome back, ${response.user.name}.`,
      });
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to authenticate. Please check credentials.';
      setError(errMsg);
      authStore.setError(errMsg);
      toast.error('Authentication Failed', {
        description: errMsg,
      });
    } finally {
      setIsLoading(false);
      authStore.setLoading(false);
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

export default useLogin;
