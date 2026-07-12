'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { Wrench, CheckCircle, AlertTriangle, XCircle, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaintenanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'approve' | 'start' | 'complete' | 'cancel' | null;
  onConfirm: (data?: any) => void;
  isLoading?: boolean;
  vehicleRegistration?: string;
}

export function MaintenanceDialog({
  isOpen,
  onClose,
  type,
  onConfirm,
  isLoading = false,
  vehicleRegistration = 'TRK-UNKNOWN',
}: MaintenanceDialogProps) {
  const [odometer, setOdometer] = React.useState('');
  const [cancelNotes, setCancelNotes] = React.useState('');

  if (!isOpen || !type) return null;

  const getDialogDetails = () => {
    switch (type) {
      case 'approve':
        return {
          title: 'Approve Maintenance Order',
          description: `This will approve the scheduled work order. The assigned vehicle ${vehicleRegistration} will transition to 'In Shop' status (maintenance hold).`,
          confirmText: 'Approve Work Order',
          confirmVariant: 'primary' as const,
          color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
          icon: CheckCircle,
        };
      case 'start':
        return {
          title: 'Start Service Work',
          description: `Confirm starting the maintenance teardown. The vehicle status remains locked in maintenance.`,
          confirmText: 'Start Teardown',
          confirmVariant: 'primary' as const,
          color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
          icon: Play,
        };
      case 'complete':
        return {
          title: 'Complete Maintenance Order',
          description: `Mark the maintenance work order as completed. The vehicle status will return to 'Available' for dispatch.`,
          confirmText: 'Complete & Checkout',
          confirmVariant: 'success' as const,
          color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
          icon: Wrench,
        };
      case 'cancel':
        return {
          title: 'Cancel Maintenance Order',
          description: `Provide reasons to cancel this scheduled fleet work ticket. Vehicle returns to 'Available' status.`,
          confirmText: 'Cancel Work Order',
          confirmVariant: 'destructive' as const,
          color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
          icon: XCircle,
        };
    }
  };

  const { title, description, confirmText, confirmVariant, color, icon: Icon } = getDialogDetails();

  const handleConfirm = () => {
    if (type === 'complete') {
      onConfirm({ odometer: odometer ? parseInt(odometer, 10) : undefined });
    } else if (type === 'cancel') {
      onConfirm({ notes: cancelNotes });
    } else {
      onConfirm();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-md p-6 border border-border/80 bg-card rounded-2xl shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl border ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-black text-foreground">{title}</h3>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed text-left">{description}</p>

          {/* Form details based on type */}
          {type === 'complete' && (
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Final Checkout Odometer (mi)
              </label>
              <Input
                type="number"
                placeholder="e.g. 14350"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="h-9 text-xs rounded-lg border-border/60"
              />
            </div>
          )}

          {type === 'cancel' && (
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Cancellation Notes
              </label>
              <textarea
                rows={2}
                placeholder="Provide details for cancelling this ticket..."
                value={cancelNotes}
                onChange={(e) => setCancelNotes(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-9 text-xs rounded-lg border-border/60"
              disabled={isLoading}
            >
              Go Back
            </Button>
            <Button
              type="button"
              variant={confirmVariant}
              size="sm"
              onClick={handleConfirm}
              isLoading={isLoading}
              disabled={isLoading}
              className="h-9 text-xs font-bold rounded-lg px-4"
            >
              {confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default MaintenanceDialog;
