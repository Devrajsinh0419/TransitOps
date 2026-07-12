'use client';

import React from 'react';
import { AppLoader } from '@/components/loaders/AppLoader';

export default function GlobalLoading() {
  return <AppLoader fullPage message="Loading TransitOps Platform..." />;
}
