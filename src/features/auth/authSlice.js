import { createSlice } from "@reduxjs/toolkit";
// import api from "../../app/api";
import { createApi } from "@reduxjs/toolkit/query/react";
import sharedBaseQuery from "../../app/sharedBaseQuery";

/** User Account endpoints */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: sharedBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "profile",
      providesTags: ["User"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  authApi;

/** Session storage key */ // Try to store and update the isAdmin here
const TOKEN_KEY = "token";
const IS_ADMIN = "isAdmin";

/** Stores the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  state.isAdmin = payload.admin;

  console.log(payload);

  window.sessionStorage.setItem(TOKEN_KEY, payload.token);
  window.sessionStorage.setItem(IS_ADMIN, payload.admin);
};

/** Keeps track of the JWT sent from the API */
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
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, storeToken);
    builder.addMatcher(authApi.endpoints.register.matchFulfilled, storeToken);
  },
  
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
