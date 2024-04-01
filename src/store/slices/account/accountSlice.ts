import { createSlice } from '@reduxjs/toolkit';
import { fetchMyAccountDetails } from './actions';
import { ErrorType, MyAccountType } from '../../../types';

interface AccountState {
  details: {
    data: MyAccountType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
}

const initialState: AccountState = {
  details: {
    data: undefined,
    isLoading: false,
    error: undefined,
  },
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAccountDetails.pending, (state) => {
        state.details.isLoading = true;
      })
      .addCase(fetchMyAccountDetails.fulfilled, (state, action) => {
        if (action.payload) {
          state.details.data = action.payload;
        }
        state.details.isLoading = false;
        state.details.error = undefined;
      })
      .addCase(fetchMyAccountDetails.rejected, (state, action) => {
        if (action.payload) {
          state.details.error = action.payload;
        }
        state.details.isLoading = false;
        state.details.data = undefined;
      });
  },
});

export default accountSlice.reducer;
