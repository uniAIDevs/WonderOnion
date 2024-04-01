import { Box, Container, Stack, Typography } from '@mui/material';

import { ChangePasswordType, MyAccountType } from '../../../types';
import { CircularProgress } from '../../../components/ui';
import { Alert } from '../../../components/action';
import {
  ChangePasswordFormModal,
  MyAccountFormModal,
} from '../../../components/account';
import {
  useAppDispatch,
  useAppSelector,
  useResponseState,
} from '../../../hook';
import {
  accountOperations,
  accountSelectors,
} from '../../../store/slices/account';

const MyAccount = () => {
  const dispatch = useAppDispatch();

  const {
    isLoading,
    data: defaultValues,
    error,
  } = useAppSelector(accountSelectors.accountDetails);

  const changePasswordState = useResponseState();

  const handleSubmit = (data: MyAccountType) => {
    dispatch(accountOperations.editMyAccount(data));
  };

  const handleChangePassword = (data: ChangePasswordType) => {
    changePasswordState.loading();
    dispatch(accountOperations.editPassword(data))
      .unwrap()
      .then(() => changePasswordState.success())
      .catch((e) => changePasswordState.hasError(e));
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">My Account</Typography>
          </div>
          <Stack spacing={3}>
            {isLoading ? (
              <CircularProgress />
            ) : defaultValues ? (
              <>
                <Alert
                  isError={!!error}
                  isSuccess={!error}
                  error={error}
                  successMessage="Account info update successfully"
                />
                <Alert
                  isError={!!changePasswordState.isError}
                  isSuccess={changePasswordState.isSuccess}
                  error={changePasswordState.error}
                  successMessage="Password Changed successfully"
                />
                <MyAccountFormModal
                  defaultValues={defaultValues}
                  onSubmit={handleSubmit}
                />
                <ChangePasswordFormModal
                  onSubmit={handleChangePassword}
                  isLoading={!!changePasswordState.isLoading}
                />
              </>
            ) : null}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default MyAccount;
