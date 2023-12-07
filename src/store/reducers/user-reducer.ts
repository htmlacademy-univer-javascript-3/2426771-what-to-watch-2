import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { AuthorizationError, AuthorizationResponse, AuthorizationStatus } from '../../types/authorization';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  error: AuthorizationError | null;
  name: string | null;
  avatarUrl: string | null;
  email: string | null;
  token: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  name: null,
  avatarUrl: null,
  email: null,
  token: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signedIn: (state, {payload}: PayloadAction<AuthorizationResponse>) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.name = payload.name;
      state.avatarUrl = payload.avatarUrl;
      state.email = payload.email;
      state.token = payload.token;
    },
    authFailed: (state, {payload}: PayloadAction<AuthorizationError>) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.error = payload;
    },
    signedOut: (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    }
  }
});

export const { signedIn, signedOut, authFailed } = userSlice.actions;

export const getAuthStatus = (state: RootState) => state.user.authorizationStatus;
export const getAuthError = (state: RootState) => state.user.error;

export const userReducer = userSlice.reducer;

