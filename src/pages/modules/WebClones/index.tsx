import { useState } from 'react';
import debounce from 'debounce';
import { enqueueSnackbar } from 'notistack';

import { WebCloneFormModal, WebCloneListView } from '../../../components/module';
import { PageContainer } from '../../../components/ui';
import { DeleteDialog } from '../../../components/action';
import { useAppDispatch } from '../../../hook';
import { webCloneOperations } from '../../../store/slices/webClone';

const WebClones = () => {

  const dispatch = useAppDispatch();

  const [openNewFormModal, setOpenNewFormModal] = useState(false);
  const [deleteWebCloneId, setDeleteWebCloneId] = useState<
    number | undefined
  >();
  const [editWebCloneId, setEditWebCloneId] = useState<number | undefined>();

  const [searchText, setSearchText] = useState<string | undefined>();

  const handleOpenNewFormModal = () => {
    setOpenNewFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenNewFormModal(false);
    setEditWebCloneId(undefined);
  };

  const onEdit = (id: number) => {
    setEditWebCloneId(id);
  };

  const onDelete = (id: number) => {
    setDeleteWebCloneId(id);
  };

  const debounceSearch = debounce((value: string) => {
    setSearchText(value);
  }, 300);

  const handleSearch = (text: string) => {
    debounceSearch(text);
  };

  const handleDelete = () => {
    if(deleteWebCloneId) {
      dispatch(webCloneOperations.removeWebClone(deleteWebCloneId))
        .unwrap()
        .then(() => {
          enqueueSnackbar('WebClone deleted successfully', {
            variant: 'success',
          });
          dispatch(webCloneOperations.refreshWebClones())
        })
        .catch((error) => {
          enqueueSnackbar(
            error.errorMessage || 'Something went wrong while delete',
            {
              variant: 'error',
            },
          );
        });
      setDeleteWebCloneId(undefined);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteWebCloneId(undefined);
  };

  return (
    <PageContainer
      title="Web Clones"
      newButtonText="Add New Web Clones"
      onNewButtonClick={handleOpenNewFormModal}
      onSearch={handleSearch}
    >
      <WebCloneListView onEdit={onEdit} onDelete={onDelete} search={searchText} />
      {(openNewFormModal || !!editWebCloneId) && (
        <WebCloneFormModal
          open={openNewFormModal || !!editWebCloneId}
          onClose={handleCloseFormModal}
          id={editWebCloneId}
        />
      )}
      {deleteWebCloneId && (
        <DeleteDialog
          open={!!deleteWebCloneId}
          onDelete={handleDelete}
          onCancel={handleDeleteCancel}
        />
      )}
    </PageContainer>
  );
};

export default WebClones;
