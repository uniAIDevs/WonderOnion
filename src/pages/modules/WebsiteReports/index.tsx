import { useState } from 'react';
import debounce from 'debounce';
import { enqueueSnackbar } from 'notistack';

import { WebsiteReportFormModal, WebsiteReportListView } from '../../../components/module';
import { PageContainer } from '../../../components/ui';
import { DeleteDialog } from '../../../components/action';
import { useAppDispatch } from '../../../hook';
import { websiteReportOperations } from '../../../store/slices/websiteReport';

const WebsiteReports = () => {

  const dispatch = useAppDispatch();

  const [openNewFormModal, setOpenNewFormModal] = useState(false);
  const [deleteWebsiteReportId, setDeleteWebsiteReportId] = useState<
    number | undefined
  >();
  const [editWebsiteReportId, setEditWebsiteReportId] = useState<number | undefined>();

  const [searchText, setSearchText] = useState<string | undefined>();

  const handleOpenNewFormModal = () => {
    setOpenNewFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenNewFormModal(false);
    setEditWebsiteReportId(undefined);
  };

  const onEdit = (id: number) => {
    setEditWebsiteReportId(id);
  };

  const onDelete = (id: number) => {
    setDeleteWebsiteReportId(id);
  };

  const debounceSearch = debounce((value: string) => {
    setSearchText(value);
  }, 300);

  const handleSearch = (text: string) => {
    debounceSearch(text);
  };

  const handleDelete = () => {
    if(deleteWebsiteReportId) {
      dispatch(websiteReportOperations.removeWebsiteReport(deleteWebsiteReportId))
        .unwrap()
        .then(() => {
          enqueueSnackbar('WebsiteReport deleted successfully', {
            variant: 'success',
          });
          dispatch(websiteReportOperations.refreshWebsiteReports())
        })
        .catch((error) => {
          enqueueSnackbar(
            error.errorMessage || 'Something went wrong while delete',
            {
              variant: 'error',
            },
          );
        });
      setDeleteWebsiteReportId(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteWebsiteReportId(undefined);
  };

  return (
    <PageContainer
      title="Website Reports"
      newButtonText="Add New Website Reports"
      onNewButtonClick={handleOpenNewFormModal}
      onSearch={handleSearch}
    >
      <WebsiteReportListView onEdit={onEdit} onDelete={onDelete} search={searchText} />
      {(openNewFormModal || !!editWebsiteReportId) && (
        <WebsiteReportFormModal
          open={openNewFormModal || !!editWebsiteReportId}
          onClose={handleCloseFormModal}
          id={editWebsiteReportId}
        />
      )}
      {deleteWebsiteReportId && (
        <DeleteDialog
          open={!!deleteWebsiteReportId}
          onDelete={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
    </PageContainer>
  );
};

export default WebsiteReports;
