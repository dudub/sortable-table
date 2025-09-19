import type { TableColumn } from './types';
import cn from 'clsx';

interface TableCellProps<T extends { id: string | number }> {
  column: TableColumn<T>;
  row: T;
}

export const TableCell = <T extends { id: string | number }>({
  column,
  row,
}: TableCellProps<T>) => {
  const { key, render } = column;
  const value = row[key];

  return (
    <td className={cn('table-cell', column.className)}>
      {render ? render(value, row) : String(value ?? '')}
    </td>
  );
};
