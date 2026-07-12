'use client';

import React from 'react';
import Link from 'next/link';
import { MaintenanceRecord } from '@/types/maintenance';
import { MaintenanceStatusBadge } from './MaintenanceStatusBadge';
import { MaintenancePriorityBadge } from './MaintenancePriorityBadge';
import { Button } from '../ui/Button';
import {
  Eye,
  Edit2,
  Trash2,
  Calendar,
  Wrench,
  Clock,
  DollarSign,
  User,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
  onDelete: (id: string) => void;
}

export function MaintenanceTable({ records, onDelete }: MaintenanceTableProps) {
  return (
    <div className="select-none text-left">
      {/* Mobile/Tablet Card Layout */}
      <div className="grid grid-cols-1 md:hidden gap-3">
        <AnimatePresence mode="popLayout">
          {records.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-card border border-border/60 rounded-xl space-y-3 relative shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-foreground">{m.maintenanceId}</span>
                <MaintenanceStatusBadge status={m.status} />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{m.issueTitle}</h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Wrench className="h-3 w-3 text-muted-foreground/80" />
                  <span>{m.vehicleName} • </span>
                  <span className="font-semibold text-foreground">{m.vehicleRegistration}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-border/40 text-[10px] text-muted-foreground">
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Technician</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <User className="h-3 w-3" /> {m.technicianName}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Estimated Cost</span>
                  <span className="font-extrabold text-foreground flex items-center">
                    <DollarSign className="h-3 w-3" /> {m.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <MaintenancePriorityBadge priority={m.priority} />
                <div className="flex items-center gap-1.5">
                  <Link href={`/maintenance/${m.id}`}>
                    <Button variant="outline" size="sm" className="h-8 text-[10px] px-2.5 rounded-lg">
                      View Profile
                    </Button>
                  </Link>
                  <Link href={`/maintenance/${m.id}/edit`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg p-0 flex items-center justify-center">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(m.id)}
                    className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                <th className="p-3">Ticket Info</th>
                <th className="p-3">Vehicle Details</th>
                <th className="p-3">Type</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Technician / Shop</th>
                <th className="p-3 text-right">Cost Estimate</th>
                <th className="p-3">Schedule Dates</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {records.map((m) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    {/* Ticket Info */}
                    <td className="p-3 align-middle max-w-[200px]">
                      <div className="font-extrabold text-foreground">{m.maintenanceId}</div>
                      <div className="font-semibold text-muted-foreground truncate max-w-[170px]" title={m.issueTitle}>
                        {m.issueTitle}
                      </div>
                    </td>

                    {/* Vehicle Details */}
                    <td className="p-3 align-middle">
                      <div className="font-bold text-foreground">{m.vehicleRegistration}</div>
                      <div className="text-[10px] text-muted-foreground">{m.vehicleName}</div>
                    </td>

                    {/* Type */}
                    <td className="p-3 align-middle uppercase font-bold text-[10px] text-muted-foreground/80">
                      {m.type}
                    </td>

                    {/* Priority */}
                    <td className="p-3 align-middle">
                      <MaintenancePriorityBadge priority={m.priority} />
                    </td>

                    {/* Status */}
                    <td className="p-3 align-middle">
                      <MaintenanceStatusBadge status={m.status} />
                    </td>

                    {/* Technician / Shop */}
                    <td className="p-3 align-middle">
                      <div className="font-semibold text-foreground">{m.technicianName}</div>
                      <div className="text-[10px] text-muted-foreground">{m.workshop}</div>
                    </td>

                    {/* Cost Estimate */}
                    <td className="p-3 align-middle text-right font-extrabold text-foreground">
                      ${m.totalCost.toLocaleString()}
                    </td>

                    {/* Schedule Dates */}
                    <td className="p-3 align-middle">
                      <div className="font-semibold text-foreground">{m.scheduledDate}</div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {m.estimatedDuration}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3 align-middle text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/maintenance/${m.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                            aria-label="View Profile"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/maintenance/${m.id}/edit`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                            aria-label="Edit Record"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(m.id)}
                          className="h-7 w-7 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                          aria-label="Delete Record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceTable;
