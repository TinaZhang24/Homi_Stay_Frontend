import { useGetReviewsQuery } from "./reviewSlice";
import { useParams } from "react-router-dom";
import "./Reviews.css";

/** Displays a list of reviews that belongs to all bookings of a specific room */
export default function Reviews() {
  const { roomId } = useParams();
  const { data: room, isLoading, error } = useGetReviewsQuery(roomId);

  return (
    <>
      <div className="ReviewsList">
        {isLoading && <p>Loading Room...</p>}
        {error && <p>{error.message}</p>}
        {room && (
          <div className="roomReviews">
            <p>Room Name: {room.roomName}</p>
            <p>Room Type: {room.type}</p>
            <p>
              Review:
              {room.review?.map((review) => (
                <span> {review.description}</span>
              ))}
            </p>
            <p>
              Rating:
              {room.review?.map((review) => (
                <span> {review.rating}</span>
              ))}
            </p>
            Image:
            {room.review?.map((review) => (
              <figure>
                <img src={room.review.image} />
              </figure>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
