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

/** Session storage key */
const TOKEN_KEY = "token";

/** Stores the payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  (state.token = payload.token),
    window.sessionStorage.setItem(TOKEN_KEY, payload.token);
};

/** Keeps track of the JWT sent from the API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: window.sessionStorage.getItem(TOKEN_KEY),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      window.sessionStorage.removeItem(TOKEN_KEY);
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
