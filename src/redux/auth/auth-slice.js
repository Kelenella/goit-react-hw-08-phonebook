import { createSlice } from '@reduxjs/toolkit';
import { logIn, logOut, fetchCurrentUser } from './auth-operations';
import {
  loginSuccess,
  loginError,
  registerSuccess,
  registerError,
} from './auth-action';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  // isFetchCurrentUser: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerSuccess](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },

    [registerError](state, { payload }) {
      state.error = payload.message;
    },

    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },

    [logOut.fulfilled](state, _) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },

    [fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
    },

    [loginSuccess](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [loginError](state, { payload }) {
      state.error = payload.message;
    },
  },
});

export default authSlice.reducer;
