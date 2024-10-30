import api from "../../app/api";

const roomApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "/rooms",
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Room"],
    }),
  }),
});

export const { useGetRoomsQuery } = roomApi;

export default roomApi;
