import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    // to add {getState} as second parameter
    prepareHeaders: (headers) => {
      //   const token = getState().auth.token;
      //   token && headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
  // to add "Auth" and others needed.
  tagTypes: ["Room"],
});

export default api;
