import { useState } from 'react';
import {
  Button,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as s from './styles';
import { LoginType } from '../../../types';
import { appRoutes } from '../../../constants';
import { Alert } from '../../../components/action';
import { useAppDispatch, useResponseState } from '../../../hook';
import { authOperations } from '../../../store/slices/auth';

const LoginSchema = yup
  .object<LoginType>()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    email: '',
    password: '',
  };

  const loginState = useResponseState();
  const resendVerificationState = useResponseState();

  const [email, setEmail] = useState<string>();
  const [isResendEmailSent, setResendEmailSent] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });

  const onLogin = (data: LoginType) => {
    dispatch(authOperations.authLogin(data))
      .unwrap()
      .then(() => {
        loginState.success();
        navigate(appRoutes.HOME);
      })
      .catch((e) => loginState.hasError(e));
    setEmail(data.email);
    setResendEmailSent(false);
  };

  const handleResend = () => {
    if (email) {
      dispatch(authOperations.authResetVerifyEmail(email));
      setResendEmailSent(true);
    }
  };

  return (
    <s.Container>
      <Typography variant="h4">Login</Typography>
      <s.FormWrapper component="form" onSubmit={handleSubmit(onLogin)}>
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
              error={!!errors.email?.message}
              helperText={errors.email?.message}
              autoFocus
            />
          )}
        />
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
              type="password"
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Alert
          isError={!!resendVerificationState.isError}
          isSuccess={resendVerificationState.isSuccess}
          error={resendVerificationState.error}
          successMessage="Email resend successfully"
        />
        {!isResendEmailSent && (
          <Alert
            isError={!!loginState.isError}
            isSuccess={loginState.isSuccess}
            error={loginState.error}
            action={
              loginState.error?.errorMessage === 'Email is not verified' ? (
                <Button color="inherit" size="small" onClick={handleResend}>
                  RESEND EMAIL
                </Button>
              ) : undefined
            }
          />
        )}
        <Stack spacing={2} my={2} alignItems={'center'}>
          <s.LoginButton
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Login
          </s.LoginButton>
        </Stack>
        <Stack
          direction={{
            sm: 'column',
            md: 'row',
          }}
          justifyContent={'space-between'}
        >
          <MuiLink
            component={Link}
            to={appRoutes.FORGOT_PASSWORD}
            underline="none"
          >
            Forgot password?
          </MuiLink>
          <MuiLink component={Link} to={appRoutes.SIGN_UP} underline="none">
            {"Don't have an account? Register"}
          </MuiLink>
        </Stack>
      </s.FormWrapper>
    </s.Container>
  );
};

export default Login;
