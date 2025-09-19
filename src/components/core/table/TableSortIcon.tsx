import type { SortState } from './types';

interface TableSortIconProps {
  columnKey: string;
  sortState: SortState;
}

export const TableSortIcon = ({ columnKey, sortState }: TableSortIconProps) => {
  if (sortState.column !== columnKey) {
    return <span className="sort-icon">↕</span>;
  }

  return (
    <span className="sort-icon">
      {sortState.direction === 'asc' ? '↑' : '↓'}
    </span>
  );
};
