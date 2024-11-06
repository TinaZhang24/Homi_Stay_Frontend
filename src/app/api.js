import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/admin/users",
    }),
  }),
  // to add other tagTypes needed.
  tagTypes: ["Room", "Auth"],
});

export const { useGetAllUsersQuery } = api;
export default api;
