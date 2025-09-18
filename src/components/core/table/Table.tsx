import type { TableProps, TableColumn } from "./types";
import { useTableSort, useTableSearch } from "./hooks";
import "./Table.css";

export function Table<T>({ data, columns, className = "" }: TableProps<T>) {
  const { sortState, sortedData, toggleSort } = useTableSort(data);
  const { searchState, filteredData, updateSearch } =
    useTableSearch(sortedData);

  const renderSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <span className="sort-icon sort-icon-neutral">↕</span>;
    }

    return (
      <span className="sort-icon">
        {sortState.direction === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  const renderHeaderCell = (column: TableColumn<T>) => {
    const { key, title, sortable, searchable } = column;
    const columnKey = String(key);

    return (
      <th
        key={columnKey}
        className={`table-cell table-header-cell ${column.className || ""}`}
      >
        <div className="header-content">
          <div className="header-title">
            {sortable ? (
              <button
                className="sort-button"
                onClick={() => toggleSort(columnKey)}
                type="button"
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
                type="text"
                className="search-input"
                value={searchState[columnKey] || ""}
                onChange={(e) => updateSearch(columnKey, e.target.value)}
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
      <td key={String(key)} className={`table-cell ${column.className || ""}`}>
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
        {filteredData.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => renderCell(column, row))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
