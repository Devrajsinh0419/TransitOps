'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

export interface AuthSuccessProps {
  title: string;
  message: string;
  redirectUrl?: string;
  redirectTimerSeconds?: number;
  actionText?: string;
}

export function AuthSuccess({
  title,
  message,
  redirectUrl = '/dashboard',
  redirectTimerSeconds = 3,
  actionText = 'Continue to Dashboard',
}: AuthSuccessProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(redirectTimerSeconds);

  useEffect(() => {
    if (countdown <= 0) {
      router.push(redirectUrl);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router, redirectUrl]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 select-none p-2 animate-scale-in">
      {/* Animated Success Check Ring */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/20"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 12 }}
          className="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/15"
        >
          <Check className="h-6 w-6 stroke-[3]" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
          {message}
        </p>
      </div>

      <div className="w-full pt-2 space-y-3.5">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={() => router.push(redirectUrl)}
          className="cursor-pointer font-bold"
        >
          {actionText}
        </Button>
        <p className="text-[10px] font-semibold text-muted-foreground/60 leading-none">
          Redirecting automatically in <span className="text-foreground font-bold">{countdown}</span> seconds...
        </p>
      </div>
    </div>
  );
}

export default AuthSuccess;
