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
        result}),
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
