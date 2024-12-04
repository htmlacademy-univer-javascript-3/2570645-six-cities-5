import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  email: null,
  avatarUrl: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    saveEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    saveAvatarUrl: (state, action: PayloadAction<string | null>) => {
      state.avatarUrl = action.payload;
    },
  },
});

export const { setAuthorizationStatus, saveEmail, saveAvatarUrl } = userProcess.actions;
