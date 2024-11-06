import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

/** Contains endpoints for admins control over users, rooms and bookings */

//Users
const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "/users",
      transformResponse: (response) => response,
      providesTags: ["Users"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = adminApi;
