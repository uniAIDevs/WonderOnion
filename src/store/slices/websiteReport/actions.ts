
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  BaseResponseType,
  WebsiteReportDropdownType,
  WebsiteReportListType,
  WebsiteReportType,
  CreateOrUpdateWebsiteReportType,
  ErrorType,
} from '../../../types';
import {
  createWebsiteReport,
  deleteWebsiteReport,
  getWebsiteReport,
  getWebsiteReportDropdown,
  getWebsiteReports,
  updateWebsiteReport,
} from '../../../network/websiteReportServices';
import { RootState } from '../../store';

const FETCH_WEBSITE_REPORTS = 'websiteReports/fetchWebsiteReports';
const REFETCH_WEBSITE_REPORTS = 'websiteReports/refetchWebsiteReports';
const FETCH_WEBSITE_REPORTS_DETAILS = 'websiteReports/fetchWebsiteReportDetails';
const ADD_WEBSITE_REPORTS = 'websiteReports/createWebsiteReport';
const EDIT_WEBSITE_REPORTS = 'websiteReports/updateWebsiteReport';
const REMOVE_WEBSITE_REPORTS = 'websiteReports/deleteWebsiteReport';
const FETCH_WEBSITE_REPORTS_DROPDOWN = 'websiteReports/fetchWebsiteReportsDropdown';

export const fetchWebsiteReports = createAsyncThunk<
  WebsiteReportListType | undefined,
  { page: number; limit: number; search?: string },
  { rejectValue: ErrorType }
>(FETCH_WEBSITE_REPORTS, async ({ page, limit, search }, { rejectWithValue }) => {
  try {
    const response = await getWebsiteReports(page, limit, search);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const refreshWebsiteReports = createAsyncThunk<
  WebsiteReportListType | undefined,
  void,
  { state: RootState; rejectValue: ErrorType }
>(REFETCH_WEBSITE_REPORTS, async (_, { getState, rejectWithValue }) => {
  try {
    const { page, limit } = getState().websiteReport.list;
    const response = await getWebsiteReports(page, limit);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchWebsiteReport = createAsyncThunk<
  WebsiteReportType | undefined,
  number,
  { rejectValue: ErrorType }
>(FETCH_WEBSITE_REPORTS_DETAILS, async (id, { rejectWithValue }) => {
  try {
    const response = await getWebsiteReport(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const addWebsiteReport = createAsyncThunk<
  WebsiteReportType | undefined,
  CreateOrUpdateWebsiteReportType,
  { rejectValue: ErrorType }
>(ADD_WEBSITE_REPORTS, async (websiteReport, { rejectWithValue }) => {
  try {
    const response = await createWebsiteReport(websiteReport);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const editWebsiteReport = createAsyncThunk<
  WebsiteReportType | undefined,
  { id: number; body: CreateOrUpdateWebsiteReportType },
  { rejectValue: ErrorType }
>(EDIT_WEBSITE_REPORTS, async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await updateWebsiteReport(id, body);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const removeWebsiteReport = createAsyncThunk<
  BaseResponseType | undefined,
  number,
  { rejectValue: ErrorType }
>(REMOVE_WEBSITE_REPORTS, async (id, { rejectWithValue }) => {
  try {
    const response = await deleteWebsiteReport(id);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});

export const fetchWebsiteReportDropdown = createAsyncThunk<
  WebsiteReportDropdownType[] | undefined,
  string | undefined,
  { rejectValue: ErrorType }
>(FETCH_WEBSITE_REPORTS_DROPDOWN, async (keyword, { rejectWithValue }) => {
  try {
    const response = await getWebsiteReportDropdown(keyword);
    return response;
  } catch (e: any) {
    rejectWithValue({
      status: e.code,
      errorCode: e.code,
      errorMessage: e.message,
    });
  }
});
