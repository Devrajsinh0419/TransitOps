'use client';

import React from 'react';
import { RecentReport } from '@/types/reports';
import { FileText, Download, Star, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

export function RecentReports() {
  const [recents, setRecents] = React.useState<RecentReport[]>([
    { id: '1', name: 'Q2 Fleet Utilization & Overage Audit', createdAt: '2026-07-10', createdBy: 'Sarah Jenkins' },
    { id: '2', name: 'June Fuel Mileage and Efficiency Report', createdAt: '2026-07-08', createdBy: 'Sarah Jenkins' },
    { id: '3', name: 'Annual Safety Score Board', createdAt: '2026-07-05', createdBy: 'System Cron' },
  ]);

  const [starred, setStarred] = React.useState<string[]>(['1']);

  const toggleStar = (id: string) => {
    if (starred.includes(id)) {
      setStarred(starred.filter((i) => i !== id));
      toast.info('Removed from favorites');
    } else {
      setStarred([...starred, id]);
      toast.success('Added to favorites');
    }
  };

  const handleDownload = (name: string) => {
    toast.success(`Downloading ${name} files...`);
  };

  return (
    <div className="p-5 bg-card border border-border/50 rounded-2xl shadow-sm space-y-4 select-none text-left">
      <div className="space-y-0.5 pb-2 border-b border-border/30">
        <h3 className="text-xs font-black uppercase tracking-wider text-foreground">
          Recent Analytical Runs
        </h3>
        <p className="text-[10px] text-muted-foreground">List of lately compiled operational queries</p>
      </div>

      <div className="space-y-3">
        {recents.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-muted/10 border border-border/40 hover:border-border/80 rounded-xl flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <FileText className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-foreground hover:underline cursor-pointer">
                  {item.name}
                </h4>
                <p className="text-[9px] text-muted-foreground">
                  Compiled on <span className="font-semibold">{item.createdAt}</span> by {item.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleStar(item.id)}
                className={`h-7 w-7 p-0 rounded-lg ${
                  starred.includes(item.id) ? 'text-amber-500 hover:text-amber-600' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(item.name)}
                className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground rounded-lg"
              >
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentReports;
