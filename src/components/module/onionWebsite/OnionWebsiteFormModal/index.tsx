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
  CreateOrUpdateOnionWebsiteType,
  OnionWebsiteType,
  OnionWebsiteFormModalType,
} from '../../../../types';

import {
  DatePicker,
  DateTimePicker,
  ModalWithTitle,
  TimePicker,
} from '../../../ui';


import {
  useAppDispatch,
  useAppSelector,
  useUpdateEffect,
} from '../../../../hook';

import {
  onionWebsiteOperations,
  onionWebsiteSelectors,
} from '../../../../store/slices/onionWebsite';


export interface OnionWebsiteFormModalProps {
  open: boolean;
  onClose: (onionWebsite?: OnionWebsiteType) => void;
  id?: number;
}

const OnionWebsiteSchema = yup
  .object<OnionWebsiteFormModalType>()
  .shape({
    url: yup.string().required('Url is required'),
            title: yup.string(),
            description: yup.string(),
            scannedAt: yup.string(),
            isCloned: yup.bool(),
      })
  .required();

const OnionWebsiteFormModal: React.FC<OnionWebsiteFormModalProps> = ({
  open,
  onClose,
  id,
}) => {

  const isEdit = !!id;

  const dispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();


  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OnionWebsiteFormModalType>({
    resolver: yupResolver(OnionWebsiteSchema),
  });

  const { data: onionWebsiteData, isLoading: isOnionWebsiteDataFetching } = useAppSelector(onionWebsiteSelectors.onionWebsiteDetails);

  useEffect(() => {
    if (isEdit) {
      dispatch(onionWebsiteOperations.fetchOnionWebsite(id));
    }
  }, []);



  useEffect(() => {
    if (onionWebsiteData) {
      setValue('url', onionWebsiteData.url);
            setValue('title', onionWebsiteData.title);
            setValue('description', onionWebsiteData.description);
            setValue('scannedAt', onionWebsiteData.scannedAt);
            setValue('isCloned', onionWebsiteData.isCloned);
          }
  }, [onionWebsiteData]);

  const handleCreateOrUpdateOnionWebsite = (data: OnionWebsiteFormModalType) => {

    const formData: CreateOrUpdateOnionWebsiteType = {
      url: data.url,
            title: data.title,
            description: data.description,
            scannedAt: data.scannedAt,
            isCloned: data.isCloned,
          }

    if (isEdit) {
      dispatch(
        onionWebsiteOperations.editOnionWebsite({
          id,
          body: formData,
        }),
      )
        .unwrap()
        .then((value) => {
          enqueueSnackbar('OnionWebsite updated successfully', {
            variant: 'success',
          });
          dispatch(onionWebsiteOperations.refreshOnionWebsites());
          dispatch(onionWebsiteOperations.resetOnionWebsiteDetails());
          onClose(value);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Something went wrong', {
            variant: 'error',
          });
          onClose();
        });
    } else {
      dispatch(onionWebsiteOperations.addOnionWebsite(formData))
        .unwrap()
        .then((value) => {
          enqueueSnackbar('OnionWebsite updated successfully', {
            variant: 'success',
          });
          dispatch(onionWebsiteOperations.refreshOnionWebsites());
          dispatch(onionWebsiteOperations.resetOnionWebsiteDetails());
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
      dispatch(onionWebsiteOperations.resetOnionWebsiteDetails());
    }
    onClose();
  };


  return (
    <>
      <ModalWithTitle
        open={open}
        title="New OnionWebsite"
        subTitle="Create new OnionWebsite"
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
          onSubmit: handleSubmit(handleCreateOrUpdateOnionWebsite),
        }}
        loading={isOnionWebsiteDataFetching}
      >
      <Grid container spacing={2}>
                        <Grid xs={12} md={12} item>
          <Controller
            control={control}
            name="description"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Description"
                error={!!errors.description?.message}
                helperText={errors.description?.message}
                size="small"
                inputProps={{
                  style: {
                    height: 80,
                    overflow: 'scroll',
                  },
                }}
                multiline
                fullWidth
                autoFocus
              />
            )}
          />
        </Grid>
                <Grid xs={12} md={12} item>
          <Controller
            name="scannedAt"
            control={control}
            defaultValue={dayjs().format()}
            render={({ field }) => (
              <DateTimePicker
                dtRef={field.ref}
                label="Scanned At"
                error={!!errors.scannedAt?.message}
                helperText={errors.scannedAt?.message}
                value={dayjs(field.value)}
                onChange={(value, context) =>
                  field.onChange(value?.format(), context)
                }
              />
            )}
          />
        </Grid>
                <Grid xs={12} md={12} item>
          <Controller
            name="isCloned"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Is Cloned"
              />
            )}
          />
        </Grid>
              </Grid>
      </ModalWithTitle>
    </>
  )
}

export default OnionWebsiteFormModal;