'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/store/auth.store';
import { AppLoader } from '../loaders/AppLoader';

export interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const [session, setSession] = useState(authStore.getState());
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = authStore.subscribe((state) => {
      setSession(state);
    });

    if (authStore.getState().isAuthenticated) {
      router.push('/dashboard');
    } else {
      setChecking(false);
    }

    return unsubscribe;
  }, [router]);

  if (checking || session.isAuthenticated) {
    return <AppLoader message="Routing you to the dashboard..." fullPage />;
  }

  return <>{children}</>;
}

export default GuestRoute;
