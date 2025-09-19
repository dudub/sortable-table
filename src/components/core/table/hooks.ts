import { useState, useMemo } from 'react';
import type { SortState, SearchState } from './types';

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
      const aValue = a[sortState.column as keyof T];
      const bValue = b[sortState.column as keyof T];

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortState.direction === 'asc' ? 1 : -1;
      if (bValue == null) return sortState.direction === 'asc' ? -1 : 1;

      // Determine if both values are numbers
      const aIsNumber = typeof aValue === 'number' || (!isNaN(Number(aValue)) && !isNaN(parseFloat(String(aValue))));
      const bIsNumber = typeof bValue === 'number' || (!isNaN(Number(bValue)) && !isNaN(parseFloat(String(bValue))));

      let result = 0;

      if (aIsNumber && bIsNumber) {
        // Both are numbers - use numeric comparison
        const aNum = typeof aValue === 'number' ? aValue : parseFloat(String(aValue));
        const bNum = typeof bValue === 'number' ? bValue : parseFloat(String(bValue));
        result = aNum - bNum;
      } else {
        // At least one is a string - use string comparison
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        if (aStr < bStr) result = -1;
        else if (aStr > bStr) result = 1;
        else result = 0;
      }

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
