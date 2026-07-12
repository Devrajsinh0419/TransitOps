'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Eye, Edit3, UserMinus, UserCheck, Trash2 } from 'lucide-react';

export interface DriverActionsProps {
  driverId: string;
  driverName: string;
  isSuspended: boolean;
  onSuspend: () => void;
  onActivate: () => void;
  onDelete: () => void;
}

export function DriverActions({
  driverId,
  driverName,
  isSuspended,
  onSuspend,
  onActivate,
  onDelete,
}: DriverActionsProps) {
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
          <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-premium py-1 z-30 text-left">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(() => router.push(`/drivers/${driverId}`));
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Eye className="h-3.5 w-3.5 text-blue-500" />
              <span>View Profile</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(() => router.push(`/drivers/${driverId}/edit`));
              }}
              className="w-full px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5 text-indigo-500" />
              <span>Edit Driver</span>
            </button>

            <div className="border-t border-border/50 my-1" />

            {isSuspended ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onActivate);
                }}
                className="w-full px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Activate</span>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onSuspend);
                }}
                className="w-full px-3 py-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400 hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
              >
                <UserMinus className="h-3.5 w-3.5" />
                <span>Suspend</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDelete);
              }}
              className="w-full px-3 py-1.5 text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DriverActions;
