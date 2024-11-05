import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const roomApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "/rooms",
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Room"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setRooms(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getAvailableRooms: build.query({
      query: ({ fromDate, toDate }) =>
        `/rooms/available?fromDate=${fromDate}&toDate=${toDate}`,
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      providesTags: ["Room"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setRooms(data));
        } catch (error) {
          console.log(error);
        }
      },
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

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },
  reducers: {
    setRooms: (state, { payload }) => {
      state.rooms = payload;
    },
  },
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

export const { setRooms } = roomsSlice.actions;
export const roomReducer = roomsSlice.reducer;

export default roomApi;
