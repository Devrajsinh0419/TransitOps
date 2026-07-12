'use client';

import React from 'react';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthSuccess } from '@/components/auth/AuthSuccess';

export default function AuthSuccessPage() {
  return (
    <AuthCard>
      <AuthSuccess
        title="Authentication Successful"
        message="Your identity credentials have been successfully authenticated with TransitOps. Preparing access workspace..."
        redirectUrl="/dashboard"
        redirectTimerSeconds={3}
        actionText="Proceed to Workspace"
      />
    </AuthCard>
  );
}
