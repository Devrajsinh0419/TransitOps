'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../forms/Input';
import { ChevronLeft, ChevronRight, ChevronsUpDown, Eye, Settings2, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReportTableProps {
  data: Record<string, any>[];
  columns: { key: string; label: string }[];
}

export function ReportTable({ data, columns }: ReportTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage] = React.useState(5);
  const [visibleColumns, setVisibleColumns] = React.useState<string[]>(columns.map((c) => c.key));
  const [showColumnSettings, setShowColumnSettings] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  // Filter & Search
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    const query = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(query))
    );
  }, [data, searchTerm]);

  // Sort
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return sortOrder === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginated Rows
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.max(Math.ceil(sortedData.length / rowsPerPage), 1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleColumnToggle = (key: string) => {
    if (visibleColumns.includes(key)) {
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((col) => col !== key));
      }
    } else {
      setVisibleColumns([...visibleColumns, key]);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map((_, idx) => idx));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (idx: number) => {
    if (selectedRows.includes(idx)) {
      setSelectedRows(selectedRows.filter((item) => item !== idx));
    } else {
      setSelectedRows([...selectedRows, idx]);
    }
  };

  return (
    <div className="space-y-4 select-none text-left">
      <div className="flex flex-col sm:flex-row justify-between gap-3 items-stretch sm:items-center">
        {/* Table Search */}
        <div className="relative flex-1 max-w-xs">
          <Input
            className="h-9 text-xs rounded-lg border-border/60"
            placeholder="Search report dataset..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Column configuration buttons */}
        <div className="flex items-center gap-2 relative self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowColumnSettings(!showColumnSettings)}
            className="h-9 text-xs font-semibold rounded-lg border-border/60 gap-1.5"
            leftIcon={<Settings2 className="h-3.5 w-3.5" />}
          >
            Columns
          </Button>

          {showColumnSettings && (
            <div className="absolute right-0 top-10 bg-card border border-border/50 rounded-xl p-3 shadow-lg z-50 w-44 space-y-1 animate-in fade-in duration-100">
              <span className="block text-[8px] font-black text-muted-foreground uppercase tracking-wider pb-1 border-b border-border/20">
                Visible Fields
              </span>
              {columns.map((col) => (
                <label key={col.key} className="flex items-center gap-2 text-[10px] font-semibold text-foreground py-0.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() => handleColumnToggle(col.key)}
                    className="rounded border-border/60"
                  />
                  <span className="capitalize">{col.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Spreadsheet container */}
      <div className="border border-border/50 rounded-xl bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[400px]">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground sticky top-0 bg-card z-10">
                <th className="p-3 w-8 text-center">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                    onChange={handleSelectAll}
                    className="rounded border-border/60"
                  />
                </th>
                {columns.map(
                  (col) =>
                    visibleColumns.includes(col.key) && (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="p-3 cursor-pointer hover:text-foreground transition-colors align-middle"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="capitalize">{col.label}</span>
                          <ChevronsUpDown className="h-3 w-3 text-muted-foreground/60" />
                        </div>
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={visibleColumns.length + 1} className="p-8 text-center text-muted-foreground/60 italic font-semibold">
                    No matching report rows found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors ${
                      selectedRows.includes(idx) ? 'bg-primary/5' : ''
                    }`}
                  >
                    <td className="p-3 text-center align-middle">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(idx)}
                        onChange={() => handleSelectRow(idx)}
                        className="rounded border-border/60"
                      />
                    </td>
                    {columns.map(
                      (col) =>
                        visibleColumns.includes(col.key) && (
                          <td key={col.key} className="p-3 align-middle font-semibold text-foreground capitalize">
                            {row[col.key] !== null && row[col.key] !== undefined ? String(row[col.key]) : '--'}
                          </td>
                        )
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold px-1">
        <span>
          Showing {Math.min(filteredData.length, (currentPage - 1) * rowsPerPage + 1)} to{' '}
          {Math.min(filteredData.length, currentPage * rowsPerPage)} of {filteredData.length} records
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0 rounded-lg border-border/60"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0 rounded-lg border-border/60"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReportTable;
