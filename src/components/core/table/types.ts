import type { ReactNode } from 'react';

export interface TableColumn<T = any> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  searchable?: boolean;
  render?: (value: any, row: T) => ReactNode;
  className?: string;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
}

export interface SearchState {
  [columnKey: string]: string;
}

export interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  withSelectedRowId?: number | string;
}
