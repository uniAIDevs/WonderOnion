import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WebsiteReportDropdownType,
  WebsiteReportListType,
  WebsiteReportType,
  ErrorType,
} from '../../../types';
import {
  addWebsiteReport,
  editWebsiteReport,
  fetchWebsiteReport,
  fetchWebsiteReportDropdown,
  fetchWebsiteReports,
  refreshWebsiteReports,
} from './actions';

const FIXED_ROWS_PER_PAGE = 25;
const FIRST_PAGE_NUMBER = 0;

interface WebsiteReportState {
  list: {
    data: WebsiteReportListType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
    page: number;
    limit: number;
  };
  detail: {
    data: WebsiteReportType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
  dropdown: {
    data: WebsiteReportDropdownType[] | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
}

const initialState: WebsiteReportState = {
  list: {
    data: undefined,
    isLoading: false,
    error: undefined,
    page: FIRST_PAGE_NUMBER,
    limit: FIXED_ROWS_PER_PAGE,
  },
  detail: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
  dropdown: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
};

const websiteReportSlice = createSlice({
  name: 'websiteReport',
  initialState,
  reducers: {
    updatePageNumberAndLimit(
      state,
      action: PayloadAction<{ page: number; limit: number }>,
    ) {
      state.list.page = action.payload.page;
      state.list.limit = action.payload.limit;
    },
    resetWebsiteReportList(state) {
      state.list = initialState.list;
    },
    resetWebsiteReportDetails(state) {
      state.detail = initialState.detail;
    },
    resetWebsiteReportDropdown(state) {
      state.dropdown = initialState.dropdown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsiteReports.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(fetchWebsiteReports.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(fetchWebsiteReports.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(refreshWebsiteReports.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(refreshWebsiteReports.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(refreshWebsiteReports.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(fetchWebsiteReport.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(fetchWebsiteReport.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(fetchWebsiteReport.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(addWebsiteReport.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(addWebsiteReport.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(addWebsiteReport.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(editWebsiteReport.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(editWebsiteReport.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(editWebsiteReport.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(fetchWebsiteReportDropdown.pending, (state) => {
        state.dropdown.isLoading = true;
      })
      .addCase(fetchWebsiteReportDropdown.fulfilled, (state, action) => {
        if (action.payload) {
          state.dropdown.data = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.error = undefined;
      })
      .addCase(fetchWebsiteReportDropdown.rejected, (state, action) => {
        if (action.payload) {
          state.dropdown.error = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.data = undefined;
      });
  },
});

export const { updatePageNumberAndLimit, resetWebsiteReportList, resetWebsiteReportDetails, resetWebsiteReportDropdown } =
  websiteReportSlice.actions;

export default websiteReportSlice.reducer;
