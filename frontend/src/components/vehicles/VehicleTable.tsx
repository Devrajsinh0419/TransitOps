'use client';

import React from 'react';
import { Vehicle } from '@/types/vehicle';
import { VehicleStatusBadge } from './VehicleStatusBadge';
import { VehicleActions } from './VehicleActions';
import { formatCurrency } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import { Eye, Edit2, Archive, Trash2 } from 'lucide-react';

export interface VehicleTableProps {
  vehicles: Vehicle[];
  onArchive: (id: string) => void;
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

export function VehicleTable({
  vehicles,
  onArchive,
  onRestore,
  onDelete,
  onDuplicate,
}: VehicleTableProps) {
  const router = useRouter();

  const formatType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="overflow-x-auto min-w-full rounded-xl border border-border bg-card shadow-soft select-none">
      <table className="min-w-full divide-y divide-border/60 text-left">
        <thead>
          <tr className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider bg-muted/15">
            <th className="py-3 px-4">Registration</th>
            <th className="py-3 px-4">Vehicle</th>
            <th className="py-3 px-4">Model</th>
            <th className="py-3 px-4">Type</th>
            <th className="py-3 px-4">Capacity (kg)</th>
            <th className="py-3 px-4 text-right">Odometer</th>
            <th className="py-3 px-4 text-right">Purchase Cost</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Last Shop</th>
            <th className="py-3 px-4">Created</th>
            <th className="py-3 px-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40 text-xs">
          {vehicles.length === 0 ? (
            <tr>
              <td colSpan={11} className="py-12 text-center text-xs text-muted-foreground/60 font-semibold">
                No vehicles found matching current criteria.
              </td>
            </tr>
          ) : (
            vehicles.map((v) => (
              <tr
                key={v.id}
                onClick={() => router.push(`/vehicles/${v.id}`)}
                className="hover:bg-muted/20 transition-colors cursor-pointer group"
              >
                {/* 1. Registration Number */}
                <td className="py-3.5 px-4 font-extrabold text-foreground font-mono">
                  <span className="bg-muted px-2 py-0.5 border border-border rounded text-[10px]">
                    {v.registrationNumber}
                  </span>
                </td>

                {/* 2. Vehicle Name */}
                <td className="py-3.5 px-4 font-bold text-foreground truncate max-w-[150px]">
                  {v.name}
                </td>

                {/* 3. Model */}
                <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                  {v.manufacturer} {v.model}
                </td>

                {/* 4. Type */}
                <td className="py-3.5 px-4 text-muted-foreground capitalize font-semibold">
                  {formatType(v.type)}
                </td>

                {/* 5. Capacity */}
                <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                  {v.capacity.toLocaleString('en-IN')}
                </td>

                {/* 6. Odometer */}
                <td className="py-3.5 px-4 text-right text-foreground font-bold font-mono">
                  {v.currentOdometer.toLocaleString('en-IN')} km
                </td>

                {/* 7. Purchase Cost */}
                <td className="py-3.5 px-4 text-right text-foreground font-bold">
                  {formatCurrency(v.purchaseCost)}
                </td>

                {/* 8. Status Badge */}
                <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                  <VehicleStatusBadge status={v.status} />
                </td>

                {/* 9. Last Service */}
                <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                  {v.lastMaintenanceDate || 'N/A'}
                </td>

                {/* 10. Created date */}
                <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                  {v.createdDate}
                </td>

                {/* 11. Actions drop */}
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => router.push(`/vehicles/${v.id}`)}
                      className="p-1 rounded bg-muted/65 border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      title="View vehicle"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => router.push(`/vehicles/${v.id}/edit`)}
                      className="p-1 rounded bg-muted/65 border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      title="Edit vehicle"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <VehicleActions
                      vehicleId={v.id}
                      vehicleName={v.name}
                      registrationNumber={v.registrationNumber}
                      isArchived={v.archived}
                      onArchive={() => onArchive(v.id)}
                      onRestore={() => onRestore(v.id)}
                      onDelete={() => onDelete(v.id)}
                      onDuplicate={() => onDuplicate?.(v.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleTable;
