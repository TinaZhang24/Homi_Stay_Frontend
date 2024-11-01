import api from "../../app/api";

const roomApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "/rooms",
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Room"],
    }),
    // available?fromDate=2024-10-29&toDate=2024-11-05
    getAvailableRooms: build.query({
      query: ({ fromDate, toDate }) =>
        // to check correctness?
        `/rooms/available?fromDate=${fromDate}&toDate=${toDate}`,
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: [
        ["Room"],
        (result, error, fromDate, toDate) => [
          { type: "Room", fromDate, toDate },
        ],
      ],
    }),

    getRoom: build.query({
      query: (id) => (id ? `/rooms/${id}` : null),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: [["Room"], (result, error, id) => [{ type: "Room", id }]],
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomQuery, useGetAvailableRoomsQuery } =
  roomApi;

export default roomApi;
