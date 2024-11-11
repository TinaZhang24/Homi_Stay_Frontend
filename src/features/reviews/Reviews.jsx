import { useGetReviewBookingsQuery } from "./reviewSlice";
import { useParams } from "react-router-dom";

/** Displays a list of reviews that belongs to all bookings of a specific room */
export default function BookingReviews() {
  // TODO: This is not used, how to grab roomId and only shows booking info related to this room?
  const { roomId } = useParams();
  const { data: bookings = [], isLoading, error } = useGetReviewBookingsQuery();
  if (isLoading) return <p className="status">Loading...</p>;
  if (error) return <p className="status">No booking history for this room.</p>;
  return (
    <>
      <ul className="bookings">
        {bookings.map((booking) => (
          <BookingReview key={booking.id} booking={booking} />
        ))}
      </ul>
    </>
  );
}

function BookingReview({ booking }) {
  const checkin = new Date(booking.fromDate).toLocaleDateString();
  const checkout = new Date(booking.toDate).toLocaleDateString();
  return (
    <li className="singleBooking">
      <div className="DetailSection">
        // TODO: Unable to pull userName
        {/* <p className="userName">Customer Name: {booking.user.name}</p> */}
        <p className="checkin">Check-in Date: {checkin}</p>
        <p className="checkout">Check-out Date: {checkout}</p>
        <p className="roomName">
          Review Description: {booking.review?.description}
        </p>
        <p className="desc">Rating: {booking.review?.rating}</p>
        <figure>
          <img src={booking.review?.image} alt={booking.review?.id} />
        </figure>
      </div>
    </li>
  );
}
