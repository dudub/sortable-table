import { useState, useMemo } from 'react';
import type { SortState, SearchState } from './types';
import { compareValues } from '../../helpers';

export const useTableSort = <T>({ data }: { data: T[] }) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const toggleSort = (columnKey: string) => {
    setSortState((prev) => {
      if (prev.column !== columnKey) {
        return { column: columnKey, direction: 'asc' };
      }

      if (prev.direction === 'asc') {
        return { column: columnKey, direction: 'desc' };
      }

      if (prev.direction === 'desc') {
        return { column: null, direction: null };
      }

      return { column: columnKey, direction: 'asc' };
    });
  };

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a[sortState.column as keyof T];
      const bValue = b[sortState.column as keyof T];

      const result = compareValues(aValue, bValue);
      return sortState.direction === 'asc' ? result : -result;
    });
  }, [data, sortState]);

  return {
    sortState,
    sortedData,
    toggleSort,
  };
};

export const useTableSearch = <T>({ data }: { data: T[] }) => {
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
};
