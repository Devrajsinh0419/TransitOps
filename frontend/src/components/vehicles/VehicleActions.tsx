'use client';

import React, { useState } from 'react';
import { MoreHorizontal, Eye, Edit2, Copy, Archive, Trash2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';

export interface VehicleActionsProps {
  vehicleId: string;
  vehicleName: string;
  registrationNumber: string;
  isArchived?: boolean;
  onArchive: () => void;
  onRestore: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
}

export function VehicleActions({
  vehicleId,
  vehicleName,
  registrationNumber,
  isArchived = false,
  onArchive,
  onRestore,
  onDelete,
  onDuplicate,
}: VehicleActionsProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (callback: () => void) => {
    setIsOpen(false);
    callback();
  };

  return (
    <div className="relative inline-block text-left select-none">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        aria-label="Actions menu"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-premium py-1 z-30 text-left">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(() => router.push(`/vehicles/${vehicleId}`));
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-blue-500" />
              <span>View Details</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(() => router.push(`/vehicles/${vehicleId}/edit`));
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5 text-indigo-500" />
              <span>Edit Info</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(() => onDuplicate?.());
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Copy className="h-3.5 w-3.5 text-emerald-500" />
              <span>Duplicate</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(isArchived ? onRestore : onArchive);
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer border-t border-border/50"
            >
              <Archive className="h-3.5 w-3.5 text-amber-500" />
              <span>{isArchived ? 'Restore' : 'Archive'}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDelete);
              }}
              className="w-full px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5 text-rose-500" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VehicleActions;
