import api from "../../app/api";

const roomApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "/rooms",
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Room"],
    }),
    // getRoom: build.query({
    //   query: (id) => (id ? `/rooms/${id}` : null),
    //   transformResponse: (response) => response,
    //   transformErrorResponse: (response) => response.error,
    //   providesTags: [["Room"], (result, error, id) => [{ type: "Room", id }]],
    // }),
  }),
});

export const { useGetRoomsQuery } = roomApi;

export default roomApi;
