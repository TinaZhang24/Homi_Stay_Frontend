import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

/** User Account endpoints */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation } = authApi;

// Session storage key/property //
const TOKEN_KEY = "token";
const IS_ADMIN = "isAdmin";

// Stores the payload's token and isAdmin boolean value in state and session storage //
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.isAdmin = payload.admin;
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
  window.sessionStorage.setItem(IS_ADMIN, payload.admin);
};

/** Keeps track of the JWT and isAdmin sent from the API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
    isAdmin: false,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.removeItem(IS_ADMIN);
    },
  },
  /** These `extraReducers` auto update the token
   * when the RTK Query mutations are fulfilled.
   */
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
