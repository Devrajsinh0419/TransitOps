'use client';

import React from 'react';
import { Role } from '@/types/settings';
import { Button } from '../ui/Button';
import { Shield, ShieldAlert, Users, Eye, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoleCardProps {
  role: Role;
  onEditClick: (role: Role) => void;
}

export function RoleCard({ role, onEditClick }: RoleCardProps) {
  const getRoleIcon = () => {
    switch (role.code) {
      case 'admin':
        return { icon: ShieldAlert, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' };
      case 'fleet_manager':
        return { icon: Shield, color: 'text-primary bg-primary/10 border-primary/20' };
      case 'safety_officer':
        return { icon: Shield, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' };
      default:
        return { icon: Eye, color: 'text-muted-foreground bg-muted border-border/60' };
    }
  };

  const { icon: Icon, color } = getRoleIcon();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-5 border border-border/50 bg-card rounded-2xl shadow-sm hover:shadow-md hover:border-border transition-all flex flex-col justify-between select-none text-left h-full"
    >
      <div className="space-y-4">
        {/* Header Icon + Name */}
        <div className="flex items-center justify-between pb-3 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border flex items-center justify-center shrink-0 ${color}`}>
              <Icon className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
                {role.name}
              </h3>
              <span className="text-[8px] font-black uppercase tracking-wider text-muted-foreground">
                Code: {role.code}
              </span>
            </div>
          </div>

          <div className="bg-muted px-2.5 py-0.5 rounded-full border border-border/60 text-[9px] font-bold text-foreground flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" /> {role.userCount} Users
          </div>
        </div>

        {/* Description */}
        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
          {role.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex justify-end gap-1.5 pt-4 mt-4 border-t border-border/10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEditClick(role)}
          className="h-8 text-[10px] font-bold px-3 rounded-lg gap-1 border-border/60"
          leftIcon={<Edit2 className="h-3 w-3" />}
        >
          Edit Details
        </Button>
      </div>
    </motion.div>
  );
}

export default RoleCard;
