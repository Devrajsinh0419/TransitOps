'use client';

import React from 'react';
import { Drawer } from './Drawer';
import { Button } from '../ui/Button';

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

export function FilterDrawer({ isOpen, onClose, onApply, onReset, children }: FilterDrawerProps) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Filter Records"
      description="Refine lists using targeted filter attributes"
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onReset} className="cursor-pointer">
            Reset All
          </Button>
          <Button variant="primary" size="sm" onClick={onApply} className="cursor-pointer">
            Apply Filters
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {children}
      </div>
    </Drawer>
  );
}

export default FilterDrawer;
