import { useEffect } from 'react';
import { SelectCellFormatter } from 'react-data-grid';

import { useOnionWebsites } from '../../../../queries';
import { OnionWebsiteType, OnionWebsiteListItemType } from '../../../../types';
import { DataGrid, DataGridProps } from '../../../ui';
import { GridAction } from '../../../action';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateEffect,
} from '../../../../hook';
import {
  onionWebsiteOperations,
  onionWebsiteSelectors,
} from '../../../../store/slices/onionWebsite';

export interface OnionWebsiteListViewType {
  search?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const OnionWebsiteListView: React.FC<OnionWebsiteListViewType> = ({
  search,
  onEdit,
  onDelete,
}) => {

  const dispatch = useAppDispatch();

  const { data, page, limit, error, isLoading } = useAppSelector(
    onionWebsiteSelectors.onionWebsiteList,
  );

  const columns: DataGridProps<OnionWebsiteListItemType>['columns'] = [
    {
      key: 'id',
      name: 'Id',
      width: 80,
    },
    {
      key: 'url',
      name: 'Url',
    },
        {
      key: 'title',
      name: 'Title',
    },
        {
      key: 'description',
      name: 'Description',
    },
        {
      key: 'scannedAt',
      name: 'Scanned At',
    },
        {
      key: 'isCloned',
      name: 'Is Cloned',
      width: 120,
      renderCell: ({ row }) => {
        return(
          <SelectCellFormatter
            value={row.isCloned}
            onChange={() => {}}
          />
        )
      },
          },
        {
      key: 'actions',
      name: 'Actions',
      width: 80,
      renderCell: ({ row }) => {
        return (
          <GridAction
            onEdit={() => onEdit(row.id)}
            onDelete={() => onDelete(row.id)}
          />
        );
      },
    },
  ];

  const fetchOnionWebsites = () => {
    dispatch(
      onionWebsiteOperations.fetchOnionWebsites({
        page,
        limit,
        search,
      }),
    );
  };

  const onChangePage = (newPage: number) => {
    dispatch(
      onionWebsiteOperations.updatePageNumberAndLimit({
        page: newPage,
        limit,
      }),
    );
  };

  const onChangePageSize = (newPageSize: number) => {
    dispatch(
      onionWebsiteOperations.updatePageNumberAndLimit({
        page,
        limit: newPageSize,
      }),
    );
  };

  useUpdateEffect(() => {
    fetchOnionWebsites();
  }, [page, limit]);

  useUpdateEffect(() => {
    onChangePage(0);
    if (page === 0) {
      fetchOnionWebsites();
    }
  }, [search]);

  useEffect(() => {
    fetchOnionWebsites();
  }, []);

  return (
    <DataGrid
      columns={columns}
      data={data || undefined}
      paginationOptions={{
        page,
        pageSize: limit,
        onChangePage,
        onChangePageSize,
      }}
      isLoading={isLoading}
      isError={!!error}
      error={error}
      onReload={fetchOnionWebsites}
    />
  );
};

export default OnionWebsiteListView;
