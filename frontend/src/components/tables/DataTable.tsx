'use client';

import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from './TableLayout';
import { TableToolbar } from './TableToolbar';
import { TablePagination } from './TablePagination';
import { TableSkeleton } from './TableSkeleton';
import { TableSortButton } from './TableSortButton';
import { EmptyState } from '../empty-state/EmptyState';
import { Checkbox } from '../forms/Checkbox';
import { Button } from '../ui/Button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ColumnDef<T> {
  key: keyof T | 'actions';
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalRecords: number;
  isLoading?: boolean;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onRowClick?: (row: T) => void;
  onActionClick?: (row: T, e: React.MouseEvent) => void;
  // Sorting
  sortColumn?: keyof T | null;
  sortDirection?: 'asc' | 'desc' | null;
  onSortChange?: (column: keyof T, direction: 'asc' | 'desc') => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  totalRecords,
  isLoading = false,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  searchValue,
  onSearchChange,
  onRowClick,
  onActionClick,
  sortColumn,
  sortDirection,
  onSortChange,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const handleSort = (key: keyof T) => {
    if (!onSortChange) return;
    let nextDir: 'asc' | 'desc' = 'asc';
    if (sortColumn === key && sortDirection === 'asc') {
      nextDir = 'desc';
    }
    onSortChange(key, nextDir);
  };

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className="space-y-4 w-full select-none">
      {/* Toolbar */}
      <TableToolbar
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        selectedCount={selectedIds.length}
        onBulkDelete={() => {
          alert(`Delete Bulk Action on IDs: ${selectedIds.join(', ')}`);
          setSelectedIds([]);
        }}
        onBulkExport={() => {
          alert(`Export Bulk Action on IDs: ${selectedIds.join(', ')}`);
          setSelectedIds([]);
        }}
      />

      {/* Grid Container */}
      {isLoading ? (
        <TableSkeleton rows={pageSize} cols={columns.length} />
      ) : data.length === 0 ? (
        <EmptyState
          variant="no_results"
          title="No Matching Entries"
          description="We couldn't find any results matching your search terms. Try refining query fields."
        />
      ) : (
        <TableContainer>
          <Table>
            <THead>
              <TR>
                <TH className="w-12 text-center">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={isAllSelected}
                      onChange={(e: any) => handleSelectAll(e.target.checked)}
                    />
                  </div>
                </TH>
                {columns.map((col) => (
                  <TH key={col.key as string}>
                    {col.sortable && col.key !== 'actions' ? (
                      <TableSortButton
                        label={col.header}
                        direction={sortColumn === col.key ? sortDirection : null}
                        onSort={() => handleSort(col.key as keyof T)}
                      />
                    ) : (
                      col.header
                    )}
                  </TH>
                ))}
              </TR>
            </THead>
            <TBody>
              {data.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <TR
                    key={row.id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'cursor-pointer',
                      isSelected ? 'bg-primary/5 hover:bg-primary/8' : ''
                    )}
                  >
                    <TD className="w-12 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <Checkbox
                          checked={isSelected}
                          onChange={(e: any) => handleSelectRow(row.id, e.target.checked)}
                        />
                      </div>
                    </TD>
                    {columns.map((col) => {
                      if (col.key === 'actions') {
                        return (
                          <TD key="actions" className="text-right" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => onActionClick?.(row, e)}
                              leftIcon={<MoreHorizontal className="h-4 w-4" />}
                              className="h-8 w-8 p-0 cursor-pointer"
                            />
                          </TD>
                        );
                      }

                      return (
                        <TD key={col.key as string}>
                          {col.render ? col.render(row) : (row[col.key as keyof T] as any)}
                        </TD>
                      );
                    })}
                  </TR>
                );
              })}
            </TBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default DataTable;
