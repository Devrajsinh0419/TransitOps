'use client';

import React from 'react';
import { Modal } from './Modal';
import { Button } from '../ui/Button';
import { AlertTriangle } from 'lucide-react';

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false,
}: DeleteDialogProps) {
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
          <Button variant="destructive" size="sm" onClick={onConfirm} isLoading={isLoading} className="cursor-pointer">
            {confirmText}
          </Button>
        </>
      }
    >
      <div className="flex gap-3 items-start">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {message}
          </p>
          <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold leading-relaxed">
            Warning: This action is permanent and cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteDialog;
