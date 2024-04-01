import { useMemo, useState } from 'react';
import { IconButton, Stack, TablePagination } from '@mui/material';
import ReactDataGrid, { Column, SortColumn } from 'react-data-grid';
import ReplayIcon from '@mui/icons-material/Replay';

import CircularProgress from '../CircularProgress';

import { ErrorType } from '../../../types';
import { Alert } from '../../action';

import 'react-data-grid/lib/styles.css';

export interface DataGridProps<T> {
  data?: {
    result: T[];
    total: number;
  };
  columns: Column<T>[];
  rowsPerPageOptions?: number[];
  paginationOptions: {
    page: number;
    onChangePage: (page: number) => void;
    pageSize: number;
    onChangePageSize: (newPageSize: number) => void;
  };
  isLoading?: boolean;
  isError: boolean;
  error?: ErrorType;
  onReload: () => void;
}

type Comparator = (a: any, b: any) => number;

function getComparator(sortColumn: string): Comparator {
  return (a, b) => {
    return a[sortColumn] > b[sortColumn] ? -1 : 1;
  };
}

const DataGrid = <T,>({
  data = {
    result: [],
    total: 0,
  },
  columns,
  rowsPerPageOptions = [25, 50, 100],
  paginationOptions,
  isLoading,
  isError,
  error,
  onReload,
}: DataGridProps<T>) => {
  const { page, onChangePage, pageSize, onChangePageSize } = paginationOptions;
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);

  const handlePageChange = (_: any, _page: number) => {
    onChangePage(_page);
  };

  const handleRowPerPageChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChangePage(0);
    onChangePageSize(Number(e.target.value));
  };

  const sortedRows = useMemo((): readonly T[] => {
    if (sortColumns.length === 0) return data.result;

    return [...data.result].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [data.result, sortColumns]);

  return (
    <Stack height={'95%'} position={'relative'} spacing={2}>
      <Alert
        isError={isError}
        error={error}
        action={
          <IconButton color="inherit" size="small" onClick={onReload}>
            <ReplayIcon fontSize="inherit" />
          </IconButton>
        }
      />
      <ReactDataGrid
        rows={sortedRows || []}
        columns={columns}
        style={{
          height: '100%',
          colorScheme: 'dark',
        }}
        sortColumns={sortColumns}
        onSortColumnsChange={setSortColumns}
        defaultColumnOptions={{
          width: 'auto',
          sortable: true,
        }}
        className="rdg-light"
      />
      <TablePagination
        component={'div'}
        count={data.total || 0}
        page={data.total ? page : 0}
        rowsPerPageOptions={rowsPerPageOptions}
        onPageChange={handlePageChange}
        rowsPerPage={pageSize}
        onRowsPerPageChange={handleRowPerPageChange}
      />
      {isLoading && <CircularProgress size={40} />}
    </Stack>
  );
};

export default DataGrid;
