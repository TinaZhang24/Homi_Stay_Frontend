import api from "../../app/api";

/** Contains endpoints for both rooms and bookings */
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
      // providesTags: [
      // ["Room"],
      // (result, error, fromDate, toDate) => [
      //   { type: "Room", fromDate, toDate },
      // ],
      // ],
    }),

    getRoom: build.query({
      query: (id) => (id ? `/rooms/${id}` : null),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: [["Room"], (result, error, id) => [{ type: "Room", id }]],
    }),

    // Bookings

    getBookings: build.query({
      query: () => "/bookings",
      transformResponse: (response) => response.reservation,
      providesTags: ["Bookings"],
    }),

    // bookingRoom: build.mutation({
    //     query: (id) => ({
    //       url: `/bookings/${id}`,
    //       method: "PATCH",
    //       body: { available: false },
    //     }),
    //     invalidatesTags: ["Rooms", "Bookings"],
    //   }),

    addBooking: build.mutation({
      query: (bookingRoom) => ({
        url: "/bookings/:id",
        method: "POST",
        body: bookingRoom,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      invalidatesTags: ["Bookings"],
    }),

    cancelBooking: build.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms", "Bookings"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomQuery,
  useGetAvailableRoomsQuery,
  useGetBookingsQuery,
  useAddBookingMutation,
  //   useBookingRoomMutation,
  useCancelBookingMutation,
} = roomApi;

export default roomApi;
