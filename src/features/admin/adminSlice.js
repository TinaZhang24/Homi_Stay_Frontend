import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import  sharedBaseQuery  from '../../app/sharedBaseQuery';


const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: sharedBaseQuery,
  tagTypes: ["User", "Booking", "Room"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/admin/users",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "User", id })), { type: "User", id: "LIST" }]
          : [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getAllBookings: builder.query({
      query: () => "/admin/bookings",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Booking", id })), { type: "Booking", id: "LIST" }]
          : [{ type: "Booking", id: "LIST" }],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/admin/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),
    getAllRooms: builder.query({
      query: () => "/admin/rooms",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Room", id })), { type: "Room", id: "LIST" }]
          : [{ type: "Room", id: "LIST" }],
    }),
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/admin/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Room", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useGetAllRoomsQuery,
  useDeleteRoomMutation,
} = adminApi;
export default adminApi;
