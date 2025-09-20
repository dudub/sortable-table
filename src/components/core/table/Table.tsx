import type { TableProps } from './types';
import { useTableSort, useTableSearch } from './hooks';
import { TableHeader } from './TableHeader';
import cn from 'clsx';
import { TableCell } from './TableCell';
import './Table.css';

export const Table = <T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  selectedRowId,
}: TableProps<T>) => {
  const { sortState, sortedData, toggleSort } = useTableSort({ data });
  const { searchState, filteredData, updateSearch } = useTableSearch({
    data: sortedData,
  });

  return (
    <table className="data-table">
      <thead>
        <tr className="table-header">
          {columns.map((column) => (
            <TableHeader
              key={String(column.key)}
              column={column}
              sortState={sortState}
              searchState={searchState}
              onToggleSort={toggleSort}
              onUpdateSearch={updateSearch}
            />
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row) => (
          <tr
            key={row.id}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (onRowClick) {
                  onRowClick(row);
                }
              }
            }}
            className={cn('table-row', {
              ['selected']: row.id === selectedRowId,
            })}
            tabIndex={0}
            aria-selected={row.id === selectedRowId}
          >
            {columns.map((column) => (
              <TableCell key={String(column.key)} column={column} row={row} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
