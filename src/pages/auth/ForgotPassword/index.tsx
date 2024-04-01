import {
  Alert,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import * as s from './styles';
import { Controller, useForm } from 'react-hook-form';
import { ForgotPasswordType } from '../../../types';
import { appRoutes } from '../../../constants';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useResponseState } from '../../../hook';
import { authOperations } from '../../../store/slices/auth';

const ForgotPasswordSchema = yup.object<ForgotPasswordType>().shape({
  email: yup
    .string()
    .email('Enter valid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  const response = useResponseState();

  const defaultValues = {
    email: '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    defaultValues,
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onForgotPassword = (data: ForgotPasswordType) => {
    dispatch(authOperations.authForgotPassword(data.email))
      .unwrap()
      .then(() => response.success())
      .catch((e) => response.hasError(e));
  };

  return (
    <s.Container>
      <Typography variant="h4">Forgot Password</Typography>
      <s.FormWrapper component="form" onSubmit={handleSubmit(onForgotPassword)}>
        <Controller
          control={control}
          name="email"
          defaultValue={defaultValues.email}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
          )}
        />
        {response.isError && (
          <Alert severity="error">{response.error?.errorMessage}</Alert>
        )}
        {response.isSuccess && (
          <Alert severity="success">Reset password email sent</Alert>
        )}
        <s.ForgotPasswordButton
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Forgot Password
        </s.ForgotPasswordButton>
        <Grid container>
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

export default ForgotPassword;
