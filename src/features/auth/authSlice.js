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

// Keys to store and retrieve values in the browser's sessionStorage //
const TOKEN_KEY = "token"; // stores the JWT
const IS_ADMIN = "isAdmin"; // stores the boolean value that indicates whether the user has admin privileges

// Stores the payload's token and isAdmin boolean value in state
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.isAdmin = payload.admin;
  // syncs these data with session storage for persistence across page reloads
  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
  window.sessionStorage.setItem(IS_ADMIN, payload.admin);
};

/** Keeps track of the JWT token and isAdmin status sent from the API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY), // Retrieve token from sessionStorage if available
    isAdmin: false, // Default value for isAdmin unless specified during login or registration
  },
  reducers: {
    logout: (state) => {
      state.token = null; // Remove token from Redux state
      window.sessionStorage.removeItem(TOKEN_KEY); // Remove token from sessionStorage
      window.sessionStorage.removeItem(IS_ADMIN); // Remove isAdmin from sessionStorage
    },
  },
  /** These `extraReducers` auto update the token
   * when the RTK Query mutations are fulfilled.
   */
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken); // When the login query is successful(promise fulfilled),storeToken function is triggered, refer to line 32.
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken); // When the register query is successful(promise fulfilled), storeToken function is triggered, refer to line 32.
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
