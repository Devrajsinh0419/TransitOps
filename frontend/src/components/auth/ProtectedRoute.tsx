'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authStore } from '@/store/auth.store';
import { AppLoader } from '../loaders/AppLoader';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState(authStore.getState());
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = authStore.subscribe((state) => {
      setSession(state);
    });

    // Run auth check
    if (!authStore.getState().isAuthenticated) {
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
    } else {
      setChecking(false);
    }

    return unsubscribe;
  }, [router, pathname]);

  if (checking || !session.isAuthenticated) {
    return <AppLoader message="Verifying authentication credentials..." fullPage />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
