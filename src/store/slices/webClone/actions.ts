
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BaseResponseType,
  WebCloneDropdownType,
  WebCloneListType,
  WebCloneType,
  CreateOrUpdateWebCloneType,
  ErrorType,
} from '../../../types';
import {
  createWebClone,
  deleteWebClone,
  getWebClone,
  getWebCloneDropdown,
  getWebClones,
  updateWebClone,
} from '../../../network/webCloneServices';
import { RootState } from '../../store';

const FETCH_WEB_CLONES = 'webClones/fetchWebClones';
const REFETCH_WEB_CLONES = 'webClones/refetchWebClones';
const FETCH_WEB_CLONES_DETAILS = 'webClones/fetchWebCloneDetails';
const ADD_WEB_CLONES = 'webClones/createWebClone';
const EDIT_WEB_CLONES = 'webClones/updateWebClone';
const REMOVE_WEB_CLONES = 'webClones/deleteWebClone';
const FETCH_WEB_CLONES_DROPDOWN = 'webClones/fetchWebClonesDropdown';

export const fetchWebClones = createAsyncThunk<
  WebCloneListType | undefined,
  { page: number; limit: number; search?: string },
  { rejectValue: ErrorType }
>(FETCH_WEB_CLONES, async ({ page, limit, search }, { rejectWithValue }) => {
  try {
    const response = await getWebClones(page, limit, search);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const refreshWebClones = createAsyncThunk<
  WebCloneListType | undefined,
  void,
  { state: RootState; rejectValue: ErrorType }
>(REFETCH_WEB_CLONES, async (_, { getState, rejectWithValue }) => {
  try {
    const { page, limit } = getState().webClone.list;
    const response = await getWebClones(page, limit);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchWebClone = createAsyncThunk<
  WebCloneType | undefined,
  number,
  { rejectValue: ErrorType }
>(FETCH_WEB_CLONES_DETAILS, async (id, { rejectWithValue }) => {
  try {
    const response = await getWebClone(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const addWebClone = createAsyncThunk<
  WebCloneType | undefined,
  CreateOrUpdateWebCloneType,
  { rejectValue: ErrorType }
>(ADD_WEB_CLONES, async (webClone, { rejectWithValue }) => {
  try {
    const response = await createWebClone(webClone);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const editWebClone = createAsyncThunk<
  WebCloneType | undefined,
  { id: number; body: CreateOrUpdateWebCloneType },
  { rejectValue: ErrorType }
>(EDIT_WEB_CLONES, async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await updateWebClone(id, body);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const removeWebClone = createAsyncThunk<
  BaseResponseType | undefined,
  number,
  { rejectValue: ErrorType }
>(REMOVE_WEB_CLONES, async (id, { rejectWithValue }) => {
  try {
    const response = await deleteWebClone(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchWebCloneDropdown = createAsyncThunk<
  WebCloneDropdownType[] | undefined,
  string | undefined,
  { rejectValue: ErrorType }
>(FETCH_WEB_CLONES_DROPDOWN, async (keyword, { rejectWithValue }) => {
  try {
    const response = await getWebCloneDropdown(keyword);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});
