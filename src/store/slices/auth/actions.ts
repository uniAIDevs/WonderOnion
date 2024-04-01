import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthTokenType,
  BaseResponseType,
  ErrorType,
  LoginType,
  RegisterType,
  ResetPasswordType,
} from '../../../types';
import {
  forgotPassword,
  login,
  refreshToken,
  register,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
} from '../../../network/authServices';
import { RootState } from '../../store';
import { cookies } from '../../../utils';
import { common } from '../../../constants';

const LOGIN = 'auth/login';
const REFRESH_TOKEN = 'auth/refreshToken';
const REGISTER = 'auth/register';
const FORGOT_PASSWORD = 'auth/forgotPassword';
const RESET_PASSWORD = 'auth/resetPassword';
const VERIFY_EMAIL = 'auth/verifyEmail';
const RESEND_VERIFY_EMAIL = 'auth/resendVerifyEmail';

export const authLogin = createAsyncThunk<
  AuthTokenType | undefined,
  LoginType,
  { rejectValue: ErrorType }
>(LOGIN, async (params, { rejectWithValue }) => {
  try {
    const response = await login(params);

    cookies.set(common.KEY_ACCESS_TOKEN, response.accessToken);
    cookies.set(common.KEY_REFRESH_TOKEN, response.refreshToken);

    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authRefreshToken = createAsyncThunk<
  AuthTokenType | undefined,
  void,
  { state: RootState; rejectValue: ErrorType }
>(REFRESH_TOKEN, async (_, { getState, rejectWithValue }) => {
  try {
    const refreshTokenValue = getState().auth.login.tokens?.refreshToken;
    const response = await refreshToken(refreshTokenValue || '');

    cookies.set(common.KEY_ACCESS_TOKEN, response.accessToken);
    cookies.set(common.KEY_REFRESH_TOKEN, response.refreshToken);

    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authRegister = createAsyncThunk<
  BaseResponseType | undefined,
  RegisterType,
  { rejectValue: ErrorType }
>(REGISTER, async (params, { rejectWithValue }) => {
  try {
    const response = await register(params);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authForgotPassword = createAsyncThunk<
  void | undefined,
  string,
  { rejectValue: ErrorType }
>(FORGOT_PASSWORD, async (email, { rejectWithValue }) => {
  try {
    const response = await forgotPassword(email);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authResetPassword = createAsyncThunk<
  void | undefined,
  ResetPasswordType,
  { rejectValue: ErrorType }
>(RESET_PASSWORD, async (params, { rejectWithValue }) => {
  try {
    const response = await resetPassword(params);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authVerifyEmail = createAsyncThunk<
  void | undefined,
  string,
  { rejectValue: ErrorType }
>(VERIFY_EMAIL, async (verifyEmailToken, { rejectWithValue }) => {
  try {
    const response = await verifyEmail(verifyEmailToken);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});

export const authResetVerifyEmail = createAsyncThunk<
  void | undefined,
  string,
  { rejectValue: ErrorType }
>(RESEND_VERIFY_EMAIL, async (email, { rejectWithValue }) => {
  try {
    const response = await resendVerificationEmail(email);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.errorCode,
      errorCode: e.code,
      errorMessage: e.errorMessage,
    });
  }
});
