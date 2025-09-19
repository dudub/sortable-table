import { useState, useMemo } from 'react';
import type { SortState, SearchState } from './types';

function isNumber(val?: string | number): boolean {
  if (val == null) return false;
  return typeof val === 'number';
}

export function useTableSort<T>(data: T[]) {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const toggleSort = (columnKey: string) => {
    setSortState((prev) => {
      if (prev.column !== columnKey) {
        return { column: columnKey, direction: 'asc' };
      }

      switch (prev.direction) {
        case 'asc':
          return { column: columnKey, direction: 'desc' };
        case 'desc':
          return { column: null, direction: null };
        default:
          return { column: columnKey, direction: 'asc' };
      }
    });
  };

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortState.column as keyof T] as
        | string
        | number
        | null
        | undefined;
      const bValue = b[sortState.column as keyof T] as
        | string
        | number
        | null
        | undefined;

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortState.direction === 'asc' ? 1 : -1;
      if (bValue == null) return sortState.direction === 'asc' ? -1 : 1;

      const isANumber = isNumber(aValue);
      const isBNumber = isNumber(bValue);

      let result = 0;

      if (isANumber && isBNumber) {
        result = Number(aValue) - Number(bValue) > 0 ? 1 : -1;
        return sortState.direction === 'asc' ? result : -result;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (aStr < bStr) result = -1;
      if (aStr > bStr) result = 1;

      return sortState.direction === 'asc' ? result : -result;
    });
  }, [data, sortState]);

  return {
    sortState,
    sortedData,
    toggleSort,
  };
}

export function useTableSearch<T>(data: T[]) {
  const [searchState, setSearchState] = useState<SearchState>({});

  const updateSearch = (columnKey: string, value: string) => {
    setSearchState((prev) => ({
      ...prev,
      [columnKey]: value,
    }));
  };

  const filteredData = useMemo(() => {
    const activeFilters = Object.entries(searchState).filter(
      ([, value]) => value.trim() !== '',
    );

    if (activeFilters.length === 0) {
      return data;
    }

    return data.filter((row) => {
      return activeFilters.every(([columnKey, searchValue]) => {
        const cellValue = row[columnKey as keyof T];
        return String(cellValue)
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
    });
  }, [data, searchState]);

  return {
    searchState,
    filteredData,
    updateSearch,
  };
}
