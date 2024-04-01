import {
  AuthTokenType,
  BaseResponseType,
  LoginType,
  RegisterType,
  ResetPasswordType,
} from '../types';
import queryAsync from './apiClient';

export const register = (params: RegisterType) => {
  return queryAsync<BaseResponseType>({
    path: `/auth/register`,
    type: 'POST',
    data: { ...params },
  });
};

export const login = (params: LoginType) => {
  return queryAsync<AuthTokenType>({
    path: `/auth/login`,
    type: 'POST',
    data: { ...params },
  });
};

export const refreshToken = (refreshToken: string) => {
  return queryAsync<AuthTokenType>({
    path: `/auth/refresh-token`,
    type: 'POST',
    data: { refreshToken },
  });
};

export const forgotPassword = (email: string) => {
  return queryAsync<void>({
    path: `/auth/forgot-password`,
    type: 'POST',
    data: { email },
  });
};

export const resetPassword = (params: ResetPasswordType) => {
  return queryAsync<void>({
    path: `/auth/reset-password/${params.resetPasswordToken}`,
    type: 'POST',
    data: {
      password: params.password,
      confirmPassword: params.confirmPassword,
    },
  });
};

export const verifyEmail = (verifyEmailToken: string) => {
  return queryAsync<void>({
    path: `/auth/email-verify/${verifyEmailToken}`,
    type: 'GET',
  });
};

export const resendVerificationEmail = (email: string) => {
  return queryAsync<void>({
    path: `/auth/resend-verification-email`,
    type: 'POST',
    data: {
      email,
    },
  });
};
