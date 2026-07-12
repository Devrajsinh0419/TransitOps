'use client';

import React from 'react';
import { Drawer } from './Drawer';
import { Button } from '../ui/Button';

export interface DetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
}

export function DetailsDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  actionButton,
}: DetailsDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={subtitle}
      size="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} className="cursor-pointer">
            Close Panel
          </Button>
          {actionButton}
        </>
      }
    >
      <div className="space-y-6">
        {children}
      </div>
    </Drawer>
  );
}

export default DetailsDrawer;
