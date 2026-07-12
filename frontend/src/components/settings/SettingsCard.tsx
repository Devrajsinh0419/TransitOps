'use client';

import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface SettingsCardProps {
  title: string;
  description: string;
  href: string;
  iconName: string;
}

export function SettingsCard({ title, description, href, iconName }: SettingsCardProps) {
  const resolveIcon = () => {
    const normalizedName = iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const IconComponent = (LucideIcons as any)[normalizedName] || LucideIcons.Settings;
    return <IconComponent className="h-5 w-5 text-primary" />;
  };

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        className="p-5 border border-border/50 bg-card rounded-2xl shadow-sm hover:shadow-md hover:border-border transition-all flex items-start gap-4 select-none text-left h-full cursor-pointer"
      >
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
          {resolveIcon()}
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
            {title}
          </h3>
          <p className="text-[10px] text-muted-foreground leading-normal font-medium">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default SettingsCard;
