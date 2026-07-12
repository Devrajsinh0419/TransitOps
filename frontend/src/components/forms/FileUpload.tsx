'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept,
  maxSizeMB = 5,
  disabled = false,
  error = false,
  success = false,
  className,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      alert(`File size exceeds the limit of ${maxSizeMB}MB.`);
      return;
    }
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerInput = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerInput}
      className={cn(
        'w-full flex flex-col items-center justify-center border border-dashed rounded-xl p-6 text-center transition-all cursor-pointer shadow-soft bg-card select-none',
        dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50',
        error ? 'border-destructive bg-destructive/5' : '',
        success && !error ? 'border-emerald-500 bg-emerald-500/5' : '',
        disabled ? 'opacity-50 cursor-not-allowed bg-muted/40' : '',
        className
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {selectedFile ? (
        <div className="flex items-center gap-3 w-full max-w-sm bg-muted/50 border border-border/80 p-3 rounded-lg text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <File className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-xs font-semibold text-foreground truncate">{selectedFile.name}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {(selectedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-popover text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground mb-3">
            <UploadCloud className="h-5.5 w-5.5" />
          </div>
          <h4 className="text-xs font-semibold text-foreground">
            Drag files here or <span className="text-primary hover:underline">browse</span>
          </h4>
          <p className="text-[10px] text-muted-foreground mt-1 leading-normal max-w-xs">
            Supports documents and images up to {maxSizeMB}MB
          </p>
        </>
      )}
    </div>
  );
}

export default FileUpload;
