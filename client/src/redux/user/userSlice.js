// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    googleSignInStart: () => {},
    emailSignInStart: (state,action) => {},
    checkUserSession: () => {},
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    signOutStart: () => {},
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    
    signOutFailure: (state, action) => {
      state.error = action.payload;
    },
    signUpStart: (state,action) => {},
    signUpSuccess: (state,action) => {},
    signUpFailure: (state, action) => {
      state.error = action.payload;
    },
    // Add other reducers if needed
  },
});

export const {
  googleSignInStart,
  emailSignInStart,
  checkUserSession,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} = userSlice.actions;

export default userSlice.reducer;
