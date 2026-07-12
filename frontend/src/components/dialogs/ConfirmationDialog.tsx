'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}: ConfirmationDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isLoading} className="cursor-pointer">
            {cancelText}
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm} isLoading={isLoading} className="cursor-pointer">
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-xs text-muted-foreground leading-relaxed">
        {message}
      </p>
    </Modal>
  );
}

export default ConfirmationDialog;
