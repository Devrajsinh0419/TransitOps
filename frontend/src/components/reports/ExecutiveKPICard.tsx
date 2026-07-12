'use client';

import React from 'react';
import { ExecutiveKPICardData } from '@/types/reports';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';

interface KPICardProps {
  data: ExecutiveKPICardData;
}

export function ExecutiveKPICard({ data }: KPICardProps) {
  const { title, value, trend, comparison, iconName, sparkline } = data;

  // Dynamically resolve Icon component
  const resolveIcon = () => {
    // Lucide names can be pascal case or lowercase
    const normalizedName = iconName
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    
    const IconComponent = (LucideIcons as any)[normalizedName] || LucideIcons.HelpCircle;
    return <IconComponent className="h-4 w-4" />;
  };

  // Generate SVG Sparkline coordinates
  const generateSparklinePoints = () => {
    if (!sparkline || sparkline.length === 0) return '';
    const width = 80;
    const height = 28;
    const minVal = Math.min(...sparkline);
    const maxVal = Math.max(...sparkline);
    const valRange = maxVal - minVal || 1;

    const points = sparkline.map((val, idx) => {
      const x = (idx / (sparkline.length - 1)) * width;
      const y = height - ((val - minVal) / valRange) * (height - 4) - 2;
      return `${x},${y}`;
    });

    return points.join(' ');
  };

  const isPositive = trend >= 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 bg-card border border-border/50 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between hover:shadow-md hover:border-border transition-all select-none text-left relative overflow-hidden group"
    >
      {/* Glossy gradient glow for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex items-center justify-between">
        <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-1.5 rounded-lg border ${
          isPositive 
            ? 'text-primary bg-primary/10 border-primary/20' 
            : 'text-rose-500 bg-rose-500/10 border-rose-500/20'
        }`}>
          {resolveIcon()}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="text-lg font-black text-foreground">{value}</div>
          <div className="flex items-center gap-1.5 text-[9px]">
            <span className={`font-extrabold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span className="text-muted-foreground">{comparison}</span>
          </div>
        </div>

        {/* Mini Sparkline graph */}
        <div className="h-7 w-20 flex items-end">
          <svg className="h-full w-full overflow-visible">
            <polyline
              fill="none"
              stroke={isPositive ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={generateSparklinePoints()}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default ExecutiveKPICard;
