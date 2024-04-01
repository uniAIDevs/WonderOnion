import { Alert, Grid, Typography, Link as MuiLink, Box } from '@mui/material';
import * as s from './styles';
import { appRoutes } from '../../../constants';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useResponseState } from '../../../hook';
import { authOperations } from '../../../store/slices/auth';

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { search } = useLocation();
  const emailVerifyToken = new URLSearchParams(search).get('token') || '';

  const emailVerifyState = useResponseState();

  useEffect(() => {
    if (emailVerifyToken) {
      dispatch(authOperations.authVerifyEmail(emailVerifyToken))
        .unwrap()
        .then(() => emailVerifyState.success())
        .catch((e) => emailVerifyState.hasError(e));
    }
  }, [emailVerifyToken]);

  return (
    <s.Container>
      <Typography variant="h4">Verify Email</Typography>
      <s.FormWrapper>
        <Box mt={2}>
          {emailVerifyState.isError && (
            <Alert severity="error">
              {emailVerifyState.error?.errorMessage}
            </Alert>
          )}
          {emailVerifyState.isSuccess && (
            <Alert severity="success">Email Verified Successfully</Alert>
          )}
        </Box>
        <Grid container mt={4}>
          <Grid item xs>
            <MuiLink component={Link} to={appRoutes.LOGIN} underline="none">
              Back to Login
            </MuiLink>
          </Grid>
        </Grid>
      </s.FormWrapper>
    </s.Container>
  );
};

export default VerifyEmail;
