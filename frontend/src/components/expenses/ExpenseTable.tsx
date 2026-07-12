'use client';

import React from 'react';
import Link from 'next/link';
import { ExpenseRecord } from '@/types/expense';
import { ExpenseStatusBadge } from './ExpenseStatusBadge';
import { Button } from '../ui/Button';
import { Eye, Trash2, Calendar, CreditCard, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, formatDate } from '@/lib/helpers';

interface ExpenseTableProps {
  expenses: ExpenseRecord[];
  onDelete: (id: string) => void;
}

export function ExpenseTable({ expenses, onDelete }: ExpenseTableProps) {
  return (
    <div className="select-none text-left">
      {/* Mobile/Tablet Card Layout */}
      <div className="grid grid-cols-1 md:hidden gap-3">
        <AnimatePresence mode="popLayout">
          {expenses.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="p-4 bg-card border border-border/60 rounded-xl space-y-3 relative shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-foreground">{exp.expenseId}</span>
                <ExpenseStatusBadge status={exp.status} />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-primary" />
                  <span className="capitalize">{exp.expenseType}</span>
                </h4>
                {exp.vehicleRegistration && (
                  <p className="text-[10px] text-muted-foreground">
                    Vehicle: <span className="font-semibold text-foreground">{exp.vehicleRegistration}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-border/40 text-[10px] text-muted-foreground">
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Vendor / Invoice</span>
                  <span className="font-semibold text-foreground truncate block">
                    {exp.vendor}
                  </span>
                </div>
                <div>
                  <span className="block text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">Total Cost</span>
                  <span className="font-extrabold text-foreground flex items-center">
                    {formatCurrency(exp.amount)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="text-[9px] text-muted-foreground flex items-center gap-1 font-semibold">
                  <Calendar className="h-3 w-3" /> {formatDate(exp.date)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Link href={`/expenses/${exp.id}`}>
                    <Button variant="outline" size="sm" className="h-8 text-[10px] px-2.5 rounded-lg">
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(exp.id)}
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
                <th className="p-3">Expense ID</th>
                <th className="p-3">Expense Type</th>
                <th className="p-3">Related Asset</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Vendor / Invoice</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {expenses.map((exp) => (
                  <motion.tr
                    key={exp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3 align-middle font-extrabold text-foreground">
                      {exp.expenseId}
                    </td>
                    <td className="p-3 align-middle font-bold text-foreground capitalize">
                      {exp.expenseType}
                    </td>
                    <td className="p-3 align-middle">
                      {exp.vehicleRegistration ? (
                        <>
                          <div className="font-bold text-foreground">{exp.vehicleRegistration}</div>
                          {exp.vehicleName && <div className="text-[10px] text-muted-foreground">{exp.vehicleName}</div>}
                        </>
                      ) : (
                        <span className="text-muted-foreground/60 italic">N/A</span>
                      )}
                    </td>
                    <td className="p-3 align-middle text-right font-extrabold text-foreground">
                      {formatCurrency(exp.amount)}
                    </td>
                    <td className="p-3 align-middle">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CreditCard className="h-3.5 w-3.5 text-muted-foreground" />
                        {exp.paymentMethod}
                      </div>
                    </td>
                    <td className="p-3 align-middle">
                      <div className="font-semibold text-foreground">{exp.vendor}</div>
                      <div className="text-[10px] text-muted-foreground">{exp.invoiceNumber}</div>
                    </td>
                    <td className="p-3 align-middle">
                      <ExpenseStatusBadge status={exp.status} />
                    </td>
                    <td className="p-3 align-middle text-muted-foreground font-semibold">
                      {formatDate(exp.date)}
                    </td>
                    <td className="p-3 align-middle text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/expenses/${exp.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                            aria-label="View Log"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(exp.id)}
                          className="h-7 w-7 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                          aria-label="Delete Log"
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

export default ExpenseTable;
