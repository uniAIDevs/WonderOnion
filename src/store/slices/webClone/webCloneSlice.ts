import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  WebCloneDropdownType,
  WebCloneListType,
  WebCloneType,
  ErrorType,
} from '../../../types';
import {
  addWebClone,
  editWebClone,
  fetchWebClone,
  fetchWebCloneDropdown,
  fetchWebClones,
  refreshWebClones,
} from './actions';

const FIXED_ROWS_PER_PAGE = 25;
const FIRST_PAGE_NUMBER = 0;

interface WebCloneState {
  list: {
    data: WebCloneListType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
    page: number;
    limit: number;
  };
  detail: {
    data: WebCloneType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
  dropdown: {
    data: WebCloneDropdownType[] | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
}

const initialState: WebCloneState = {
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

const webCloneSlice = createSlice({
  name: 'webClone',
  initialState,
  reducers: {
    updatePageNumberAndLimit(
      state,
      action: PayloadAction<{ page: number; limit: number }>,
    ) {
      state.list.page = action.payload.page;
      state.list.limit = action.payload.limit;
    },
    resetWebCloneList(state) {
      state.list = initialState.list;
    },
    resetWebCloneDetails(state) {
      state.detail = initialState.detail;
    },
    resetWebCloneDropdown(state) {
      state.dropdown = initialState.dropdown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebClones.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(fetchWebClones.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(fetchWebClones.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(refreshWebClones.pending, (state) => {
        state.list.isLoading = true;
      })
      .addCase(refreshWebClones.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.data = action.payload;
        }
        state.list.isLoading = false;
        state.list.error = undefined;
      })
      .addCase(refreshWebClones.rejected, (state, action) => {
        if (action.payload) {
          state.list.error = action.payload;
        }
        state.list.isLoading = false;
        state.list.data = undefined;
      })
      .addCase(fetchWebClone.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(fetchWebClone.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(fetchWebClone.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(addWebClone.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(addWebClone.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(addWebClone.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(editWebClone.pending, (state) => {
        state.detail.isLoading = true;
      })
      .addCase(editWebClone.fulfilled, (state, action) => {
        if (action.payload) {
          state.detail.data = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.error = undefined;
      })
      .addCase(editWebClone.rejected, (state, action) => {
        if (action.payload) {
          state.detail.error = action.payload;
        }
        state.detail.isLoading = false;
        state.detail.data = undefined;
      })
      .addCase(fetchWebCloneDropdown.pending, (state) => {
        state.dropdown.isLoading = true;
      })
      .addCase(fetchWebCloneDropdown.fulfilled, (state, action) => {
        if (action.payload) {
          state.dropdown.data = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.error = undefined;
      })
      .addCase(fetchWebCloneDropdown.rejected, (state, action) => {
        if (action.payload) {
          state.dropdown.error = action.payload;
        }
        state.dropdown.isLoading = false;
        state.dropdown.data = undefined;
      });
  },
});

export const { updatePageNumberAndLimit, resetWebCloneList, resetWebCloneDetails, resetWebCloneDropdown } =
  webCloneSlice.actions;

export default webCloneSlice.reducer;
