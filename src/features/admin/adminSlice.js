import api from "../../app/api";

/** Contains endpoints for admin control over users, bookings and rooms*/

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Users
    getUsers: build.query({
      query: () => "admin/users",
      transformResponse: (response) => response,
      providesTags: ["Users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Bookings
    getBookings: build.query({
      query: () => "admin/bookings",
      transformResponse: (response) => response,
      providesTags: ["Bookings"],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `admin/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: build.mutation({
      query: (id) => ({
        url: `admin/bookings/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Rooms
    getRooms: build.query({
      query: () => "admin/rooms",
      transformResponse: (response) => response,
      providesTags: ["Rooms"],
    }),
    addRoom: build.mutation({
      query: (room) => ({
        url: `admin/rooms`,
        method: "POST",
        body: room,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      invalidatesTags: ["Rooms"],
    }),
    deleteRoom: build.mutation({
      query: (id) => ({
        url: `admin/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
    updateRoom: build.mutation({
      query: (id) => ({
        url: `admin/rooms/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
  useGetRoomsQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = adminApi;

export default adminApi;
