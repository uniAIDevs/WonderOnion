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
  CreateOrUpdateWebsiteReportType,
  WebsiteReportType,
  WebsiteReportFormModalType,
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
  websiteReportOperations,
  websiteReportSelectors,
} from '../../../../store/slices/websiteReport';

import { onionWebsiteOperations, onionWebsiteSelectors } from '../../../../store/slices/onionWebsite';

export interface WebsiteReportFormModalProps {
  open: boolean;
  onClose: (websiteReport?: WebsiteReportType) => void;
  id?: number;
}

const WebsiteReportSchema = yup
  .object<WebsiteReportFormModalType>()
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
        reportContent: yup.string(),
            reportedAt: yup.string(),
          })
  .required();

const WebsiteReportFormModal: React.FC<WebsiteReportFormModalProps> = ({
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
  } = useForm<WebsiteReportFormModalType>({
    resolver: yupResolver(WebsiteReportSchema),
  });

  const { data: websiteReportData, isLoading: isWebsiteReportDataFetching } = useAppSelector(websiteReportSelectors.websiteReportDetails);

  useEffect(() => {
    if (isEdit) {
      dispatch(websiteReportOperations.fetchWebsiteReport(id));
    }
  }, []);


    const {
      data: onionWebsiteList,
      isLoading: isOnionWebsiteFetching,
    } = useAppSelector(onionWebsiteSelectors.onionWebsiteDropdown);


  useEffect(() => {
    if (websiteReportData) {
      setValue('onionWebsite', {
        id: websiteReportData.onionWebsite.id,
        url: websiteReportData.onionWebsite.url
      });
      setOnionWebsiteSearchText(websiteReportData.onionWebsite.url)
            setValue('reportContent', websiteReportData.reportContent);
            setValue('reportedAt', websiteReportData.reportedAt);
          }
  }, [websiteReportData]);

  const handleCreateOrUpdateWebsiteReport = (data: WebsiteReportFormModalType) => {

    const formData: CreateOrUpdateWebsiteReportType = {
      onionWebsiteId: data.onionWebsite.id,
            reportContent: data.reportContent,
            reportedAt: data.reportedAt,
          }

    if (isEdit) {
      dispatch(
        websiteReportOperations.editWebsiteReport({
          id,
          body: formData,
        }),
      )
        .unwrap()
        .then((value) => {
          enqueueSnackbar('WebsiteReport updated successfully', {
            variant: 'success',
          });
          dispatch(websiteReportOperations.refreshWebsiteReports());
          dispatch(websiteReportOperations.resetWebsiteReportDetails());
          onClose(value);
        })
        .catch((error) => {
          enqueueSnackbar(error.message || 'Something went wrong', {
            variant: 'error',
          });
          onClose();
        });
    } else {
      dispatch(websiteReportOperations.addWebsiteReport(formData))
        .unwrap()
        .then((value) => {
          enqueueSnackbar('WebsiteReport updated successfully', {
            variant: 'success',
          });
          dispatch(websiteReportOperations.refreshWebsiteReports());
          dispatch(websiteReportOperations.resetWebsiteReportDetails());
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
      dispatch(websiteReportOperations.resetWebsiteReportDetails());
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
        title="New WebsiteReport"
        subTitle="Create new WebsiteReport"
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
          onSubmit: handleSubmit(handleCreateOrUpdateWebsiteReport),
        }}
        loading={isWebsiteReportDataFetching}
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
            control={control}
            name="reportContent"
            defaultValue={''}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Report Content"
                error={!!errors.reportContent?.message}
                helperText={errors.reportContent?.message}
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
            name="reportedAt"
            control={control}
            defaultValue={dayjs().format()}
            render={({ field }) => (
              <DateTimePicker
                dtRef={field.ref}
                label="Reported At"
                error={!!errors.reportedAt?.message}
                helperText={errors.reportedAt?.message}
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

export default WebsiteReportFormModal;