import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const sharedBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default sharedBaseQuery;
