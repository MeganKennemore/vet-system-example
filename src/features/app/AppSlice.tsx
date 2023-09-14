import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store';
import { User } from '../../models/User';

interface AppState {
  loggedIn: boolean;
  loggedInUser?: User;
  showBackButton: boolean;
};

const startingState: AppState = {
  loggedIn: false,
  loggedInUser: undefined,
  showBackButton: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: startingState,
  reducers: {
    setLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setLoggedInUser: (state, action: PayloadAction<User>) => {
      state.loggedInUser = action.payload;
      state.loggedIn = true;
    },
    clearLoggedInUser: (state) => {
      state.loggedInUser = undefined;
      state.loggedIn = false;
    },
    noBackButton: (state) => {
      state.showBackButton = false;
    },
    yesBackButton: (state) => {
      state.showBackButton = true;
    },
  },
});

export const {
  setLoggedIn,
  setLoggedInUser,
  clearLoggedInUser,
  noBackButton,
  yesBackButton
} = appSlice.actions;

export const selectLoggedIn = (state: RootState) => state.app.loggedIn;
export const selectLoggedInUser = (state: RootState) => state.app.loggedInUser;
export const selectBackButton = (state: RootState) => state.app.showBackButton;

export default appSlice.reducer;