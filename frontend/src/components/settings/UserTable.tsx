'use client';

import React from 'react';
import { User, UserRole, UserStatus } from '@/types/settings';
import { Button } from '../ui/Button';
import { Eye, Edit2, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'fleet_manager':
        return 'Fleet Manager';
      case 'safety_officer':
        return 'Safety Officer';
      default:
        return 'Viewer';
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'suspended':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border/60';
    }
  };

  return (
    <div className="select-none text-left w-full">
      {/* Mobile Card Layout */}
      <div className="grid grid-cols-1 md:hidden gap-3">
        <AnimatePresence mode="popLayout">
          {users.map((u) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-card border border-border/50 rounded-2xl space-y-3 relative shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img
                  src={u.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80'}
                  alt={u.firstName}
                  className="h-10 w-10 rounded-full border border-border/50 object-cover bg-muted"
                />
                <div>
                  <h4 className="text-xs font-black text-foreground uppercase">{u.firstName} {u.lastName}</h4>
                  <p className="text-[10px] text-muted-foreground">{u.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 py-2 border-t border-b border-border/10 text-[9px] font-bold text-muted-foreground uppercase">
                <div>
                  <span className="block text-[8px] text-muted-foreground/60 mb-0.5">Role / Dept</span>
                  <span className="text-foreground">{getRoleLabel(u.role)}</span>
                </div>
                <div>
                  <span className="block text-[8px] text-muted-foreground/60 mb-0.5">Status</span>
                  <span className={`px-2 py-0.5 rounded-full border ${getStatusColor(u.status)}`}>{u.status}</span>
                </div>
              </div>

              <div className="flex justify-end gap-1.5 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(u)}
                  className="h-8 w-8 rounded-lg p-0 flex items-center justify-center"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(u.id)}
                  className="h-8 w-8 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border border-border/50 rounded-2xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                <th className="p-3">User Profile</th>
                <th className="p-3">Department</th>
                <th className="p-3">Access Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Registered Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {users.map((u) => (
                  <motion.tr
                    key={u.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors"
                  >
                    {/* User profile info */}
                    <td className="p-3 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&q=80'}
                          alt={u.firstName}
                          className="h-8 w-8 rounded-full border border-border/50 object-cover bg-muted shrink-0"
                        />
                        <div>
                          <div className="font-extrabold text-foreground">{u.firstName} {u.lastName}</div>
                          <div className="text-[10px] text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="p-3 align-middle font-bold text-muted-foreground uppercase text-[10px]">
                      {u.department}
                    </td>

                    {/* Access Role */}
                    <td className="p-3 align-middle font-bold text-[10px] text-foreground flex items-center gap-1.5 mt-2">
                      <Shield className="h-3.5 w-3.5 text-primary" /> {getRoleLabel(u.role)}
                    </td>

                    {/* Status */}
                    <td className="p-3 align-middle">
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] font-extrabold uppercase ${getStatusColor(u.status)}`}>
                        {u.status}
                      </span>
                    </td>

                    {/* Registered Date */}
                    <td className="p-3 align-middle text-muted-foreground">
                      {u.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="p-3 align-middle text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(u)}
                          className="h-7 w-7 text-muted-foreground hover:text-foreground rounded-lg p-0 flex items-center justify-center"
                          aria-label="Edit User"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(u.id)}
                          className="h-7 w-7 text-rose-500 hover:bg-rose-500/10 rounded-lg p-0 flex items-center justify-center"
                          aria-label="Delete User"
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

export default UserTable;
