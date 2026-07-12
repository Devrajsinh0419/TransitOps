'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Download, RefreshCw, Calendar, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ReportHeaderProps {
  title: string;
  onRefresh: () => void;
  onToggleFilters: () => void;
  showFilters: boolean;
  onExport: (format: 'csv' | 'excel' | 'pdf') => void;
}

export function ReportHeader({
  title,
  onRefresh,
  onToggleFilters,
  showFilters,
  onExport,
}: ReportHeaderProps) {
  const [dateRange, setDateRange] = React.useState('2026-07-01 to 2026-07-31');

  return (
    <div className="space-y-4 select-none text-left">
      {/* Breadcrumb row */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          TransitOps
        </Link>
        <span>/</span>
        <span className="text-foreground">Reporting & Analytics</span>
        <span>/</span>
        <span className="text-primary">{title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2">
            Executive Analytics Center
          </h1>
          <p className="text-xs text-muted-foreground">
            Aggregate fleet performance datasets, track operations cost, and download compliance reports.
          </p>
        </div>

        {/* Action controllers */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Simulated Date Picker */}
          <div className="relative flex items-center border border-border/60 bg-card rounded-lg px-3 py-1.5 text-xs text-muted-foreground font-semibold cursor-pointer hover:bg-muted/50 transition-colors">
            <Calendar className="h-3.5 w-3.5 mr-2 text-primary" />
            <input
              type="text"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent focus:outline-none w-40 text-foreground cursor-pointer text-xs"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFilters}
            className={`h-9 text-xs font-semibold rounded-lg gap-1.5 border-border/60 ${
              showFilters ? 'bg-muted/80 text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
          >
            Filters
          </Button>

          {/* Export action */}
          <div className="flex items-center gap-1 bg-card border border-border/60 rounded-lg p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onExport('csv')}
              className="h-8 text-[10px] px-2 font-bold hover:bg-muted text-muted-foreground hover:text-foreground rounded-md"
            >
              CSV
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onExport('excel')}
              className="h-8 text-[10px] px-2 font-bold hover:bg-muted text-muted-foreground hover:text-foreground rounded-md"
            >
              Excel
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onExport('pdf')}
              className="h-8 text-[10px] px-2 font-bold hover:bg-muted text-muted-foreground hover:text-foreground rounded-md"
            >
              PDF
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="h-9 w-9 border-border/60 text-muted-foreground hover:text-foreground p-0 flex items-center justify-center rounded-lg"
            aria-label="Refresh Data"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportHeader;
