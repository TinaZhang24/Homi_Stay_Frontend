import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

/** Contains endpoints for rooms, bookings and reviews */
// Rooms
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
          // data is passed as the payload to the reducer(setRooms).
          // reducer name(setRooms) ties with line 95(where we set up reducer in the slice).
          dispatch(setRooms(data)); // dispatch its own data to the correct reducer
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
      transformResponse: (response) => response,
      providesTags: ["Bookings"],
    }),

    addBooking: build.mutation({
      query: (bookingRoom) => ({
        url: `/bookings`,
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

    // Reviews:
    addReview: build.mutation({
      query: (review) => ({
        url: `/bookings/reviews`,
        method: "POST",
        body: review,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response.error,
      invalidatesTags: ["Reviews"],
    }),
  }),
});

// Set up state, reducer and action to handle available rooms. The payload gets changing response/data from API(available rooms)
// The reducer (action) updates the state with the payload (fetched data from API)
const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },
  reducers: {
    // Reducer name(setRooms) ties with line 33 (where we pass the data as payload)
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
  useCancelBookingMutation,
  useAddReviewMutation,
} = roomApi;

export const { setRooms } = roomsSlice.actions;
export const roomReducer = roomsSlice.reducer;
export default roomApi;
