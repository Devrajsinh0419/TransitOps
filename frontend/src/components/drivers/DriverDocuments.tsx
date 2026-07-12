'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { Button } from '../ui/Button';
import { Driver } from '@/types/driver';
import { FileText, Download, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';

export interface DriverDocumentsProps {
  driver: Driver;
}

export function DriverDocuments({ driver }: DriverDocumentsProps) {
  const documentsList = [
    {
      name: 'Profile Photo Scan',
      type: 'Image (JPG)',
      fileName: driver.avatarUrl ? 'profile-avatar.jpg' : 'No photo uploaded',
      uploaded: !!driver.avatarUrl,
    },
    {
      name: 'Commercial Driver License (CDL)',
      type: 'Document (PDF)',
      fileName: driver.licenseNumber ? `cdl_${driver.licenseNumber}.pdf` : 'No file uploaded',
      uploaded: !!driver.licenseNumber,
    },
    {
      name: 'DOT Medical Certificate',
      type: 'Document (PDF)',
      fileName: 'medical_fit_clearance.pdf',
      uploaded: true,
    },
    {
      name: 'National Identity Proof (SSN / ID)',
      type: 'Document (PDF)',
      fileName: 'identity_ssn_verification.pdf',
      uploaded: true,
    },
  ];

  const handleDownload = (docName: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: `Downloading ${docName}...`,
        success: `${docName} downloaded successfully!`,
        error: 'Failed to download file.',
      }
    );
  };

  return (
    <Card className="p-5 border-border/50 text-left">
      <div className="border-b border-border/60 pb-3 mb-5">
        <h3 className="text-sm font-bold text-foreground">Compliance Attachments</h3>
        <p className="text-[10px] text-muted-foreground">Digital files, scans and certificates verified by administrators</p>
      </div>

      <div className="space-y-4 pt-1">
        {documentsList.map((doc, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 border border-border/60 rounded-xl hover:border-border transition-colors gap-3 bg-muted/5"
          >
            <div className="flex gap-3 items-start min-w-0">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                doc.uploaded 
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                  : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
              }`}>
                <FileText className="h-4 w-4" />
              </span>
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">{doc.name}</h4>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {doc.type} • <span className="font-mono">{doc.fileName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center">
              {doc.uploaded ? (
                <>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info('Opening preview window...')}
                      className="h-8 w-8 p-0 flex items-center justify-center border border-border/60 text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                      className="h-8 w-8 p-0 flex items-center justify-center border border-border/60 text-muted-foreground hover:text-foreground"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                    <AlertCircle className="h-3 w-3" />
                    Missing
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('Opening document upload portal...')}
                    className="h-8 text-xs font-bold border-border/60"
                  >
                    Upload File
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default DriverDocuments;
