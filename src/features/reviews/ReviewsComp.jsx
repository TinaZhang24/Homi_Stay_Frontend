import { useGetReviewsQuery } from "./reviewSlice";
import { useParams } from "react-router-dom";
import "./Reviews.css";

/** Displays a list of reviews that belongs to all bookings of a specific room */
export default function ReviewsComp() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetReviewsQuery(roomId);
  if (!room?.review?.length) {
    return <p className="status"> This room has no reviews yet.</p>;
  }
  return (
    <>
      <div className="ReviewsBox">
        {isLoading && <p>Loading Room...</p>}
        {error && <p>{error.message}</p>}
        {room && (
          <div className="ReviewsList">
            {room.review?.map((review) => (
              <div key={review.id} className="SingleReview">
                <p>Review: {review.description}</p>
                <p>Rating: {review.rating}</p>
                <figure>
                  Image:
                  <img src={room.review.image} />
                </figure>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
