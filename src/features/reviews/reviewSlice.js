import api from "../../app/api";
/** Contains endpoints for reviews */
const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    // Bookings
    getReviewBookings: build.query({
      query: () => "/bookings",
      transformResponse: (response) => response,
      providesTags: ["Bookings"],
    }),
  }),
});

export const { useGetReviewBookingsQuery } = reviewApi;
export default reviewApi;
