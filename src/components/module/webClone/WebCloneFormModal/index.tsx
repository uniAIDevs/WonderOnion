import { useEffect, useState } from 'react';
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  ListItem,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { debounce } from 'debounce';
import dayjs from 'dayjs';

import {
  CreateOrUpdateWebCloneType,
  WebCloneType,
  WebCloneFormModalType,
  OnionWebsiteDropdownType,
  OnionWebsiteType,
} from '../../../../types';

import {
  DatePicker,
  DateTimePicker,
  ModalWithTitle,
  TimePicker,
} from '../../../ui';

import { OnionWebsiteFormModal } from '../..';

import {
  useAppDispatch,
  useAppSelector,
  useUpdateEffect,
} from '../../../../hook';

import {
  webCloneOperations,
  webCloneSelectors,
} from '../../../../store/slices/webClone';

import { onionWebsiteOperations, onionWebsiteSelectors } from '../../../../store/slices/onionWebsite';

export interface WebCloneFormModalProps {
  open: boolean;
  onClose: (webClone?: WebCloneType) => void;
  id?: number;
}

const WebCloneSchema = yup
  .object<WebCloneFormModalType>()
  .shape({
    onionWebsite: yup
      .object()
      .shape({
        id: yup
        .number()
        .test(
          'not-equal-to-negative-one',
          'Please select a Onion Website',
          (value) => value !== -1,
        )
        .required('Onion Website is required'),
        url: yup.string().required(),
      })
      .required(),
        cloneUrl: yup.string().required('Clone Url is required'),
            clonedAt: yup.string(),
          })
  .required();

const WebCloneFormModal: React.FC<WebCloneFormModalProps> = ({
  open,
  onClose,
  id,
}) => {

  const isEdit = !!id;

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [onionWebsiteSearchText, setOnionWebsiteSearchText] = useState('');
  const [onionWebsiteFormModal, setOnionWebsiteModal] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<WebCloneFormModalType>({
    resolver: yupResolver(WebCloneSchema),
  });

  const { data: webCloneData, isLoading: isWebCloneDataFetching } = useAppSelector(webCloneSelectors.webCloneDetails);

  useEffect(() => {
    if (isEdit) {
      dispatch(webCloneOperations.fetchWebClone(id));
    }
  }, []);


    const {
      data: onionWebsiteList,
      isLoading: isOnionWebsiteFetching,
    } = useAppSelector(onionWebsiteSelectors.onionWebsiteDropdown);


  useEffect(() => {
    if (webCloneData) {
      setValue('onionWebsite', {
        id: webCloneData.onionWebsite.id,
        url: webCloneData.onionWebsite.url
      });
      setOnionWebsiteSearchText(webCloneData.onionWebsite.url)
            setValue('cloneUrl', webCloneData.cloneUrl);
            setValue('clonedAt', webCloneData.clonedAt);
          }
  }, [webCloneData]);

  const handleCreateOrUpdateWebClone = (data: WebCloneFormModalType) => {

    const formData: CreateOrUpdateWebCloneType = {
      onionWebsiteId: data.onionWebsite.id,
            cloneUrl: data.cloneUrl,
            clonedAt: data.clonedAt,
          }

    if (isEdit) {
      dispatch(
        webCloneOperations.editWebClone({
          id,
          body: formData,
        }),
      )
        .unwrap()
        .then((value) => {
          enqueueSnackbar('WebClone updated successfully', {
            variant: 'success',
          });
          dispatch(webCloneOperations.refreshWebClones());
          dispatch(webCloneOperations.resetWebCloneDetails());
          onClose(value);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Something went wrong', {
            variant: 'error',
          });
          onClose();
        });
    } else {
      dispatch(webCloneOperations.addWebClone(formData))
        .unwrap()
        .then((value) => {
          enqueueSnackbar('WebClone updated successfully', {
            variant: 'success',
          });
          dispatch(webCloneOperations.refreshWebClones());
          dispatch(webCloneOperations.resetWebCloneDetails());
          onClose(value);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Something went wrong', {
            variant: 'error',
          });
          onClose();
        });
    }
  };

  const handleCancel = () => {
    if(isEdit) {
      dispatch(webCloneOperations.resetWebCloneDetails());
    }
    onClose();
  };

  // Onion Website MODAL
  const debounceOnionWebsiteSearchText = debounce((value: string) => {
    setOnionWebsiteSearchText(value);
  }, 300);

  const handleOnionWebsiteSearchText = (
    _: any,
    text: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason === 'input') {
      debounceOnionWebsiteSearchText(text);
    }
  };

  useUpdateEffect(() => {
    dispatch(onionWebsiteOperations.fetchOnionWebsiteDropdown(onionWebsiteSearchText))
  }, [onionWebsiteSearchText]);

  const handleOnionWebsiteModalOpen = () => {
    setOnionWebsiteModal(true);
  };

  const handleOnionWebsiteModalClose = (onionWebsite?: OnionWebsiteType) => {
    if (onionWebsite) {
      setValue('onionWebsite', {
        id: onionWebsite.id,
        url: onionWebsite.url
      });
    }

    setOnionWebsiteModal(false);
  };

  const handleOnionWebsiteChange = (
    _: any,
    newValue: string | OnionWebsiteDropdownType | null,
  ) => {
    if (!newValue) {
      // Handle the case where no option is selected
      setValue('onionWebsite', {
        id: -1,
        url: ''
      });
    } else if (typeof newValue === 'object') {
      // Check if the selected option exists in the onionWebsiteList
      setValue('onionWebsite', newValue);
    }
    trigger('onionWebsite');
  };


  return (
    <>
      <ModalWithTitle
        open={open}
        title="New WebClone"
        subTitle="Create new WebClone"
        renderAction={() => (
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        )}
        form={{
          onSubmit: handleSubmit(handleCreateOrUpdateWebClone),
        }}
        loading={isWebCloneDataFetching}
      >
      <Grid container spacing={2}>
        <Grid xs={12} md={12} item>
          <Stack direction={'row'} alignItems={'flex-start'} spacing={2}>
            <Autocomplete
              value={
                getValues('onionWebsite') || null
              }
              options={onionWebsiteList || []}
              getOptionLabel={(option) => {
                if (typeof option === 'object') {
                  return option.url || '';
                }
                return option || '';
              }}
              onChange={handleOnionWebsiteChange}
              onInputChange={handleOnionWebsiteSearchText}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Onion Website"
                  size="small"
                  error={!!errors.onionWebsite?.id?.message}
                  helperText={errors.onionWebsite?.id?.message}
                />
              )}
              renderOption={(props, option) => (
                <ListItem {...props} key={option.id}>
                  {option.url}
                </ListItem>
              )}
              loading={isOnionWebsiteFetching}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              freeSolo
              forcePopupIcon
              fullWidth
            />
            <IconButton onClick={handleOnionWebsiteModalOpen}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Grid>
                        <Grid xs={12} md={12} item>
          <Controller
            name="clonedAt"
            control={control}
            defaultValue={dayjs().format()}
            render={({ field }) => (
              <DateTimePicker
                dtRef={field.ref}
                label="Cloned At"
                error={!!errors.clonedAt?.message}
                helperText={errors.clonedAt?.message}
                value={dayjs(field.value)}
                onChange={(value, context) =>
                  field.onChange(value?.format(), context)
                }
              />
            )}
          />
        </Grid>
              </Grid>
      </ModalWithTitle>
      {onionWebsiteFormModal && (
        <OnionWebsiteFormModal open={onionWebsiteFormModal} onClose={handleOnionWebsiteModalClose} />
      )}
    </>
  )
}

export default WebCloneFormModal;