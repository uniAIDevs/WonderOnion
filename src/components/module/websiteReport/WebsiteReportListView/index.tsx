import { useEffect } from 'react';
import { SelectCellFormatter } from 'react-data-grid';

import { useWebsiteReports } from '../../../../queries';
import { WebsiteReportType, WebsiteReportListItemType } from '../../../../types';
import { DataGrid, DataGridProps } from '../../../ui';
import { GridAction } from '../../../action';
import {
  useAppDispatch,
  useAppSelector,
  useUpdateEffect,
} from '../../../../hook';
import {
  websiteReportOperations,
  websiteReportSelectors,
} from '../../../../store/slices/websiteReport';

export interface WebsiteReportListViewType {
  search?: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const WebsiteReportListView: React.FC<WebsiteReportListViewType> = ({
  search,
  onEdit,
  onDelete,
}) => {

  const dispatch = useAppDispatch();

  const { data, page, limit, error, isLoading } = useAppSelector(
    websiteReportSelectors.websiteReportList,
  );

  const columns: DataGridProps<WebsiteReportListItemType>['columns'] = [
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
      key: 'reportContent',
      name: 'Report Content',
    },
        {
      key: 'reportedAt',
      name: 'Reported At',
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

  const fetchWebsiteReports = () => {
    dispatch(
      websiteReportOperations.fetchWebsiteReports({
        page,
        limit,
        search,
      }),
    );
  };

  const onChangePage = (newPage: number) => {
    dispatch(
      websiteReportOperations.updatePageNumberAndLimit({
        page: newPage,
        limit,
      }),
    );
  };

  const onChangePageSize = (newPageSize: number) => {
    dispatch(
      websiteReportOperations.updatePageNumberAndLimit({
        page,
        limit: newPageSize,
      }),
    );
  };

  useUpdateEffect(() => {
    fetchWebsiteReports();
  }, [page, limit]);

  useUpdateEffect(() => {
    onChangePage(0);
    if (page === 0) {
      fetchWebsiteReports();
    }
  }, [search]);

  useEffect(() => {
    fetchWebsiteReports();
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
      onReload={fetchWebsiteReports}
    />
  );
};

export default WebsiteReportListView;
