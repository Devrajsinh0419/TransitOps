'use client';

import React from 'react';
import Link from 'next/link';
import { FuelLog } from '@/types/fuel';
import { Button } from '../ui/Button';
import { Eye, Calendar, Fuel, MapPin, DollarSign, User, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FuelTableProps {
  logs: FuelLog[];
}

export function FuelTable({ logs }: FuelTableProps) {
  return (
    <div className="select-none text-left">
      {/* Mobile/Tablet Card Layout */}
      <div className="grid grid-cols-1 md:hidden gap-3">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="p-4 bg-card border border-border/60 rounded-xl space-y-3 relative shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-foreground">{log.fuelLogId}</span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                  <Calendar className="h-3 w-3" /> {log.date}
                </span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                  <Fuel className="h-3.5 w-3.5 text-primary" /> {log.fuelType}
                </h4>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span>{log.vehicleName} • </span>
                  <span className="font-semibold text-foreground">{log.vehicleRegistration}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-border/40 text-[10px] text-muted-foreground">
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Driver</span>
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <User className="h-3 w-3" /> {log.driverName}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Total Cost</span>
                  <span className="font-extrabold text-foreground flex items-center">
                    <DollarSign className="h-3 w-3" /> {log.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {log.fuelStation}
                </div>
                <Link href={`/fuel/${log.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-[10px] px-2.5 rounded-lg">
                    View Log
                  </Button>
                </Link>
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
                <th className="p-3">Fuel Log ID</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Driver</th>
                <th className="p-3">Fuel Type</th>
                <th className="p-3 text-right">Quantity (L)</th>
                <th className="p-3 text-right">Price per L</th>
                <th className="p-3 text-right">Total Cost</th>
                <th className="p-3 text-right">Odometer (mi)</th>
                <th className="p-3">Fuel Station</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3 align-middle font-extrabold text-foreground">
                      {log.fuelLogId}
                    </td>
                    <td className="p-3 align-middle">
                      <div className="font-bold text-foreground">{log.vehicleRegistration}</div>
                      <div className="text-[10px] text-muted-foreground">{log.vehicleName}</div>
                    </td>
                    <td className="p-3 align-middle font-semibold text-foreground">
                      {log.driverName}
                    </td>
                    <td className="p-3 align-middle font-medium text-muted-foreground/80">
                      {log.fuelType}
                    </td>
                    <td className="p-3 align-middle text-right font-semibold text-foreground">
                      {log.quantity.toLocaleString()} L
                    </td>
                    <td className="p-3 align-middle text-right text-muted-foreground">
                      ${log.pricePerLiter.toFixed(2)}
                    </td>
                    <td className="p-3 align-middle text-right font-extrabold text-foreground">
                      ${log.totalCost.toFixed(2)}
                    </td>
                    <td className="p-3 align-middle text-right font-semibold text-muted-foreground">
                      {log.odometer.toLocaleString()}
                    </td>
                    <td className="p-3 align-middle text-muted-foreground truncate max-w-[140px]" title={log.fuelStation}>
                      {log.fuelStation}
                    </td>
                    <td className="p-3 align-middle text-muted-foreground font-semibold">
                      {log.date}
                    </td>
                    <td className="p-3 align-middle text-center">
                      <Link href={`/fuel/${log.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                          aria-label="View Log"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
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

export default FuelTable;
