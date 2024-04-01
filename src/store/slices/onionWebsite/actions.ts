
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BaseResponseType,
  OnionWebsiteDropdownType,
  OnionWebsiteListType,
  OnionWebsiteType,
  CreateOrUpdateOnionWebsiteType,
  ErrorType,
} from '../../../types';
import {
  createOnionWebsite,
  deleteOnionWebsite,
  getOnionWebsite,
  getOnionWebsiteDropdown,
  getOnionWebsites,
  updateOnionWebsite,
} from '../../../network/onionWebsiteServices';
import { RootState } from '../../store';

const FETCH_ONION_WEBSITES = 'onionWebsites/fetchOnionWebsites';
const REFETCH_ONION_WEBSITES = 'onionWebsites/refetchOnionWebsites';
const FETCH_ONION_WEBSITES_DETAILS = 'onionWebsites/fetchOnionWebsiteDetails';
const ADD_ONION_WEBSITES = 'onionWebsites/createOnionWebsite';
const EDIT_ONION_WEBSITES = 'onionWebsites/updateOnionWebsite';
const REMOVE_ONION_WEBSITES = 'onionWebsites/deleteOnionWebsite';
const FETCH_ONION_WEBSITES_DROPDOWN = 'onionWebsites/fetchOnionWebsitesDropdown';

export const fetchOnionWebsites = createAsyncThunk<
  OnionWebsiteListType | undefined,
  { page: number; limit: number; search?: string },
  { rejectValue: ErrorType }
>(FETCH_ONION_WEBSITES, async ({ page, limit, search }, { rejectWithValue }) => {
  try {
    const response = await getOnionWebsites(page, limit, search);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const refreshOnionWebsites = createAsyncThunk<
  OnionWebsiteListType | undefined,
  void,
  { state: RootState; rejectValue: ErrorType }
>(REFETCH_ONION_WEBSITES, async (_, { getState, rejectWithValue }) => {
  try {
    const { page, limit } = getState().onionWebsite.list;
    const response = await getOnionWebsites(page, limit);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchOnionWebsite = createAsyncThunk<
  OnionWebsiteType | undefined,
  number,
  { rejectValue: ErrorType }
>(FETCH_ONION_WEBSITES_DETAILS, async (id, { rejectWithValue }) => {
  try {
    const response = await getOnionWebsite(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const addOnionWebsite = createAsyncThunk<
  OnionWebsiteType | undefined,
  CreateOrUpdateOnionWebsiteType,
  { rejectValue: ErrorType }
>(ADD_ONION_WEBSITES, async (onionWebsite, { rejectWithValue }) => {
  try {
    const response = await createOnionWebsite(onionWebsite);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const editOnionWebsite = createAsyncThunk<
  OnionWebsiteType | undefined,
  { id: number; body: CreateOrUpdateOnionWebsiteType },
  { rejectValue: ErrorType }
>(EDIT_ONION_WEBSITES, async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await updateOnionWebsite(id, body);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const removeOnionWebsite = createAsyncThunk<
  BaseResponseType | undefined,
  number,
  { rejectValue: ErrorType }
>(REMOVE_ONION_WEBSITES, async (id, { rejectWithValue }) => {
  try {
    const response = await deleteOnionWebsite(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchOnionWebsiteDropdown = createAsyncThunk<
  OnionWebsiteDropdownType[] | undefined,
  string | undefined,
  { rejectValue: ErrorType }
>(FETCH_ONION_WEBSITES_DROPDOWN, async (keyword, { rejectWithValue }) => {
  try {
    const response = await getOnionWebsiteDropdown(keyword);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});
