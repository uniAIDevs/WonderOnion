import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTokenType, ErrorType } from '../../../types';
import { authLogin, authRefreshToken } from './actions';
import { cookies } from '../../../utils';
import { common } from '../../../constants';

interface AuthState {
  login: {
    tokens: AuthTokenType | undefined;
    isLoading: boolean;
    error: ErrorType | undefined;
  };
}

const initialState: AuthState = {
  login: {
    tokens: {
      accessToken: cookies.get(common.KEY_ACCESS_TOKEN),
      refreshToken: cookies.get(common.KEY_REFRESH_TOKEN),
    },
    isLoading: false,
    error: undefined,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateTokens(state, action: PayloadAction<AuthTokenType>) {
      state.login.tokens = action.payload;
    },
    signOut(state) {
      state.login.tokens = undefined;
      cookies.remove(common.KEY_ACCESS_TOKEN);
      cookies.remove(common.KEY_REFRESH_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        if (action.payload) {
          state.login.tokens = action.payload;
        }
        state.login.isLoading = false;
        state.login.error = undefined;
      })
      .addCase(authLogin.rejected, (state, action) => {
        if (action.payload) {
          state.login.error = action.payload;
        }
        state.login.isLoading = false;
        state.login.tokens = undefined;
      })
      .addCase(authRefreshToken.pending, (state) => {
        state.login.isLoading = true;
      })
      .addCase(authRefreshToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.login.tokens = action.payload;
        }
        state.login.isLoading = false;
        state.login.error = undefined;
      })
      .addCase(authRefreshToken.rejected, (state, action) => {
        if (action.payload) {
          state.login.error = action.payload;
        }
        state.login.isLoading = false;
        state.login.tokens = undefined;
      });
  },
});

export const { updateTokens, signOut } = authSlice.actions;

export default authSlice.reducer;
