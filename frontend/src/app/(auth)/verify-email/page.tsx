'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Mail, Loader2, ArrowRight, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthFooter } from '@/components/auth/AuthFooter';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verifying, setVerifying] = useState(!!token);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Countdown timer for resending email
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  useEffect(() => {
    async function verify() {
      if (!token) return;
      try {
        await authService.verifyEmail(token);
        setSuccess(true);
        toast.success('Email verified successfully!', {
          description: 'You can now sign in to your TransitOps account.',
        });
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Verification failed. The token may be expired.');
        toast.error('Verification Failed', {
          description: 'Please request a new verification link.',
        });
      } finally {
        setVerifying(false);
      }
    }
    verify();
  }, [token]);

  const handleResend = async () => {
    setResending(true);
    try {
      // Mock calling a resend link endpoint (or send verification endpoint)
      toast.success('Verification link resent!', {
        description: 'Please check your inbox for the confirmation email.',
      });
      setResendCountdown(60); // 60 seconds throttle
    } catch (err: any) {
      toast.error('Resend Failed', {
        description: err.message || 'Please try again later.',
      });
    } finally {
      setResending(false);
    }
  };

  // 1. Loading/Verifying state
  if (verifying) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center justify-center text-center py-6 space-y-6 select-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-foreground">Verifying email address</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Please wait while we confirm your activation token with the security server...
            </p>
          </div>
        </div>
      </AuthCard>
    );
  }

  // 2. Success verification state
  if (success) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-6 select-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-7.5 w-7.5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-foreground">Account Activated!</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Thank you. Your email address has been successfully verified. You can now sign in to TransitOps.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => router.push('/login')}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="cursor-pointer font-bold"
          >
            Go to Login
          </Button>
        </div>
      </AuthCard>
    );
  }

  // 3. Error verification state
  if (error) {
    return (
      <AuthCard>
        <div className="flex flex-col items-center justify-center text-center py-4 space-y-6 select-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="h-7.5 w-7.5" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-foreground">Verification Failed</h3>
            <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed max-w-xs mx-auto font-medium">
              {error}
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleResend}
            disabled={resending || resendCountdown > 0}
            leftIcon={<RefreshCw className={resending ? 'animate-spin h-4 w-4' : 'h-4 w-4'} />}
            className="cursor-pointer font-bold"
          >
            {resendCountdown > 0 ? `Resend link (${resendCountdown}s)` : 'Resend Verification Link'}
          </Button>
          <AuthFooter
            message="Change your mind?"
            linkText="Sign in"
            linkHref="/login"
          />
        </div>
      </AuthCard>
    );
  }

  // 4. Default state: Verification email sent, check inbox prompt
  return (
    <AuthCard>
      <div className="flex flex-col items-center justify-center text-center py-4 space-y-6 select-none">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
          <Mail className="h-7.5 w-7.5" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-foreground">Verify your email</h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            We have sent an activation link to your email address. Please click it to verify your account.
          </p>
        </div>

        <div className="w-full space-y-3.5">
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleResend}
            disabled={resending || resendCountdown > 0}
            leftIcon={<RefreshCw className={resending ? 'animate-spin h-4 w-4' : 'h-4 w-4'} />}
            className="cursor-pointer font-bold text-xs"
          >
            {resendCountdown > 0 ? `Resend link (${resendCountdown}s)` : 'Resend Verification Link'}
          </Button>
        </div>

        <AuthFooter
          message="Need to sign in?"
          linkText="Go to login"
          linkHref="/login"
        />
      </div>
    </AuthCard>
  );
}
