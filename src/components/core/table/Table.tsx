import React from 'react';
import type { TableProps, TableColumn } from './types';
import { useTableSort, useTableSearch } from './hooks';
import cn from 'clsx';
import './Table.css';

export function Table<T extends { id: string | number }>({
  data,
  columns,
  onRowClick = () => {},
  className = '',
  withSelectedRowId,
}: TableProps<T>) {
  const { sortState, sortedData, toggleSort } = useTableSort(data);
  const { searchState, filteredData, updateSearch } =
    useTableSearch(sortedData);
  const [selectedRowId, setSelectedRowId] = React.useState<
    number | string | undefined
  >(withSelectedRowId);

  const rowClickHandler = (row: T) => {
    setSelectedRowId(row.id);
    onRowClick(row);
  };

  const renderSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <span className="sort-icon">↕</span>;
    }

    return (
      <span className="sort-icon">
        {sortState.direction === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const renderHeaderCell = (column: TableColumn<T>) => {
    const { key, title, sortable, searchable } = column;
    const columnKey = String(key);

    return (
      <th
        key={columnKey}
        className={cn('table-cell table-header-cell', column.className)}
      >
        <div className="header-content">
          <div className="header-title">
            {sortable ? (
              <button
                className="sort-button"
                onClick={() => toggleSort(columnKey)}
                type="button"
                aria-label={`Sort by ${title} ${
                  sortState.column === columnKey
                    ? sortState.direction === 'asc'
                      ? 'descending'
                      : 'ascending'
                    : 'ascending'
                }`}
              >
                {title}
                {renderSortIcon(columnKey)}
              </button>
            ) : (
              title
            )}
          </div>
          {searchable && (
            <div className="search-container">
              <input
                id={`search-${columnKey}`}
                type="text"
                className="search-input"
                value={searchState[columnKey] || ''}
                onChange={(e) => updateSearch(columnKey, e.target.value)}
                aria-label={`Search ${title}`}
              />
            </div>
          )}
        </div>
      </th>
    );
  };

  const renderCell = (column: TableColumn<T>, row: T) => {
    const { key, render } = column;
    const value = row[key];

    return (
      <td key={String(key)} className={cn('table-cell', column.className)}>
        {render ? render(value, row) : `${value}`}
      </td>
    );
  };

  return (
    <table className={`data-table ${className}`}>
      <thead>
        <tr className="table-header">{columns.map(renderHeaderCell)}</tr>
      </thead>
      <tbody>
        {filteredData.map((row) => (
          <tr
            key={row.id}
            onClick={() => rowClickHandler(row)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                rowClickHandler(row);
              }
            }}
            className={cn('table-row', {
              ['selected']: row.id === selectedRowId,
            })}
            tabIndex={0}
            aria-selected={row.id === selectedRowId}
          >
            {columns.map((column) => renderCell(column, row))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
