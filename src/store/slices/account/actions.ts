import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChangePasswordType, ErrorType, MyAccountType } from '../../../types';
import {
  changePassword,
  getMyAccount,
  updateMyAccount,
} from '../../../network/accountServices';

const FETCH_ACCOUNT_DETAILS = 'account/fetchMyAccount';
const EDIT_ACCOUNT = 'account/updateMyAccount';
const EDIT_PASSWORD = 'account/changePassword';

export const fetchMyAccountDetails = createAsyncThunk<
  MyAccountType | undefined,
  void,
  { rejectValue: ErrorType }
>(FETCH_ACCOUNT_DETAILS, async (_, { rejectWithValue }) => {
  try {
    const response = await getMyAccount();
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const editMyAccount = createAsyncThunk<
  void | undefined,
  MyAccountType,
  { rejectValue: ErrorType }
>(EDIT_ACCOUNT, async (body, { rejectWithValue }) => {
  try {
    const response = await updateMyAccount(body);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const editPassword = createAsyncThunk<
  void | undefined,
  ChangePasswordType,
  { rejectValue: ErrorType }
>(EDIT_PASSWORD, async (body, { rejectWithValue }) => {
  try {
    const response = await changePassword(body);
    return response;
  } catch (e: any) {
    return rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});
