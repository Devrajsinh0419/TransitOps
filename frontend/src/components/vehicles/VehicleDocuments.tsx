'use client';

import React from 'react';
import { Card } from '../cards/Card';
import { FileText, FileImage, ShieldCheck, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

export interface VehicleDocumentsProps {
  vehicleId: string;
}

export function VehicleDocuments({ vehicleId }: VehicleDocumentsProps) {
  const documents = [
    {
      name: 'Insurance Policy Certificate',
      type: 'pdf',
      expiryDate: '2026-11-05',
      size: '2.4 MB',
      icon: FileText,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    },
    {
      name: 'State Vehicle Registration Permit',
      type: 'pdf',
      expiryDate: '2026-11-05',
      size: '1.8 MB',
      icon: FileText,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    },
    {
      name: 'Annual Safety Inspection Certificate',
      type: 'jpg',
      expiryDate: '2025-06-18',
      size: '4.2 MB',
      icon: FileImage,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  const handleAction = (docName: string, action: 'view' | 'download') => {
    toast.info(`${action === 'view' ? 'Opening' : 'Downloading'} document`, {
      description: `${docName} (${action})...`,
    });
  };

  return (
    <Card className="p-5 select-none space-y-4 text-left">
      <div className="border-b border-border/60 pb-3 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold text-foreground">Registered Documents</h3>
          <p className="text-[10px] text-muted-foreground">Compliance policies and DMV permits</p>
        </div>
        <ShieldCheck className="h-4.5 w-4.5 text-primary" />
      </div>

      <div className="space-y-3">
        {documents.map((doc, idx) => {
          const Icon = doc.icon;
          return (
            <div
              key={idx}
              className="p-3 border border-border/80 bg-muted/15 rounded-xl flex items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${doc.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-foreground truncate">{doc.name}</h4>
                  <p className="text-[9px] text-muted-foreground font-semibold">
                    Expires {doc.expiryDate} • {doc.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleAction(doc.name, 'view')}
                  className="p-1 rounded bg-card border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="View attachment"
                >
                  <Eye className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleAction(doc.name, 'download')}
                  className="p-1 rounded bg-card border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Download attachment"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default VehicleDocuments;
