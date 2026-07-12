import React from 'react';
import { Logo } from '@/components/common/Logo';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6">
        <Logo />
      </div>
      <h2 className="text-xl font-bold tracking-tight text-foreground mb-1">Reset password</h2>
      <p className="text-sm text-muted-foreground mb-6">Choose a strong, secure new password for your account</p>
      
      <div className="w-full py-8 px-4 border border-dashed border-border rounded-xl bg-muted/40 text-xs font-mono text-muted-foreground mb-6">
        [Reset Password Component Placeholder]
        <div className="mt-4 text-[10px] text-left">
          • Route: /reset-password<br />
          • Actions: Verify reset token & update password
        </div>
      </div>

      <Link href="/login" className="text-sm font-medium text-primary hover:underline">
        Back to Login
      </Link>
    </div>
  );
}
