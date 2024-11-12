import api from "../../app/api";
/** Contains endpoints for reviews */
const reviewApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReviews: build.query({
      query: (id) => `/rooms/${id}/reviews`,
      transformResponse: (response) => response,
      providesTags: ["Room"],
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApi;
export default reviewApi;
