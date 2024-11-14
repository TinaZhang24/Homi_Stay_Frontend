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
    getUser: build.query({
      query: (id) => ({
        url: `admin/users/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
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
    getAdminBookings: build.query({
      query: () => "admin/bookings",
      transformResponse: (response) => response,
      providesTags: ["Bookings"],
    }),
    getAdminBooking: build.query({
      query: (id) => ({
        url: `admin/bookings/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Bookings"],
    }),
    deleteAdminBooking: build.mutation({
      query: (id) => ({
        url: `admin/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateAdminBooking: build.mutation({
      query: (id) => ({
        url: `admin/bookings/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Bookings"],
    }),

    // Rooms
    getAdminRooms: build.query({
      query: () => "admin/rooms",
      transformResponse: (response) => response,
      providesTags: ["Rooms"],
    }),
    getAdminRoom: build.query({
      query: (id) => ({
        url: `admin/rooms/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Rooms"],
    }),
    addAdminRoom: build.mutation({
      query: (room) => ({
        url: `admin/rooms`,
        method: "POST",
        body: room,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      invalidatesTags: ["Rooms"],
    }),
    deleteAdminRoom: build.mutation({
      query: (id) => ({
        url: `admin/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rooms"],
    }),
    updateAdminRoom: build.mutation({
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
  useGetUserQuery,
  useDeleteUserMutation,
  useGetAdminBookingsQuery,
  useGetAdminBookingQuery,
  useDeleteAdminBookingMutation,
  useUpdateAdminBookingMutation,
  useGetAdminRoomsQuery,
  useGetAdminRoomQuery,
  useAddAdminRoomMutation,
  useDeleteAdminRoomMutation,
  useUpdateAdminRoomMutation,
} = adminApi;

export default adminApi;
