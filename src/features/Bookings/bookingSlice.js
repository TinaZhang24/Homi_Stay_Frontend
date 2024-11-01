import api from "../../app/api";
/** Contains endpoints for  bookings */
const bookingApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBookings: build.query({
      query: () => "/bookings",
      transformResponse: (response) => response.reservation,
      providesTags: ["Bookings"],
    }),
    bookingRoom: build.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PATCH",
        body: { available: false },
      }),
      invalidatesTags: ["Rooms", "Bookings"],
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
  useGetBookingsQuery,
  useBookingRoomMutation,
  useCancelBookingMutation,
} = bookingApi;
