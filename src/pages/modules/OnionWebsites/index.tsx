import { useState } from 'react';
import debounce from 'debounce';
import { enqueueSnackbar } from 'notistack';

import { OnionWebsiteFormModal, OnionWebsiteListView } from '../../../components/module';
import { PageContainer } from '../../../components/ui';
import { DeleteDialog } from '../../../components/action';
import { useAppDispatch } from '../../../hook';
import { onionWebsiteOperations } from '../../../store/slices/onionWebsite';

const OnionWebsites = () => {

  const dispatch = useAppDispatch();

  const [openNewFormModal, setOpenNewFormModal] = useState(false);
  const [deleteOnionWebsiteId, setDeleteOnionWebsiteId] = useState<
    number | undefined
  >();
  const [editOnionWebsiteId, setEditOnionWebsiteId] = useState<number | undefined>();

  const [searchText, setSearchText] = useState<string | undefined>();

  const handleOpenNewFormModal = () => {
    setOpenNewFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenNewFormModal(false);
    setEditOnionWebsiteId(undefined);
  };

  const onEdit = (id: number) => {
    setEditOnionWebsiteId(id);
  };

  const onDelete = (id: number) => {
    setDeleteOnionWebsiteId(id);
  };

  const debounceSearch = debounce((value: string) => {
    setSearchText(value);
  }, 300);

  const handleSearch = (text: string) => {
    debounceSearch(text);
  };

  const handleDelete = () => {
    if(deleteOnionWebsiteId) {
      dispatch(onionWebsiteOperations.removeOnionWebsite(deleteOnionWebsiteId))
        .unwrap()
        .then(() => {
          enqueueSnackbar('OnionWebsite deleted successfully', {
            variant: 'success',
          });
          dispatch(onionWebsiteOperations.refreshOnionWebsites())
        })
        .catch((error) => {
          enqueueSnackbar(
            error.errorMessage || 'Something went wrong while delete',
            {
              variant: 'error',
            },
          );
        });
      setDeleteOnionWebsiteId(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteOnionWebsiteId(undefined);
  };

  return (
    <PageContainer
      title="Onion Websites"
      newButtonText="Add New Onion Websites"
      onNewButtonClick={handleOpenNewFormModal}
      onSearch={handleSearch}
    >
      <OnionWebsiteListView onEdit={onEdit} onDelete={onDelete} search={searchText} />
      {(openNewFormModal || !!editOnionWebsiteId) && (
        <OnionWebsiteFormModal
          open={openNewFormModal || !!editOnionWebsiteId}
          onClose={handleCloseFormModal}
          id={editOnionWebsiteId}
        />
      )}
      {deleteOnionWebsiteId && (
        <DeleteDialog
          open={!!deleteOnionWebsiteId}
          onDelete={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
    </PageContainer>
  );
};

export default OnionWebsites;
