import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OnionWebsiteDropdownType,
  OnionWebsiteListType,
  OnionWebsiteType,
  ErrorType,
} from '../../../types';
import {
  addOnionWebsite,
  editOnionWebsite,
  fetchOnionWebsite,
  fetchOnionWebsiteDropdown,
  fetchOnionWebsites,
  refreshOnionWebsites,
} from './actions';

const FIXED_ROWS_PER_PAGE = 25;
const FIRST_PAGE_NUMBER = 0;

interface OnionWebsiteState {
  list: {
    data: OnionWebsiteListType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
    page: number;
    limit: number;
  };
  detail: {
    data: OnionWebsiteType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
  dropdown: {
    data: OnionWebsiteDropdownType[] | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
}

const initialState: OnionWebsiteState = {
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

const onionWebsiteSlice = createSlice({
  name: 'onionWebsite',
  initialState,
  reducers: {
    updatePageNumberAndLimit(
      state,
      action: PayloadAction<{ page: number; limit: number }>,
    ) {
      state.list.page = action.payload.page;
      state.list.limit = action.payload.limit;
    },
    resetOnionWebsiteList(state) {
      state.list = initialState.list;
    },
    resetOnionWebsiteDetails(state) {
      state.detail = initialState.detail;
    },
    resetOnionWebsiteDropdown(state) {
      state.dropdown = initialState.dropdown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnionWebsites.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(fetchOnionWebsites.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(fetchOnionWebsites.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(refreshOnionWebsites.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(refreshOnionWebsites.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(refreshOnionWebsites.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(fetchOnionWebsite.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(fetchOnionWebsite.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(fetchOnionWebsite.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(addOnionWebsite.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(addOnionWebsite.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(addOnionWebsite.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(editOnionWebsite.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(editOnionWebsite.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(editOnionWebsite.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(fetchOnionWebsiteDropdown.pending, (state) => {
        state.dropdown.isLoading = true;
      })
      .addCase(fetchOnionWebsiteDropdown.fulfilled, (state, action) => {
        if (action.payload) {
          state.dropdown.data = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.error = undefined;
      })
      .addCase(fetchOnionWebsiteDropdown.rejected, (state, action) => {
        if (action.payload) {
          state.dropdown.error = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.data = undefined;
      });
  },
});

export const { updatePageNumberAndLimit, resetOnionWebsiteList, resetOnionWebsiteDetails, resetOnionWebsiteDropdown } =
  onionWebsiteSlice.actions;

export default onionWebsiteSlice.reducer;
