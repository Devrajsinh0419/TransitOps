'use client';

import React from 'react';
import { Modal } from './Modal';
import { Download } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ImagePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt?: string;
  title?: string;
}

export function ImagePreviewDialog({
  isOpen,
  onClose,
  imageUrl,
  imageAlt = 'Preview Image',
  title = 'Image Preview',
}: ImagePreviewDialogProps) {
  const handleDownload = () => {
    // Simple download trigger
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageAlt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} className="cursor-pointer">
            Close
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download className="h-3.5 w-3.5" />}
            className="cursor-pointer"
          >
            Download
          </Button>
        </>
      }
    >
      <div className="flex items-center justify-center bg-muted/30 rounded-lg p-2 overflow-hidden border border-border/80 max-h-[60vh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-w-full max-h-[50vh] object-contain rounded-md shadow-soft"
        />
      </div>
    </Modal>
  );
}

export default ImagePreviewDialog;
