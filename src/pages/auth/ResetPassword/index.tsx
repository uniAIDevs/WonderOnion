import {
  Alert,
  Grid,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import * as s from './styles';
import { Controller, useForm } from 'react-hook-form';
import { ResetPasswordType } from '../../../types';
import { appRoutes } from '../../../constants';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppDispatch, useResponseState } from '../../../hook';
import { authOperations } from '../../../store/slices/auth';

const ResetPasswordSchema = yup.object<ResetPasswordType>().shape({
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const ResetPassword = () => {
  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const resetPasswordToken = new URLSearchParams(search).get('token') || '';

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const resetPasswordState = useResponseState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordType>({
    defaultValues,
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onResetPassword = (data: ResetPasswordType) => {
    dispatch(
      authOperations.authResetPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
        resetPasswordToken,
      }),
    )
      .unwrap()
      .then(() => {
        resetPasswordState.success();
        reset();
      })
      .catch((e) => resetPasswordState.hasError(e));
  };

  return (
    <s.Container>
      <Typography variant="h4">Reset Password</Typography>
      <s.FormWrapper component="form" onSubmit={handleSubmit(onResetPassword)}>
        <Controller
          control={control}
          name="password"
          defaultValue={defaultValues.password}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="Password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
              type="password"
              autoFocus
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          defaultValue={defaultValues.confirmPassword}
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              fullWidth
              label="Confirm Password"
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
              type="password"
            />
          )}
        />
        {resetPasswordState.isError && (
          <Alert severity="error">
            {resetPasswordState.error?.errorMessage}
          </Alert>
        )}
        {resetPasswordState.isSuccess && (
          <Alert severity="success">Password reset successfully</Alert>
        )}
        <s.ResetPasswordButton
          type="submit"
          fullWidth
          variant="contained"
          size="large"
        >
          Reset Password
        </s.ResetPasswordButton>
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

export default ResetPassword;
