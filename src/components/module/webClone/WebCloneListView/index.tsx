import { useEffect } from 'react';
import { SelectCellFormatter } from 'react-data-grid';

import { useWebClones } from '../../../../queries';
import { WebCloneType, WebCloneListItemType } from '../../../../types';
import { DataGrid, DataGridProps } from '../../../ui';
import { GridAction } from '../../../action';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateEffect,
} from '../../../../hook';
import {
  webCloneOperations,
  webCloneSelectors,
} from '../../../../store/slices/webClone';

export interface WebCloneListViewType {
  search?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const WebCloneListView: React.FC<WebCloneListViewType> = ({
  search,
  onEdit,
  onDelete,
}) => {

  const dispatch = useAppDispatch();

  const { data, page, limit, error, isLoading } = useAppSelector(
    webCloneSelectors.webCloneList,
  );

  const columns: DataGridProps<WebCloneListItemType>['columns'] = [
    {
      key: 'id',
      name: 'Id',
      width: 80,
    },
    {
      key: 'onionWebsite',
      name: 'Onion Website',
      renderCell: ({ row }) => {
        return(
          <div>{row.onionWebsite.url}</div>
        )
      },
    },
        {
      key: 'cloneUrl',
      name: 'Clone Url',
    },
        {
      key: 'clonedAt',
      name: 'Cloned At',
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

  const fetchWebClones = () => {
    dispatch(
      webCloneOperations.fetchWebClones({
        page,
        limit,
        search,
      }),
    );
  };

  const onChangePage = (newPage: number) => {
    dispatch(
      webCloneOperations.updatePageNumberAndLimit({
        page: newPage,
        limit,
      }),
    );
  };

  const onChangePageSize = (newPageSize: number) => {
    dispatch(
      webCloneOperations.updatePageNumberAndLimit({
        page,
        limit: newPageSize,
      }),
    );
  };

  useUpdateEffect(() => {
    fetchWebClones();
  }, [page, limit]);

  useUpdateEffect(() => {
    onChangePage(0);
    if (page === 0) {
      fetchWebClones();
    }
  }, [search]);

  useEffect(() => {
    fetchWebClones();
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
      onReload={fetchWebClones}
    />
  );
};

export default WebCloneListView;
