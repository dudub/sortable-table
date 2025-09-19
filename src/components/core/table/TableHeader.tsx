import type { TableColumn, SortState, SearchState } from './types';
import cn from 'clsx';
import { TableSortIcon } from './TableSortIcon';

interface TableHeaderProps<T> {
  column: TableColumn<T>;
  sortState: SortState;
  searchState: SearchState;
  onToggleSort: (columnKey: string) => void;
  onUpdateSearch: (columnKey: string, value: string) => void;
}

export const TableHeader = <T extends { id: string | number }>({
  column,
  sortState,
  searchState,
  onToggleSort,
  onUpdateSearch,
}: TableHeaderProps<T>) => {
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
              onClick={() => onToggleSort(columnKey)}
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
              <TableSortIcon columnKey={columnKey} sortState={sortState} />
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
              onChange={(e) => onUpdateSearch(columnKey, e.target.value)}
              aria-label={`Search ${title}`}
            />
          </div>
        )}
      </div>
    </th>
  );
};
