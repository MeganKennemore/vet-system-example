import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { LoggedInUser } from '../../models/User';

interface AppState {
  loggedInUser?: LoggedInUser;
  showBackButton: boolean;
  appHasInited: boolean;
};

const startingState: AppState = {
  loggedInUser: undefined,
  showBackButton: false,
  appHasInited: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: startingState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<LoggedInUser>) => {
      state.loggedInUser = action.payload;
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = undefined;
    },
    noBackButton: (state) => {
      state.showBackButton = false;
    },
    yesBackButton: (state) => {
      state.showBackButton = true;
    },
    setAppHasInited: (state) => {
      state.appHasInited = true;
    }
  },
});

export const {
  setLoggedInUser,
  clearLoggedInUser,
  noBackButton,
  yesBackButton,
  setAppHasInited
} = appSlice.actions;

export const selectLoggedInUser = (state: RootState) => state.app.loggedInUser;
export const selectBackButton = (state: RootState) => state.app.showBackButton;
export const selectAppHasInited = (state: RootState) => state.app.appHasInited;

export default appSlice.reducer;