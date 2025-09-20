import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Table } from '../core/table';
import { Breadcrumbs } from '../core/breadcrumbs/Breadcrumbs';
import type { TableColumn } from '../core/table';
import data from '../../data.json';
import './TablePage.css';

export type DataItem = {
  id: number;
  issueType: string;
  severity: string;
  component: string;
  selector: string;
  url: string;
  description: string;
  codeSnippet: string;
  screenshot: string;
};

const columns: TableColumn<DataItem>[] = [
  {
    key: 'id',
    title: 'No.',
    sortable: true,
  },
  {
    key: 'issueType',
    title: 'Issue Type',
    sortable: true,
  },
  {
    key: 'severity',
    title: 'Severity',
    sortable: true,
  },
  {
    key: 'component',
    title: 'Component',
    sortable: true,
    searchable: false,
  },
  {
    key: 'selector',
    title: 'selector',
    sortable: true,
    searchable: true,
  },
  {
    key: 'url',
    title: 'URL',
    sortable: true,
    searchable: true,
    render: (value: string) => (
      <a
        href={value}
        target="_blank"
        rel="noopener noreferrer"
        className="url-link"
      >
        {value}
      </a>
    ),
  },
];

export const TablePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('selectedId');

  const [selectedRowId, setSelectedRowId] = useState<
    number | string | undefined
  >(selectedId || undefined);

  const onRowClick = (row: DataItem) => {
    setSelectedRowId(row.id);
    navigate(`/issues/${row.id}`, { state: row });
  };

  return (
    <div className="table-page-container">
      <h1>Issues Page</h1>
      <Breadcrumbs
        links={[
          { id: '1', label: 'Home', href: '/' },
          { id: '2', label: 'Issues', href: '/issues' },
        ]}
      />

      <div className="table-card">
        <h3>Accessibility Issues ({data.length} items)</h3>
        <Table
          data={data as DataItem[]}
          columns={columns}
          onRowClick={onRowClick}
          selectedRowId={
            selectedRowId !== undefined ? Number(selectedRowId) : undefined
          }
        />
      </div>
    </div>
  );
};
